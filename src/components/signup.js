import React, {Component} from 'react';
import {Button} from 'react-bootstrap';
import {Link, Route, withRouter} from 'react-router-dom';
import  logo from '../image/fl-logo.png';
import * as API from '../api/index';
import Login from "./login";
let imgStyle = {height: '70px', padding: '10px'};
let divStyle2 = {height:'45px'};
let divStyle3 ={backgroundColor:'#E3E1E1'};
let divStyle1 = {align: 'center', backgroundColor: '#FEFDFD', padding: '28px', marginTop: '1px'};

class Signup extends Component{
    state = {
        userdata: {
            username: '',
            password: '',
            email:'',
            typeOfUser:''
        },
        isLoggedIn: false,
        message: ''
    };

    handleChange(e) {
        this.setState({ value: e });
    }

    handleSubmit = () => {
        API.saveData(this.state.userdata)
            .then((res) => {
                console.log(res.status);
                if (res.status === '201') {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!"
                    });
                    console.log("after set", this.props);
                    this.props.history.push('/login');
                    console.log("after set", this.props);
                    //history.push('/login');
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: false,
                        message: "Signup. Try again..!!",

                    });
                }
            });
    };

    render(){
        return(
            <div>
                <Route exact path="/signup" render={() => (
                    <div>
                        <div className="col-sm-4"> </div>

                        <div style={divStyle1} className="col-sm-3">

                            <img src={logo} style={imgStyle} alt="logo"/>
                            <hr color="#E3E1E1"/>
                            <input type="text" className="form-control" placeholder="Email" value={this.state.userdata.email}
                                   onChange={(event) => {
                                       this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               email: event.target.value
                                           }
                                       });
                                   }}/> <br/>
                            <input type="text" className="form-control" placeholder="Enter User Name" value={this.state.userdata.username}
                                   onChange={(event) => {
                                       this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               username: event.target.value
                                           }
                                       });
                                   }}/> <br/>
                            <input type="password" className="form-control" placeholder="Enter Password" value={this.state.userdata.password}
                                   onChange={(event) => {
                                       this.setState({
                                           userdata: {
                                               ...this.state.userdata,
                                               password: event.target.value
                                           }
                                       });
                                   }}/><br/>


                            <Button bsStyle="success" bsSize="sm" block
                                    onClick={() => this.handleSubmit()}> Create Account </Button> <br/>
                            <div>By registering you confirm that you accept the
                                <Link to="/login">Terms and Conditions</Link> and <Link to="/login">Privacy Policy</Link> </div>
                        </div>

                        <hr color="#E3E1E1"/>
                        {/*<div> Already a Freelancer.com member?<Link to="/login"> Log In</Link> </div>*/}
                        <div className="row justify-content-md-center">
                            <div className="col-md-3">
                                {this.state.message && (
                                    <div className="alert alert-warning" role="alert">
                                        {this.state.message}
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                )}/>

            </div>
        );
    }
}
export default withRouter(Signup);