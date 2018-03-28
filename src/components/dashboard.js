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
let icon = {fontSize:'50px', color: 'white'}
let cmpicon = require('../image/laptop.png')
let iconstyle = {width: '30px', height:'30px'}

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
                        console.log(this.state.projectData);
                        this.props.history.push('/dashboard');
                    } else if (res.status === '401') {
                        this.setState({
                            isLoggedIn: false,
                            message: "No projects found..!!",
                        });
                    }
                });
            // fetch all project ends here
        }
        // else{
        //     console.log("in else "+cookie.load('userId'));
        //     API.checkSession()
        //         .then((res) => {
        //             console.log("status " +res.status);
        //             if (res.status === '201') {
        //                 this.setState({
        //                     isLoggedIn: true,
        //                 });
        //                 this.props.history.push('/dashboard');
        //             } else if (res.status === '401') {
        //                 this.setState({
        //                     isLoggedIn: false,
        //                     message: "Signup. Try again..!!",
        //                 });
        //                 this.props.history.push('/login');
        //             }
        //         });
        // }
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
         // const withKeys = data.map((function(item, key){
         //     return(
         //         <tr key={item._id} onClick={self.handleClick}>
         //             <td><a href={`/projectdetails?projectid=${item._id}`}>{item.projectName}</a> </td>
         //             <td>{item.count}</td><td>{item.Bids}</td><td>{(new Date(item.postProjectDate)).toLocaleDateString()}</td>
         //             <td>{item.budgetRange}</td>
         //         </tr>
         //     )
         // }))
    //         <tr key={item.idtblProject} onClick={self.handleClick}>
    // <td><a href={`/projectdetails?projectid=${item.idtblProject}`}> {item.ProjectName}</a> </td>
    //     <td>{item.count}</td><td>{item.Bids}</td> <td>{(new Date(item.EndDate)).toLocaleDateString()}</td>
    //     <td>{item.budgetRange}</td>
    //
    // </tr>


        const withfilter = (this.state.projectData.details && (Object.keys(this.state.projectData.details)).map((pd) =>{
            return(
                <tr key={this.state.projectData.details[pd]._id} onClick={self.handleClick} className="odd ProjectTable-row project-details">
                    <td key={this.state.projectData.details[pd].projectName} className='ProjectTable-cell ProjectTable-summaryColumn' >
                        <div className="col-sm-1"><img src={cmpicon} style={iconstyle}/> </div>
                        <div  className="col-sm-10">
                        <span className="ProjectTable-title">
                            <a href="#" className='ProjectTable-title'>{this.state.projectData.details[pd].projectName}</a></span><br/>
                            ...{this.state.projectData.details[pd].projectDescription && this.state.projectData.details[pd].projectDescription.substr(0,100)}... <br/>
                            {this.state.projectData.details[pd].skills && this.state.projectData.details[pd].skills.split(',').map((skill) => <a href="#" className='a-skills'>{skill},</a>)}
                        </div>
                    </td>
                    <td className='ProjectTable-cell'> {this.state.projectData.details[pd].Bids}</td>
                    <td className='ProjectTable-cell'> {this.state.projectData.details[pd].Bids}</td>
                    <td className='ProjectTable-cell'> {(new Date(this.state.projectData.details[pd].postProjectDate).toLocaleDateString())}</td>
                    <td className='ProjectTable-cell'> {this.state.projectData.details[pd].budgetRange}</td>
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
                            <h1> Tell us what you need done      </h1> <br/> <br/>


                            <table className='ProjectTable'>
                                <thead className='ProjectTable-head'>
                                <tr>
                                    <th className='ProjectTable-header ProjectTable-summaryColumn'>Name</th>
                                    <th className='ProjectTable-header'>Bids</th>
                                    <th className='ProjectTable-header'>Avg. Bid</th>
                                    <th className='ProjectTable-header'>Bid End Date</th>
                                    <th className='ProjectTable-header'>Budget</th>
                                </tr>

                                </thead>
                                <tbody>
                                {/*{nameslist}*/}
                                {withfilter}

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