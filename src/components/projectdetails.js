import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import "../App.css"
import {Button} from 'react-bootstrap';
import  logo from '../image/fl-logo.png';
import * as API from '../api/index';
import Dashboard from './dashboard';
import Signup from './signup';
import NavBar from '../components/navbar';
let imgStyle = {height: '70px', padding: '10px'};
let divStyle2 = {height:'45px'};
let divStyle3 ={backgroundColor:'#E3E1E1'};
let divStyle1 = {align: 'center', backgroundColor: '#FEFDFD', padding: '28px', marginTop: '1px'};
var pid = '';


class Project extends Component{
    constructor(props){
        super(props);
        // console.log({props.param.projectName});
    }


    state = {
        userdata: {
            username: '',
            password: '',
            email: ''
        },
        isLoggedIn: false,
        message: ''
    };


    componentWillMount(){
        this.setState({
            username: '',
            password: '',
            email:'',
            projectId :''
        });
        console.log("Proj id " +pid);
    }
    //
    // setLink = () => {
    //     this.props.history.push('\dashboard');
    // }

    handleSubmit = () => {
        API.doLogin(this.state.userdata)
            .then((res) => {
                if (res.status === '201') {
                    console.log("in 201"+res.email);
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        email: res.email,
                        username: this.state.userdata.name
                    });
                    //this.context.router.history.push("/dashboard");
                    this.props.history.push("/dashboard");
                    //  history.push('/dashboard');
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                }
            });
    };

    render(){
        return(

            <div style={divStyle3}>
                <NavBar/>
                <Route exact path="/project" render={() =>(
                    <div>
                    </div> //here
                )}/>

                <Route exact path="/dashboard" render = {() => (

                    <div>
                        <Dashboard username={this.state.userdata.username} email={this.state.userdata.username}/>
                    </div>
                )}/>
                <Route exact path="/myBids" render = {() => (
                    <div>
                        <Signup />
                    </div>
                )}/>
            </div>
        );
    }
}

export default withRouter(Project);