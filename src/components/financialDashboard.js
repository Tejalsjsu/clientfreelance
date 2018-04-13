import React, {Component} from 'react';
import {NavLink, withRouter, Route} from 'react-router-dom';
import cookie from "react-cookies";
import * as API from "../api";
import PieChart from 'react-simple-pie-chart';

var FinancialNavBar = require('../components/financialNavBar');

let incoming = require('../image/blue-icon.png')
let outgoing = require('../image/dark-blue-icon.png')
let header = require('../image/Quick-stats.png')
let visa = require('../image/visa-card.png')
let flag = require('../image/united-states.png')
let visa_verified = require('../image/visa-verified.png')
let img_style = {width:'500px', height: '50px'}
let icon_style = {width:'15px', height: '15px'}


class financialDashboard extends Component {
    state = {
        userdata:{
            userId: cookie.load('userId'),
            cardNo:'',
            expiryDate:'',
            cardHolderName:'',
            ccv:'',
            billingZip:'',
            depositAmount:30,
            processingFee:0.99,
            totalAmount:30.99
        }

    }

    handleSubmit = () => {
        console.log(this.state);
        API.withdrawMoney(this.state.userdata)
            .then((res) => {
                console.log(res.status);
                if (res.status === '201') {
                    this.setState({
                        isLoggedIn: true,
                        message: "Withdraw requested!!"
                    });
                } else if (res.status === '401') {
                    this.setState({
                        isLoggedIn: true,
                        message: "Withdraw Failed. Try again..!!",
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

    render() {
        return(
            <div className="main-content">
                <FinancialNavBar/>

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

                    </div>
                    <div className="container-fluid">
                        <div align="col-sm-8">
                            <br/>
                            <h1 align="left"> <strong> Transaction Manager </strong> </h1>
                        </div> <br/>
                        <div className="dashboard_tab_wrapper text-left">
                            <div className="dashboard_tab "><NavLink to="financialDashboardIn">Incoming</NavLink></div>
                            <div className="dashboard_tab"> <NavLink to="/financialDashboardOut">Outgoing</NavLink></div>
                            <div className="dashboard_tab tab-clicked"><NavLink to="/financialDashboard">Summary</NavLink> </div>
                        </div>
                    </div>
                      <br/>
                    <div className="Grid col-sm-16">
                        <div className="col-sm-5">
                            <img src={header} alt="header" style={img_style}/>
                            <div className="PagePayments-summary">
                                <div className="PagePayments-summary-header">
                                    <div className="Payment-label padding-t10 padding-r10 text-blue"> Balance &nbsp;&nbsp;:</div>
                                    <div className="Payment-label padding-t10 block align-c padding-l30 text-black"> $100 </div>
                                </div>
                                <div className="PagePayments-summary-header">
                                    <div className="Payment-label padding-t10 padding-r10 text-blue">Incoming :</div>
                                    <div className="Payment-label padding-t10 block align-c padding-l30 text-black"> $750 </div>
                                </div>
                                <div className="PagePayments-summary-header">
                                    <div className="Payment-label padding-t10 padding-r10 text-blue">Outgoing :</div>
                                    <div className="Payment-label padding-t10 block align-c padding-l30 text-black">$250</div>
                                </div>
                                <div className="PagePayments-summary-footer">Check detailed transaction history in the below table</div>
                            </div>
                        </div>



                        <div className="col-sm-6 padding-l30">
                            <div className="PagePayments-summary">
                                <div className="PagePayments-summary-header">
                                    <div className="Payment-label">
                                        <img src={incoming} alt="incoming" style={icon_style}/>&nbsp;&nbsp;&nbsp;Incoming 75%
                                        &nbsp;&nbsp;&nbsp;<img src={outgoing} alt="incoming"  style={icon_style}/>&nbsp;&nbsp;&nbsp;Outgoing 25%
                                    </div>
                                </div>



                                    <PieChart radius={10} labels={true}
                                        slices={[
                                            {
                                                color: '#2eb8ff',
                                                value: 500
                                            },
                                            {
                                                color: '#214dff',
                                                value: 20,
                                            },
                                        ]}
                                    />

                                <div className="PagePayments-summary-footer">The Pie chart shows your incoming and outgoing cash flow.</div>

                            </div>

                        </div>


                    </div>
                    <div className="main-content text-left">
                    I am here
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(financialDashboard);