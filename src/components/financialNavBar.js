var React = require('react');
var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;
let imgStyle = {height: '50px', width: '140px'};
let btnStyle = { marginTop: '8px', marginRight: '4px'}


function NavBar() {
    this.activateClass = (props) =>{
        this.className= 'active'
    }
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
                        <div className="collapse navbar-collapse bar-item" id="myNavbar">
                            <ul className="nav navbar-nav">
                                <li onClick={this.activateClass}  className='active is-active'><NavLink exact to="/financialDashboard">Dashboard</NavLink></li>
                                <li onClick={this.activateClass}><NavLink to="/addMoney">Add Money</NavLink></li>
                                <li onClick={this.activateClass} ><NavLink to="withdrawMoney">Withdraw Money</NavLink></li>
                                <li onClick={this.activateClass}><a href="/editprofile">Edit Profile</a></li>
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