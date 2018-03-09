import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from "../api";
// import {Field,reduxForm} from 'redux-form';
import NavBar from '../components/navbar';



class Dashboard extends Component {
    constructor(props){
        super(props);
    }


    //
    state = {
        username: ''
    };

    componentWillMount(){
        this.setState({
            username : this.props.username,
            email : this.props.email
        });
    }


    render() {
        return (
            <div className="container" >
                <NavBar/>
                <Route exact path="/dashboard" render={() => (
                    <div >
                        Welcome to my App..!! This is dashboard <br/>
                        UserName:  {this.props.username ? this.props.username: '' }  <br/>
                        Email : {this.props.email}
                    </div>
                )}/>
            </div>
        );
    }

}

export default withRouter(Dashboard);