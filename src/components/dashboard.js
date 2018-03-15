import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from "../api";
import cookie from 'react-cookies';
import NavBar from '../components/navbar';
import Post from '../components/postproject';
import Project from './project'
import {Button} from 'react-bootstrap'
import {logout} from "../api";


class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    //
    state = {
        username: '',
        isLoggedIn:'',
        userId: cookie.load('userId')
    };

    componentWillMount(){
        API.checkSession()
        .then((res) => {
                console.log("status " +res.status);
                console.log(cookie.load('userId'));
                if (res.status === '201') {
                    this.setState({
                        isLoggedIn: true,
                    });
                    this.props.history.push('/dashboard');
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Signup. Try again..!!",
                    });

                }
            });

         if(cookie.load('userId') != undefined){
             console.log("logged in");
         }else{
             console.log("in else "+cookie.load('userId'));
         }
        this.setState({
            username : this.props.username,
            email : this.props.email,
            userId: cookie.load('userId')
        });
    }

    handleLogout = () => {
        console.log("in logout");
        API.logout(this.state.username)
            .then((res) => {
                if (res.status === '201') {
                    console.log("in 201");
                    this.setState({
                        isLoggedIn: false
                    });
                    this.props.history.push("/login");
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: true
                    });
                    // this.props.history.push("/login");
                }
            });
    };


    render() {
        return (
            <div>
            <NavBar/>
            <div className="container" >


                <Route exact path="/dashboard" render={() => (
                    <div >
                        {/*start from here*/}


                        <div className="container-fluid">
                            <div className="text-right">
                                <Button bsStyle="success" bsSize="sm" block
                                        onClick={this.handleLogout}> Logout </Button>
                            </div>
                            <div className="text-center">
                                <h3>Welcome to StayConnected dashboard</h3>
                                <h4>Check details of all your nodes installed</h4>
                            </div>
                            <div className="row">
                                <div className="col-sm-4 col-xs-12">
                                    <div className="panel panel-default text-center">
                                        <div className="panel-heading">
                                            <h1>Node 1</h1>
                                        </div>
                                        <div className="panel-body">
                                            <p><strong>Location</strong> Stack 1 - Row 1</p>
                                            <p><strong>Base Temperature</strong> 73 F</p>
                                            <p><strong>Is temp under control </strong> Yes</p>
                                            <p><strong>If no is the HVAC on</strong> NA </p>
                                            <p><strong>More details</strong> can be added here</p>
                                        </div>
                                        <div className="panel-footer">
                                            <h3>Currently Off</h3>
                                            <Button bsStyle="success" className="btn btn-lg">Details</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-xs-12">
                                    <div className="panel panel-default text-center">
                                        <div className="panel-heading">
                                            <h1>Node 2</h1>
                                        </div>
                                        <div className="panel-body">
                                            <p><strong>Location</strong> Stack 2 - Row 1</p>
                                            <p><strong>Base Temperature</strong> 65 F</p>
                                            <p><strong>Is temp under control </strong> No</p>
                                            <p><strong>If no is the HVAC on</strong> Yes </p>
                                            <p><strong>HVA start time</strong> 10:30 AM</p>
                                        </div>
                                        <div className="panel-footer">
                                            <h3>Currently On</h3>
                                            <Button bsStyle="success" className="btn btn-lg">Details</Button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4 col-xs-12">
                                    <div className="panel panel-default text-center">
                                        <div className="panel-heading">
                                            <h1>Node 3</h1>
                                        </div>
                                        <div className="panel-body">
                                            <p><strong>Location</strong> Stack 2 - Row 1</p>
                                            <p><strong>Base Temperature</strong> 65 F</p>
                                            <p><strong>Is temp under control </strong> No</p>
                                            <p><strong>If no is the HVAC on</strong> Yes </p>
                                            <p><strong>HVA start time</strong> 10:30 AM</p>
                                        </div>
                                        <div className="panel-footer">
                                            <h3>Currently On</h3>
                                            <Button bsStyle="success" className="btn btn-lg">Details</Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/*add code here*/}
                        {/*Welcome to my App..!! This is dashboard <br/>*/}
                        {/*UserName:  {this.props.username ? this.props.username: '' }  <br/>*/}
                        {/*Email : {this.props.email}*/}
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