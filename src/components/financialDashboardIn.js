import React, {Component} from 'react';
import {NavLink, withRouter, Route} from 'react-router-dom';
import cookie from "react-cookies";
import * as API from "../api";
import PieChart from 'react-simple-pie-chart';

var FinancialNavBar = require('../components/financialNavBar');

let incoming = require('../image/blue-icon.png');
let outgoing = require('../image/dark-blue-icon.png');
let header = require('../image/Quick-stats.png');
let visa = require('../image/visa-card.png');
let flag = require('../image/united-states.png');
let visa_verified = require('../image/visa-verified.png');
let img_style = {width:'500px', height: '50px'};
let icon_style = {width:'15px', height: '15px'};


class financialDashboardIn extends Component {
    state = {
        userdata:{
            userId: cookie.load('userId'),
            transactionData:
                {
                    comment:'',
                    cardHolderName:'',
                    depositAmount:'',
                    processingFee:'',
                    transactionDate:''
                }
            }
    }

    componentWillMount() {
        if (cookie.load('userId') != undefined) {
            API.getIncomingTransactions(this.state.userId)
                .then((res) => {
                    console.log(res);
                    if (res.status === '201') {
                        this.setState({
                            isLoggedIn: true,
                            transactionData: res.details[0].transactionHistory
                        });
                    } else if (res.status === '401') {
                        this.setState({
                            isLoggedIn: true,
                            message: "Could not find transactions. Try again..!!",
                        });
                    } else if (res.status === '402') {
                        this.setState({
                            isLoggedIn: false,
                            message: "Session Expired..!!",
                        });
                        this.props.history.push('/login');
                    }
                });
        };
    }

    render() {
        const transactions = (this.state.transactionData && (Object.keys(this.state.transactionData)).map((pd) =>{
            return(
                <tr key={pd}>
                    <td>{Number(pd)+1} </td>
                    <td className='transaction-table-comments'> {this.state.transactionData[pd].comment} </td>
                    <td className='transaction-table-amount' key={this.state.transactionData[pd].depositAmount}>{ (new Date(this.state.transactionData[pd].transactionDate).toLocaleDateString()) } </td>
                    <td className='transaction-table-amount' key={this.state.transactionData[pd].processingFee}> {this.state.transactionData[pd].processingFee}</td>
                    <td className='transaction-table-amount' key={this.state.transactionData[pd].depositAmount}> {this.state.transactionData[pd].depositAmount}</td>
                </tr>
            )
        }))


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
                    <div className="main-content text-left">
                            <br/><h1 align="left"> <strong> Incoming Transactions </strong> </h1><br/>
                        <div className="dashboard_tab_wrapper text-left">
                            <div className="dashboard_tab  tab-clicked"><NavLink to="financialDashboardIn">Incoming</NavLink></div>
                            <div className="dashboard_tab"> <NavLink to="/financialDashboardOut">Outgoing</NavLink></div>
                            <div className="dashboard_tab"><NavLink to="/financialDashboard">Summary</NavLink> </div>
                        </div>
                        <h2 className="padding-t10 padding-b20">Credit Details</h2>

                        <div className="PagePayments-summary">
                        <table className="table table-condensed font-grey table-striped">
                            <thead>
                            <tr>
                                <th className="transaction-table-amount">Sr. No</th>
                                <th className="transaction-table-comments">Description</th>
                                <th className="transaction-table-amount">Date</th>
                                <th className="transaction-table-amount">Processing Fee</th>
                                <th className="transaction-table-amount">Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {transactions}
                            <tr>
                                <td></td>
                                <td></td>
                                <td> Total </td>
                                <td></td>
                                <td></td>
                            </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default withRouter(financialDashboardIn);