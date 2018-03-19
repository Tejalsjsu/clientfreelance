import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from "../api";
import cookie from 'react-cookies';
import NavBar from '../components/navbar';
import Post from '../components/postproject';
import Project from './projectdetails'
import {Button} from 'react-bootstrap'
import {logout} from "../api";

var data = [];

class Dashboard extends Component {
    constructor(props){
        super(props);
    }

    //
    state = {
        username: '',
        isLoggedIn:'',
        userId: cookie.load('userId'),
        projectData:'',
        message:''
    };

    componentWillMount(){
        if(cookie.load('userId') != undefined){
            this.props.history.push('/dashboard');
            // Fetch all projects
            API.fetchAllProjects(this.state.userId)
                .then((res) => {
                    console.log("status " +[res.details.json]);
                    if (res.status === '201') {
                        this.setState({
                            isLoggedIn: true,
                            projectData: res.details
                        });
                        data = res.details;
                        this.props.history.push('/dashboard');
                    } else if (res.status === '401') {
                        this.setState({
                            isLoggedIn: false,
                            message: "No projects found..!!",
                        });
                    }
                });
            // fetch all project ends here
        }else{
            console.log("in else "+cookie.load('userId'));
            API.checkSession()
                .then((res) => {
                    console.log("status " +res.status);
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
                        this.props.history.push('/login');
                    }
                });
        }
        this.setState({
            username : this.props.username,
            email : this.props.email,
            userId: cookie.load('userId'),
            projectData:''
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
        var self = this;
        const withKeys = data.map((function(item, key){
            return(
                <tr key={item.idtblProject} onClick={self.handleClick}>
                    <td><a href={`/projectdetails?projectid=${item.idtblProject}`}> {item.ProjectName}</a> </td>
                    <td>{item.count}</td><td>{item.Bids}</td> <td>{(new Date(item.EndDate)).toLocaleDateString()}</td>
                    <td>{item.budgetRange}</td>

                </tr>
            )
        }))

        return (
            <div>


                <Route exact path="/dashboard" render={() => (
                    <div>
                    <NavBar/>
                    <div >
                    <div className="container">
                        {/*start from here*/}
                        <div className="container-fluid">
                            <div className="align-right">
                                <ul className="pager">
                                    <li><a href="#" className="active">Employer</a></li>
                                    <li><a href="#">Freelancer</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="text-left">
                            <h1> Tell us what you need done      </h1>


                            <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Bids</th>
                                    <th>Average Bid</th>
                                    <th>Bid End Date</th>
                                    <th>Budget</th>
                                </tr>

                                </thead>
                                <tbody>
                                {/*{nameslist}*/}
                                {withKeys}

                                </tbody>
                            </table>

                            {/*Container ends here */}
                        </div>

                        {/*add code here*/}
                        {/*Welcome to my App..!! This is dashboard <br/>*/}
                        {/*UserName:  {this.props.username ? this.props.username: '' }  <br/>*/}
                        {/*Email : {this.props.email}*/}
                    </div>
                    </div>
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
        );
    }

}

export default withRouter(Dashboard);