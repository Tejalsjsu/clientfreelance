import React, {Component} from 'react';
import {Link, withRouter, Route, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from "../api";
import cookie from 'react-cookies';
import NavBar from '../components/navbar';
import Post from '../components/postproject';
import {logout} from "../api";
import ProjectDetails from '../components/projectdetails'
import WorkInProgressEmployee from '../components/WorkInProgressEmployee'
import CurrentWorkAsFreelancer from '../components/CurrentWorkAsFreelancer';
import MyProjects from "./myprojects";

var data = [];


class PastProjectEmployee extends Component {
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
        localStorage.setItem('Project', '');
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
                    this.props.history.push('/PastProjectEmployee');
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
                    <td className='ProjectTable-cell'>{item.count}</td><td>{item.Bids}</td><td>{(new Date(item.postProjectDate)).toLocaleDateString()}</td>
                    <td className='ProjectTable-cell'>{item.budgetRange}</td>
                    <td className='ProjectTable-cell'>
                        <select id="ddlactions" className="input-sm"
                                onChange={(event) => {
                                    this.setState({
                                        actions: event.target.value
                                    });
                                }} >
                            <option value="Select" >Select</option>
                            <option value="Extend" >Extend</option>
                            <option value="CLose" >Close</option>
                            <option value="Delete" >Delete</option>
                        </select> &nbsp; &nbsp;
                    </td>


                </tr>
            )
        }))
        return(
            <div>
                <NavBar/>
                <Route exact path="/PastProjectEmployee" render={() => (
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
                                        <li><a href="myprojects.js" className="active">Employer</a></li>
                                        <li><NavLink to="/CurrentWorkAsFreelancer" className="pagerNormal">Freelancer</NavLink></li>
                                    </ul>
                                </div>
                            </div>


                            <div className="text-left">
                                <h1> Projects   </h1>
                                <br/>
                                <div className="dashboard_tab_wrapper">
                                    <div className="dashboard_tab tab-clicked"><NavLink to="#">Open Projects</NavLink></div>
                                    <div className="dashboard_tab"> <NavLink to="/WorkInProgressEmployee">Work in Progress</NavLink></div>
                                    <div className="dashboard_tab"><NavLink to="/PastProjectEmployee">Past Work</NavLink> </div>
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
                                        <th className='ProjectTable-header'>EMPLOYER</th>
                                        <th className='ProjectTable-header'>AWARDED BID</th>
                                        <th className='ProjectTable-header'>DEADLINE</th>
                                        <th className='ProjectTable-header'>MILESTONE</th>
                                        <th className='ProjectTable-header'>ACTION</th>
                                    </tr>

                                    </thead>
                                    <tbody>
                                    {/*{nameslist}*/}
                                    {withKeys}

                                    </tbody>
                                </table>

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

                <Route exact path="/myprojects" render = {() => (

                    <div>
                        <MyProjects />
                    </div>
                )}/>

                <Route exact path="/WorkInProgressEmployee" render = {() => (

                    <div>
                        <WorkInProgressEmployee />
                    </div>
                )}/>

                <Route exact path="/CurrentWorkAsFreelancer" render = {() => (

                    <div>
                        <CurrentWorkAsFreelancer />
                    </div>
                )}/>


            </div>

        );
    }

}

export default withRouter(PastProjectEmployee);