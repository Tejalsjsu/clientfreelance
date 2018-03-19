var React = require('react');
var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;
var Button = require('react-bootstrap').Button;
let btnStyle = { marginTop: '8px', marginRight: '4px'}



function NavLogin(){
    return(
        <div className="container">
            <nav className="navbar1">
                <div className="container-fluid">
                    <div className="navbar-header"> </div>
                    <ul className="nav navbar-nav">
                        <li> <NavLink exact activeClassName='active' to='/Home'> Home </NavLink> </li>
                        <li> <NavLink exact activeClassName='active' to='/login'> Get Connected </NavLink> </li>
                        <li> <NavLink activeClassName='active' to='/postproject'> How we work </NavLink> </li>
                    </ul>
                    <ul className="nav navbar-nav navbar-right">
                        <li><NavLink to="/signup"> <span className="glyphicon glyphicon-user"> </span> Sign Up</NavLink></li>
                        <li><NavLink to="/login"> <span className="glyphicon glyphicon-user"> </span> Login </NavLink></li>

                    </ul>
                </div>
            </nav>
        </div>

    )
}

module.exports = NavLogin;