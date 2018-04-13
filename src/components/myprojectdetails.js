import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import "../App.css"
import {Button} from 'react-bootstrap';
import  logo from '../image/fl-logo.png';
import * as API from '../api/index';
import Dashboard from './dashboard';
import Signup from './signup';
import NavBar from '../components/navbar';
import queryString from 'query-string';
import cookie from "react-cookies";
let imgStyle = {height: '170px', width:'170px', padding: '5px'};
let divStyle2 = {height:'45px'};
let divStyle3 ={backgroundColor:'#E3E1E1'};
let divStyle1 = {align: 'center', backgroundColor: '#FEFDFD', padding: '28px', marginTop: '1px'};
let img = require ('../image/profile.jpg');
let img2 = require ('../image/profile2.jpg');
var bidData = [];



class MyProjectDetails extends Component{
    constructor(props){
        super(props);
        // console.log({props.param.projectName});
        var pid = queryString.parse(this.props.location.search);
        var temp = pid && pid.projectid;

        /*this.setState({
            userdata: {
                userId: cookie.load('userId'),
                projectId: temp
            }
        });*/

        this.state =  {
            userdata: {
                username: '',
                password: '',
                userId: cookie.load('userId'),
                projectId: temp,
                projectName:'',
                projectDescription:'',
                projectBudget:'',
                projectSkills:'',
                bidamount:'',

            },
            // bidInfo:
            //     {
            //       userName:'',
            //       skills:'',
            //       bidamount:'',
            //       completionDays:'',
            //         professionalHeading:'',
            //         email: '',
            //
            //     },
            bidInfo:'',
            isLoggedIn: false,
            message: ''
        };

    }


    // state = {
    //     userdata: {
    //       bidamount:'',
    //     duration:''
    //         username: '',
    //         password: '',
    //         email: '',
    //         userId:cookie.load('userId'),
    //         projectId: '',
    //         projectName:'',
    //         projectDescription:'',
    //         projectBudget:'',
    //         projectSkills:'',
    //},
    //     isLoggedIn: false,
    //message: ''
    // };


