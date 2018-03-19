import React, {Component} from 'react';
import {Link, withRouter, Route, NavLink} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from "../api";
import cookie from 'react-cookies';
import NavBar from '../components/navbar';
import Post from '../components/postproject';
import {logout} from "../api";
import ProjectDetails from '../components/projectdetails'

var data = [];


class MyProjects extends Component {
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
                    this.props.history.push('/myprojects');
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
                <tr key={item.idtblProject} onClick={self.handleClick}>

                    <td><a href={`/myprojectdetails?projectid=${item.idtblProject}`}>{item.ProjectName}</a></td>
                    <td>{item.count}</td><td>{item.Bids}</td><td>{(new Date(item.EndDate)).toLocaleDateString()}</td>
                    <td>{item.budgetRange}</td>
                    <td>
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
                <Route exact path="/MyProjects" render={() => (

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
                    <div className="text-left">
                        <h1> Projects posted by me   </h1>


                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Bids</th>
                                <th>Average Bid</th>
                                <th>Bid End Date</th>
                                <th>Budget</th>
                                <th>Action</th>
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

            </div>

        );
    }

}

export default withRouter(MyProjects);