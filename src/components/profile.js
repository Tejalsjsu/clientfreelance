import React, {Component} from 'react';
import {Button} from 'react-bootstrap'
import {withRouter, Route, NavLink} from 'react-router-dom'
import NavBar from '../components/navbar';
import * as API from "../api";
import cookie from "react-cookies";
let imgHeight = {height: '190px'}
let img = require ('../image/profile.jpg');
let profilePic = {width:'300px'}
let bgcolor = {backgroundColor: '#EAECEC'}
let bgwhite = {backgroundColor: '#FDFFFF'}
let footerText = {color: '#5DADE2'}

class Profile extends Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            isEditing: false,
            name: '',
            userId: cookie.load('userId'),
            data:'',
            signupDate:''
        };
        this.toggleEdit = this.toggleEdit.bind(this);
    }

    state = {
        userdata: {
            name: '',
            proffesionHeading: '',
            Description:'',
            userId: cookie.load('userId'),
            signupDate: '',
            email:''
        },
        data:'',
        isLoggedIn: false,
        isEditing: false,
        message: ''
    };

    handleChange(e) {
        this.setState({ value: e });
    }


    toggleEdit() {
        this.setState({isEditing: !this.state.isEditing})
    }

    componentWillMount(){
        API.fetchUserProfile(this.state.userId)
            .then((res) => {
                console.log("status " +[res.details.json]);
                if (res.status === '201') {
                    this.setState({
                        isLoggedIn: true,
                        name: res.details[0].userName,
                        proffesionHeading: res.details[0].professionalHeading,
                        skills: res.details[0].skills,
                        signupDate: res.details[0].signUpDate,
                        Description: res.details[0].aboutUser,
                        email: res.details[0].userEmail
                    });
                    console.log("state " +this.state.name);
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: false,
                        message: "No projects found..!!",
                    });
                }
            });

    }


    render(){
        return(
            <div style={bgcolor}>
                <NavBar/>
                <Route exact path="/profile" render={() => (
                    <div className="container" style={bgcolor}>
                        <div className="col-md-4" style={bgwhite}>
                            <br/>
                            <div className="media">
                                <div className="media-left padding-img" style={bgwhite}>
                                    <img src={img} className="media-object img-circle" style={profilePic}/>
                                </div> <br/>
                                <div className="padding" >
                                <div> Member since: {(new Date(this.state.signupDate)).toLocaleDateString()}</div>
                                    <div> Email: {this.state.email} </div>
                                    <div> Last Updated: {(new Date(this.state.signupDate)).toLocaleDateString()}</div>
                                    <div> No Projects: 10</div>
                                    <div> No Bids: 10</div>
                                    <br/> <br/>
                            </div>

                            </div>

                        </div>
                        <div className="col-md-8" style={bgwhite}>
                            <div className="media-body text-left padding">
                                <h2> {this.state.name}</h2> <br/>
                                <h3 className="media-heading font-grey">{this.state.proffesionHeading}</h3> <br/>
                                <br/> <br/>
                                <h2>About Me</h2>
                                <div className="well well-lg font-grey"> {this.state.Description} </div>
                                <br/><br/> <br/>

                            </div>

                        </div>

                        <div className="col-md-12 text-left" style={bgwhite}>
                            <h2> Skills</h2>
                            <h3 className="font-grey well well-lg font-grey"> {this.state.skills}</h3>
                        </div>
                    </div>

                )}/>
                <div ><br/>
                    <footer className="footer">
                        <p style={footerText}>Freelancer ® is a registered Trademark of Freelancer Technology Pty Limited (ACN 142 189 759)

                            Copyright © 2018 Freelancer Technology Pty Limited (ACN 142 189 759)</p>
                    </footer>
                </div>
            </div>
        )
    }
}

export default withRouter(Profile)