import React, {Component} from 'react';
import {Link, withRouter, Route, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from "../api";
import cookie from 'react-cookies';
import NavBar from '../components/navbar';
import Post from '../components/postproject';
import {logout} from "../api";
import ProjectDetails from '../components/projectdetails'
import CurrentWorkAsFreelancer from '../components/CurrentWorkAsFreelancer';
import PastWorkFreelancer from '../components/PastWorkFreelancer'
import OpenProjectsEmployee from '../components/myprojects';
import MyProjects from "./myprojects";

var data = [];


class ActiveBidsFreelancer extends Component {
    constructor(props){
        super(props);
    }


    state = {
        username: '',
        isLoggedIn:'',
        userId: cookie.load('userId'),
        projectData: '',
        action:'',
        projectId:'',
        actions:''
    };

    componentWillMount(){
        API.fetchProjects(this.state.userId)
            .then((res) => {
                //console.log("status " +[res.details.json]);
                if (res.status === '201') {
                    this.setState({
                        isLoggedIn: true,
                        projectData: res.details
                    });
                    data = res.details;
                    console.log("state " +this.state.projectData[0].projectName);
                    this.props.history.push('/ActiveBidsFreelancer');
                } else if (res.status === '401') {
                    console.log("No records");
                    this.setState({
                        isLoggedIn: true,
                        message: "No projects found..!!",
                    });
                } else if (res.status === '402') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Session Expired..!!",
                    });
                    this.props.history.push('/login');
                }
            });

    }

    handleClick(event){
        console.log("in click");
    }

    handleChange(e) {
        this.setState({ value: e });
    }


    render(){
        const nameslist = data.map(data =>{
            return <tr>
                <td><NavLink to="/myprojectdetails/:projectId"> {data.ProjectName} </NavLink></td>
                <td> {data.projectpay}</td>
            </tr>
        })


        const handleClick = ()=> {

            //var id =
            console.log("on click");
        }

        var self = this;
        const withKeys = data.map((function(item, key){
            return(
                <tr key={item.idtblProject} onClick={self.handleClick} className="odd ProjectTable-row project-details">
                    {/*changed coloumn names as per mongo db column names*/}
                    <td className='ProjectTable-cell '><a href={`/myprojectdetails?projectid=${item._id}`}>{item.projectName}</a></td>
                    <td className='ProjectTable-cell'>{item.Bids}</td>
                    <td className='ProjectTable-cell'>{item.bidAwarded}</td>
                    <td className='ProjectTable-cell'>{(new Date(item.postProjectDate)).toLocaleDateString()}</td>
                    <td className='ProjectTable-cell'>{item.budgetRange}</td>
                </tr>
            )
        }))
        return(
            <div>
                <NavBar/>
                <Route exact path="/ActiveBidsFreelancer" render={() => (
                    <div className="page">
                        <div className="container">
                            <div >
                                {/*<div className="col-md-3">*/}
                                {this.state.message && (
                                    <div className="alert alert-warning" role="alert">
                                        {this.state.message}
                                    </div>
                                )}
                                {/*</div>*/}
                            </div>
                            <div className="container-fluid">
                                <div className="align-right">
                                    <ul className="pager">
                                        <li><NavLink to="myprojects">Employer</NavLink></li>
                                        <li><NavLink to="CurrentWorkAsFreelancer" className="active">Freelancer</NavLink></li>
                                    </ul>
                                </div>
                            </div>


                            <div className="text-left">
                                <h1> Projects posted by me   </h1>
                                <br/>
                                <div className="dashboard_tab_wrapper">
                                    <div className="dashboard_tab tab-clicked"><NavLink to="/ActiveBidsFreelancer">Active Bids</NavLink></div>
                                    <div className="dashboard_tab"> <NavLink to="/CurrentWorkAsFreelancer">Current Work</NavLink></div>
                                    <div className="dashboard_tab"><NavLink to="/PastProjectFreelancer">Past Work</NavLink> </div>
                                </div>

                                <div className="dashboardTable-setting container">
                                    <input type="text" className="dashboardTable-setting-search gaf-container" id="search_my_projects"
                                           placeholder="Enter project id, contest name, etc."/><button className="setting-search-btn btn-search" type="submit"><i className="glyphicon glyphicon-search"></i></button>


                                    <select className='dashboardTable-setting-show gaf-container' id="show_no" >
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                    </select>

                                    &nbsp;&nbsp;<button className="setting-search-btn btn-search">  <span className="glyphicon glyphicon-repeat"></span></button>

                                </div>

                                <table className='ProjectTable'>
                                    <thead className='ProjectTable-head'>
                                    <tr>
                                        <th className='ProjectTable-header'>PROJECT NAME</th>
                                        <th className='ProjectTable-header'>BIDS</th>
                                        <th className='ProjectTable-header'>MY BID</th>
                                        <th className='ProjectTable-header'>BID END DATE</th>
                                        <th className='ProjectTable-header'>PROJECT BUDGET</th>
                                    </tr>

                                    </thead>
                                    <tbody>
                                    {/*{nameslist}*/}
                                    {withKeys}

                                    </tbody>
                                </table>
<br/><br/><br/><br/><br/><br/><br/><br/>
                                {/*Container ends here */}
                            </div>
                        </div>
                    </div>
                )}/>
                <Route path="/postproject" render={() => (
                    <div>
                        <Post/>
                    </div>
                )}/>

                <Route exact path="/projectdetails/:projectId" render = {() => (

                    <div>
                        <ProjectDetails />
                    </div>
                )}/>
                <Route exact path="/CurrentWorkAsFreelancer" render = {() => (

                    <div>
                        <CurrentWorkAsFreelancer />
                    </div>
                )}/>
                <Route exact path="/PastWorkFreelancer" render = {() => (

                    <div>
                        <PastWorkFreelancer />
                    </div>
                )}/>
                <Route exact path="/myprojects" render = {() => (

                    <div>
                        <MyProjects />
                    </div>
                )}/>


            </div>

        );
    }

}

export default withRouter(ActiveBidsFreelancer);