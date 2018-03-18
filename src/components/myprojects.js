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
        projectId:''
    };

    componentWillMount(){
        API.fetchProjects(this.state.userId)
            .then((res) => {
                console.log("status " +[res.details.json]);
                if (res.status === '201') {
                    this.setState({
                        isLoggedIn: true,
                        projectData: res.details
                    });
                    data = res.details;
                    console.log("state " +this.state.projectData[0].projectName);
                    this.props.history.push('/myprojects');
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: false,
                        message: "No projects found..!!",
                    });
                    this.props.history.push('/login');
                }
            });

    }




    render(){
        const nameslist = data.map(data =>{
            return <tr>
                <td><NavLink to="/projectdetails/:projectId"> {data.projectName} </NavLink></td>
                <td> {data.projectpay}</td>
            </tr>
        })


        const handleClick = ()=> {

            //var id =
            console.log("on click");
        }

        const withKeys = data.map((function(item, key){
            return(
                <tr key={item.idtblProject}>
                    <td>{item.projectName} </td>
                <td>{item.projectpay}</td>

                </tr>
            )
        }))
//onClick={this.handleClick.bind(this)}


        return(
            <div>
                <NavBar/>
                <Route exact path="/MyProjects" render={() => (

                <div className="container">
                    <div className="text-left">
                        <h1> Tell us what you need done      </h1>


                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Name</th>
                                <th>Bids</th>
                                <th>Average Bid</th>
                                <th>Bid End Date</th>
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