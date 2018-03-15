var React = require('react');
var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;
var Button = require('react-bootstrap').Button;
var cookie = require('react-cookies');
let imgStyle = {height: '50px', width: '140px'};
let btnStyle = { marginTop: '8px', marginRight: '4px'}


function NavBar() {
        return (
           <div>
                <nav className="navbar navbar-inverse navbar1">
                    <div >
                        <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                        </div>
                        <div className="collapse navbar-collapse" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="#">My Devices</a></li>
                                <li><a href="#">Dashboard</a></li>
                                <li><a href="#">Graphs</a></li>
                                <li><a href="#">Contact</a></li>
                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                <li><NavLink to="/profile">< span className="glyphicon glyphicon-log-in"></span> Profile </NavLink></li>
                                <li><NavLink to="/login">< span className="glyphicon glyphicon-log-in"></span> Logout </NavLink></li>
                            </ul>
                        </div>
                        </div>
                    </div>
                </nav>

                <div className="container">

            </div>
           </div>
        )
}

module.exports = NavBar;