var React = require('react');
var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;
var Button = require('react-bootstrap').Button;
var cookie = require('react-cookies');
let imgStyle = {height: '50px', width: '140px'};
let btnStyle = { marginTop: '8px', marginRight: '4px'}


function myProjectsNav() {
    this.activateClass = (props) =>{
        this.className= 'active'
    }
    return (
        <div>
            <nav className="navbar-inverse navbar1">
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
                                <li onClick={this.activateClass} className='active'><NavLink exact to="/projectWithMySkills">Project with My Skills</NavLink></li>
                                <li onClick={this.activateClass}><NavLink to="/browseProjects">Browse Projects</NavLink></li>
                            </ul>

                            <ul className="nav navbar-nav navbar-right">
                                <li><NavLink to="/profile">< span className="glyphicon glyphicon-log-in"></span> Profile </NavLink></li>
                                <li><NavLink to="/login">< span className="glyphicon glyphicon-log-in"></span> Logout </NavLink></li>
                                {/*<button className="btn btn-warning navbar-btn mdc-button orange">Post a Project</button>*/}
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

module.exports = myProjectsNav;