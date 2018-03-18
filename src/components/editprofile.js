import React, {Component} from 'react';
import {Button} from 'react-bootstrap'
import {withRouter, Route} from 'react-router-dom'
import NavBar from '../components/navbar';
import * as API from "../api";
import cookie from "react-cookies";
let imgHeight = {height: '190px'}
let img = require ('../image/profile.jpg');
let profilePic = {width:'300px'}



class EditProfile extends Component{

    constructor(props) {
        super(props);
        this.state = {
            userdata: {
                userId: cookie.load('userId'),
                name: '',
                proffesionHeading: '',
                Description:'',
                skills:'',
                phone: ''
            },
            isEditing: false
        };
        // this.toggleEdit = this.toggleEdit.bind(this);
    }

    state = {
        userdata: {
            userId: cookie.load('userId'),
            name: '',
            proffesionHeading: '',
            Description:'',
            skills:'',
            phone: ''
        },
        isLoggedIn: false,
        isEditing: false,
        message: ''
    };

    handleChange(e) {
        this.setState({ value: e });
    }

    handleSubmit = () => {
        console.log(this.state.userdata);
        API.editUpdateProfile(this.state.userdata)
            .then((res) => {
                console.log(res.status);
                if (res.status === '201') {
                    this.setState({
                        isLoggedIn: true,
                        message: "Profile Updated Successfully..!!"
                    });
                    this.props.history.push('/editprofile');
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Failed to update. Try again..!!",
                    });
                    this.props.history.push('/editprofile');
                }
            });
    };

    componentWillMount(){
        API.fetchUserProfile(this.state.userId)
            .then((res) => {
                console.log("status " +[res.details.json]);
                if (res.status === '201') {
                    this.setState({
                        isLoggedIn: true,
                        userdata:
                            {
                        name: res.details[0].userName,
                        proffesionHeading: res.details[0].professionalHeading,
                        skills: res.details[0].skills,
                        Description: res.details[0].aboutUser,
                        phone:res.details[0].userPhone
                        }
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

    // toggleEdit() {
    //     this.setState({isEditing: !this.state.isEditing})
    // }

    render(){
        return(
            <div>
                <NavBar/>
                <Route exact path="/editprofile" render={() => (
                    <div>
                        <div className="container" >
                            <div >
                                {/*<div className="col-md-3">*/}
                                {this.state.message && (
                                    <div className="alert alert-warning" role="alert">
                                        {this.state.message}
                                    </div>
                                )}
                                {/*</div>*/}
                            </div>
                            <div className="col-sm-4">
                                <div className="media">
                                    <div className="media-left">
                                        <img src={img} className="media-object img-circle" style={profilePic}/>
                                    </div>

                                </div> <br/>
                                <div className="text-left padding">
                                    <span> Member since </span>
                                </div>
                            </div>
                            <div className="col-sm-6">
                                <div className="media-body text-left padd   ing">
                                    <h3 > User Name </h3> <br/>
                                    {/*<input type="text" className="form-control input-lg" placeholder="User Name" value={this.state.userdata.name}*/}
                                           {/*onChange={(event) => {*/}
                                               {/*this.setState({*/}
                                                   {/*userdata: {*/}
                                                       {/*...this.state.userdata,*/}
                                                       {/*name: event.target.value*/}
                                                   {/*}*/}
                                               {/*});*/}
                                           {/*}}/> <br/> <br/>*/}
                                    <h4 className="media-heading">Enter Professional Headline:</h4>
                                    <textarea type="text" className="form-control input-lg" placeholder={this.state.proffesionHeading} value={this.state.userdata.proffesionHeading}
                                              maxLength={50}
                                              rows={5}
                                              onChange={(event) => {
                                                  this.setState({
                                                      userdata: {
                                                          ...this.state.userdata,
                                                          proffesionHeading: event.target.value
                                                      }
                                                  });
                                              }}/> <br/> <br/>
                                    <h4 > Enter Profile Summary: </h4>
                                    <textarea type="text" className="form-control" placeholder="Tell us a bit about yourself" value={this.state.userdata.Description}
                                              maxLength={500}
                                              rows={10}
                                              onChange={(event) => {
                                                  this.setState({
                                                      userdata: {
                                                          ...this.state.userdata,
                                                          Description: event.target.value
                                                      }
                                                  });
                                              }}/>  <br/> <br/>
                                </div>
                            </div>

                            {/*Add here*/} <br/>




                        </div>
                        <div className="container">

                        <div className="panel-group" id="accordion">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse1">
                                            Your Skills</a>
                                    </h4>
                                </div>
                                <div id="collapse1" className="panel-collapse collapse in">
                                    <div className="panel-body">

                                        <textarea type="text" className="form-control input-lg" placeholder="Enter skills - e.g. Java, c, ReacrJS, etc " value={this.state.userdata.skills}
                                                  maxLength={50}
                                                  rows={5}
                                                  onChange={(event) => {
                                                      this.setState({
                                                          userdata: {
                                                              ...this.state.userdata,
                                                              skills: event.target.value
                                                          }
                                                      });
                                                  }}/> <br/> <br/>
                                    </div>
                                </div>
                            </div>
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a data-toggle="collapse" data-parent="#accordion" href="#collapse2">
                                            Personal Details</a>
                                    </h4>
                                </div>
                                <div id="collapse2" className="panel-collapse collapse">
                                    <div className="panel-body text-left">
                                        <span>Phone:</span> &nbsp; &nbsp;
                                        <input type="number" placeholder="e.g. 1234567895" value={this.state.userdata.phone} list="skills"
                                               maxLength={10}
                                               onChange={(event) => {
                                                   this.setState({
                                                       userdata: {
                                                           ...this.state.userdata,
                                                           phone: event.target.value
                                                       }
                                                   });
                                               }}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>

                        <input type="submit" className="button-color" value= "Update my profile"
                               onClick={() => this.handleSubmit()}/>
                        <br/> <br/>
                        <hr color="#E3E1E1"/>
                        <h3 className="font-grey"> By clicking 'Post My Project', you agree to the Terms & Conditions and Privacy Policy</h3> <br/> <br/> <br/>

                        <h3 className="font-grey">Copyright © 2018 Freelancer Technology Pty Limited (ACN 142 189 759)</h3>

                    </div>
                )}/>
            </div>
        )
    }
}

export default withRouter(EditProfile)