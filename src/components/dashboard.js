import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from "../api";
import NavBar from '../components/navbar';
import Post from '../components/postproject';
import Project from './project'


class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    //
    state = {
        username: '',
        isLoggedIn:''
    };

    componentWillMount(){
        API.checkSession()
            .then((res) => {
                if (res.status === 201) {
                    console.log("in 201");
                    this.setState({
                        isLoggedIn: true
                    });
                    this.props.history.push("/dashboard");
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: false
                    });
                   // this.props.history.push("/login");
                }
            });
        this.setState({
            username : this.props.username,
            email : this.props.email
        });
    }


    render() {
        return (
            <div>
            <NavBar/>
            <div className="container" >


                <Route exact path="/dashboard" render={() => (
                    <div >
                        Welcome to my App..!! This is dashboard <br/>
                        UserName:  {this.props.username ? this.props.username: '' }  <br/>
                        Email : {this.props.email}
                    </div>
                )}/>

                <Route path="/postproject" render={() => (
                    <div>
                    <Post/>
                    </div>
                )}/>

                <Route exact path="/project" render={() => (
                    <Project/>
                )}/>


            </div>
            </div>
        );
    }

}

export default withRouter(Dashboard);