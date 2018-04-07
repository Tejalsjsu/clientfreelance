import {Button} from 'react-bootstrap';
import * as API from "../api";


var React = require('react');
var NavBar = require('../components/navbar');
var dashedBorder = {border:'1px dashed'}



class PostProject extends React.Component{
    state = {
        project: {
            name: '',
            description: '',
            skills:'',
            pay:'',
            budget:'',
            upgrade:'',
            currency:''
        },
        isLoggedIn: false,
        message: ''
    };

    handleSubmit = () => {
        console.log(this.state.project);
         API.postProject(this.state.project)
             .then((res) => {
                 console.log(res.status);
                 if (res.status === '201') {
                     this.setState({
                         isLoggedIn: true,
                         message: "Project Posted Successfully..!!"
                     });
                     this.props.history.push('/postproject');
                 } else if (res.status === '401') {
                     this.setState({
                         isLoggedIn: true,
                         message: "Post Failed. Try again..!!",
                           });
                 }else if (res.status === '402') {
                     this.setState({
                         isLoggedIn: false,
                         message: "Session Expired..!!",
                     });
                     this.props.history.push('/login');
                 }
             });
    };

    handleChange(e) {
        this.setState({ value: e });
    }

    handleChangePay = (e) => {
        this.setState(
            {budget: e.target.value});
        console.log(e.target.value);
    };

    handleChangeCur = (e) => {
        this.setState(
            {currency: e.target.value});
        console.log(e.target.value);
    };

    onDrop = (acceptedFiles, rejectedFiles) => {
        var projectFiles = this.state.projectFiles;
        projectFiles.push(acceptedFiles);
        this.setState({
            projectFiles: projectFiles,
            isUploaded : true
        });
    }

    render(){
        return(
            <div>
            <NavBar/>
                <div className="container">
                    <div className="text-left">
                        <div >
                            {/*<div className="col-md-3">*/}
                            {this.state.message && (
                                <div className="alert alert-warning" role="alert">
                                    {this.state.message}
                                </div>
                            )}
                            {/*</div>*/}
                        </div>
                <h1> Tell us what you need done </h1>
                <div className="font-grey"> Get free quotes from skilled freelancers within minutes, view profiles, ratings and portfolios and chat with them. Pay the freelancer only when you are 100% satisfied with their work.</div>
                    <br/> <br/><br/>
                    <h3> Choose a name for your project</h3>
                        <input type="text" className="form-control input-lg" placeholder="e.g Build me a website" value={this.state.project.name}
                               onChange={(event) => {
                                   this.setState({
                                       project: {
                                           ...this.state.project,
                                           name: event.target.value
                                       }
                                   });
                               }}/> <br/> <br/><br/>
                        <h3> Tell us more about your project </h3>
                        <div className="font-grey">Great project descriptions include a little bit about yourself, details of what you are trying
                            to achieve, and any decisions that you have already made about your project. If there are things you are unsure of, don't worry, a freelancer will be able to help you fill in the blanks.</div>
                        <br/>
                        <textarea type="text" className="form-control input-lg" placeholder="Describe your project here..." value={this.state.project.description}
                                  rows={6}
                               onChange={(event) => {
                                   this.setState({
                                       project: {
                                           ...this.state.project,
                                           description: event.target.value
                                       }
                                   });
                               }}/> <br/> <br/><br/>
                        <fieldset style={dashedBorder}> <br/>
                            <div className="col-sm-4">
                            <span className="btn btn-plain btn-file-uploader">
                            <input type="file" className="input-file input-lg" multiple/>
                            </span></div>
                            <div className="col-sm-4">
                                <div className="font-grey"> Drag and Drop images or documents that might be useful in explaining your project brief here.<br/> </div> </div> <br/>

                        </fieldset> <br/> <br/> <br/>


                        <h3> What skills are required? </h3>
                        <div className="font-grey"> Enter up to 5 skills that best describe your project. Freelancers will use these skills to find projects they are most interested and experienced in. </div>

                        <div id='appText'>
                            <div className='tagHere'></div> <br/>
                            <input type="text" className="form-control input-lg" placeholder="What skills are required?" value={this.state.project.skills} list="skills"
                                   multiple="multiple"
                                   onChange={(event) => {
                                       this.setState({
                                           project: {
                                               ...this.state.project,
                                               skills: event.target.value
                                           }
                                       });
                                   }}/>
                            <datalist id="skills">

                        </datalist>
                            <h3 className="font-grey"> Suggested skills: <a className="underline">  Website Design</a> ,<a className="underline"> Logo Design </a>,
                                <a className="underline"> Mobile App Development </a>,<a className="underline"> Data Entry </a>, <a className="underline"> Article Writing</a> </h3>
                            <br/> <br/><br/>

                            <h3> How do you want to pay</h3>
                            <input type="radio" name="payment" value="Fixed" checked={this.state.project.pay === 'Fixed'} onChange={(event) => {
                                this.setState({
                                    project: {
                                        ...this.state.project,
                                        pay: event.target.value
                                    }
                                });
                            }} />  <span className="font-grey"> Fixed price project</span> <br/>
                            <input type="radio" name="payment" value="Hourly" onChange={(event) => {
                                this.setState({
                                    project: {
                                        ...this.state.project,
                                        pay: event.target.value
                                    }
                                });
                            }}/> <span className="font-grey"> Hourly project </span> <br/>
                            <br/> <br/><br/>

                            <h3> What is your estimated budget? </h3>
                            <div className="dropdown">
                                <select id="ddlCurrency" className="input-lg" value={this.state.project.currency}
                                        onChange={(event) => {
                                            this.setState({
                                                project: {
                                                    ...this.state.project,
                                                    currency: event.target.value
                                                }
                                            });
                                        }} >
                                    <option value="USD" >USD</option>
                                    <option value="NZD" >NZD</option>
                                    <option value="AUD" >AUD</option>
                                    <option value="GBP" >GBP</option>
                                    <option value="INR" >INR</option>
                                </select> &nbsp; &nbsp;

                                <select id="ddlBudget" className="input-lg" value={this.state.project.budget}
                                        onChange={(event) => {
                                            this.setState({
                                                project: {
                                                    ...this.state.project,
                                                    budget: event.target.value
                                                }
                                            });
                                        }} >
                                    <option value="Micro project ($10 - 30 USD)" >Micro project ($10 - 30 USD)</option>
                                    <option value="Simple project ($30 - 250 USD)" >Simple project ($30 - 250 USD)</option>
                                    <option value="Very small project ($250-750 USD)" >Very small project ($250-750 USD)</option>
                                    <option value="Small project ($750 - 1500 USD)" >Small project ($750 - 1500 USD)</option>
                                    <option value="Medium project ($1500-3000 USD)" >Medium project ($1500-3000 USD)</option>
                                    <option value="Large project($3000 - 5000 USD)" >Large project($3000 - 5000 USD)</option>
                                </select>
                            </div>
                            <br/> <br/>


                            <input type="submit" className="button-color" value= "Post My Project"
                                   onClick={() => this.handleSubmit()}/>
                            <br/> <br/>
                            <hr color="#E3E1E1"/>
                            <h3 className="font-grey"> By clicking 'Post My Project', you agree to the Terms & Conditions and Privacy Policy</h3> <br/> <br/> <br/>

                            <h3 className="font-grey">Copyright © 2018 Freelancer Technology Pty Limited (ACN 142 189 759)</h3>

                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

//module.exports = PostProject;
export default PostProject;