    componentWillMount(){
        var temPid = this.state.userdata.projectId;


        API.fetchProjectDetails(this.state.userdata)
            .then((res) => {
                console.log("status " +res.details);
                if (res.status === '201') {
                    console.log("In success" +res.details[0].budgetRange);
                    this.setState({
                        isLoggedIn: true,
                        userdata: {
                            projectId: temPid,
                            projectName:res.details[0].projectName,
                            projectDescription:res.details[0].projectDescription,
                            projectBudget:res.details[0].budgetRange,
                            projectSkills:res.details[0].skills,
                        }
                    });
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: false,
                        message: "No projects found..!!",
                    });
                }else if (res.status === '402') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Session Expired..!!",
                    });
                    this.props.history.push('/login');
                }

            });
            // Fetech Bid info as well
        console.log("proj id:" +this.state.userdata.projectId);
        API.fetchBidInfo(this.state.userdata)
            .then((res) => {
                console.log("status bids " +res.details[0]);
                if (res.status === '201') {
                    console.log("In success of bid" +res.details);
                    this.setState({
                        isLoggedIn: true,
                        bidInfo: res.details
                    });
                    bidData = res.details;
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: false,
                        message: "No Bids found..!!",
                    });
                }
            });

    }

    handleSubmit = () => {
        API.hireFreelancer(this.state.userdata)
            .then((res) => {
                console.log(res.status);
                if (res.status === '201') {
                    this.setState({
                        isLoggedIn: true,
                        message: "Hired Successfully..!!"
                    });
                } else if (res.status === '401') {
                    this.setState({
                        message: "Hired Successfully..!!",
                    });
                }
            });

    };


    render(){
        var self = this;
        const withKeys = bidData.map((function(item, key){
            return(
                <div key={item.userEmail}>

                    <div id="collapse1" className="panel-collapse collapse in">
                        <div className="panel-body text-left">
                            <div className="panel-body">
                                <div className="media">
                                    <div className="media-left">
                                        <img src={img} className="media-object" style={imgStyle}/>
                                    </div>
                                    <div className="media-body">
                                        <h4 className="media-heading">{item.userName}</h4>
                                        <p>{item.professionalHeading}</p>
                                        <p><strong>Email: </strong> {item.userEmail}</p>
                                        <p><strong>Skills: </strong> {item.skills}</p>
                                        <p><strong> Bid Amount: </strong>{item.bidAmount}</p>
                                        <p> <strong>Completion Days: </strong>{item.completionDays}</p>

                                    </div>
                                </div>
                                <br/>
                                <Button bsStyle="success" bsSize="sm" onClick={() => self.handleSubmit()}>Hire </Button>
                            </div>
                        </div>
                    </div>
                    <hr className="font-grey"/>
                </div>

            )
        }))

        return(

            <div style={divStyle3}>
                <NavBar/>
                <Route exact path="/myprojectdetails" render={() =>(
                    <div className="container">
                        <div >
                            {/*<div className="col-md-3">*/}
                            {this.state.message && (
                                <div className="alert alert-warning" role="alert">
                                    {this.state.message}
                                </div>
                            )}
                        </div>

                        <h2 className="project_name padding-t20 padding-b20"> &nbsp; &nbsp;{this.state.userdata.projectName} </h2>
                        <div className="col-sm-12">
                            <div className="panel panel-default text-center">
                                <div className="panel-body text-left">
                                    <div className="block align-c">
                                        <p className="project-p padding-l10 padding-r10">Bids</p>
                                        <div className="text-blue padding-l10 padding-r10">
                                            1
                                        </div>
                                    </div>
                                    <div className="block align-c border-l border-r">
                                        <p className="project-p padding-l10 padding-r10">AVG Bid (USD)</p>
                                        <div className="text-blue  padding-l10 padding-r10">
                                            $250
                                        </div>
                                    </div>
                                    <div className="block align-c border-r">
                                        <p className="project-p padding-l10 padding-r10"> Project Budget (USD)</p>
                                        <div className="text-blue  padding-l10 padding-r10">
                                            {this.state.userdata.projectBudget}
                                        </div>
                                    </div>

                                    <div className="block align-c right">
                                        <div className="text-green bold larger margin-b5 padding-r10"> OPEN </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        {this.state.userdata.projectName!= undefined &&

                        <div className="col-sm-12">
                            <div className="panel panel-default text-center">
                                {/*<div className="panel-heading">*/}
                                {/*<h4>{this.state.userdata.projectName}</h4>*/}
                                {/*</div>*/}
                                <div className="panel-body text-left projectBrief-inner">
                                    <div className="project-brief margin-b5 col-sm-8">
                                        <h2 className="project-brief-subheading bold"> Project Discription </h2>
                                        <p className="project-p">{this.state.userdata.projectDescription}</p>

                                        <h2 className="project-brief-subheading bold"> About the employer </h2>
                                        <p className="project-p">{this.state.userdata.projectName}</p>

                                        <h2 className="project-brief-subheading bold"> Skills required </h2>
                                        <p className="project-p">{this.state.userdata.projectSkills}</p>


                                    </div>
                                    <div className="project-sidebar col-sm-4 padding-r10">
                                        <div className="padding-r10 padding-l10 padding-t20">

                                        </div>
                                    </div>

                                </div>
                                <div className="panel-body text-left projectBrief-inner">
                                    <div className="project-brief margin-b5 col-sm-10">
                                        <a href="postproject" className="btn-large btn-primary"> Post a Project like this </a>
                                    </div>
                                    <div className="block align-right padding-r10 right">
                                        <div className="ProjectReport">
                                            <span>Project Id:</span>
                                            <span> {this.state.userdata.projectId}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>

                                </div>
                                <div className="panel-footer">
                                    <div id="collapse1" className="panel-collapse collapse">
                                        <div className="panel-body">
                                            <span>Bid Amount (in USD):</span> &nbsp; &nbsp;
                                            <input type="number" placeholder="120" value={this.state.userdata.bidamount}
                                                   maxLength={5}
                                                   onChange={(event) => {
                                                       this.setState({
                                                           userdata: {
                                                               ...this.state.userdata,
                                                               bidamount: event.target.value
                                                           }
                                                       });
                                                   }}/>

                                            <span> &nbsp;&nbsp; Duration (in days):</span> &nbsp; &nbsp;
                                            <input type="number" placeholder="15" value={this.state.userdata.duration}
                                                   maxLength={8}
                                                   onChange={(event) => {
                                                       this.setState({
                                                           userdata: {
                                                               ...this.state.userdata,
                                                               duration: event.target.value
                                                           }
                                                       });
                                                   }}/>
                                            {/*<input type="number" placeholder="15" value={this.state.userdata.projectId}*/}
                                            {/*maxLength={8}/>*/}
                                            <br/> <br/>
                                            <Button bsStyle="success" bsSize="sm" onClick={() => this.handleSubmit()}>Submit Bid </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        }



                        {this.state.userdata.projectName!= undefined &&

                        <div className="col-sm-12">
                            <div className="panel panel-default text-center">

                            </div>
                            <div>



                                <div className="panel panel-default text-center">
                                    <div className="panel-heading">
                                        <h5><a data-toggle="collapse" data-parent="#accordion" href="#collapse1">List of Bids</a></h5>
                                    </div>
                                    <div >

                                            {/*{nameslist}*/}
                                            {withKeys}


                                    </div>

                                </div>

                        </div>
                        </div>
                        }
                    </div>

                    //here
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

export default withRouter(MyProjectDetails);