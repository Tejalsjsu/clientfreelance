var React = require('react');
var Link = require('react-router-dom').Link;
var NavLink = require('react-router-dom').NavLink;
var Button = require('react-bootstrap').Button;
let btnStyle = { marginTop: '8px', marginRight: '4px'}
let img = require('../image/fl-logo.png')
let imgStyle = {height: '50px', width: '70px'}



function NavBarLoggedOut(){
    return(
        <div className="container">
            <nav className="navbar1">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <a className="navbar-brand" href="./Home">Freelancer</a>
                    </div>
                    <ul className="nav navbar-nav">
                        <li> <NavLink activeClassName='active' to='/Home'> Home </NavLink> </li>

                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#"> Hire Freelancer &nbsp;
                                <span className="glyphicon glyphicon-triangle-bottom"></span>
                            </a>
                            <ul className="dropdown-menu list-group">
                                <li> <br/><strong> &nbsp; Hire Freelancer</strong> <br/></li>
                                <li> <hr/> </li>
                                <li><NavLink activeClassName='active' to="/login">Find a Freelancer</NavLink> <br/></li>
                                <li><NavLink to="./postproject">Post a Project</NavLink> <br/></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#"> Work &nbsp;
                                <span className="glyphicon glyphicon-triangle-bottom"></span>
                            </a>
                            <ul className="dropdown-menu list-group">
                                <li> <br/><strong> &nbsp; Find Work </strong> <br/></li>
                                <li> <hr/> </li>
                                <li><NavLink activeClassName='active' to="/projectWithMySkills">Project with my skills</NavLink> <br/></li>
                                <li><NavLink to="./browseProjects"> Browse Projects </NavLink> <br/></li>
                            </ul>
                        </li>

                        <li className="dropdown">
                            <a className="dropdown-toggle" data-toggle="dropdown" href="#"> My Projects &nbsp;
                                <span className="glyphicon glyphicon-triangle-bottom"></span>
                            </a>
                            <ul className="dropdown-menu list-group">
                                <li> <br/><strong> &nbsp; Manage </strong> <br/></li>
                                <li> <hr/> </li>
                                <li><NavLink activeClassName='active' to="/myprojects">My Projects</NavLink> <br/></li>
                                <li><NavLink to="./postproject">Dashboard</NavLink> <br/></li>
                            </ul>
                        </li>

                    </ul>


                    <ul className="nav navbar-nav navbar-right">
                        <li><NavLink to="/signup"> <span className="glyphicon glyphicon-user"> </span> Sign Up</NavLink></li>
                        <li><NavLink to="/login"> <span className="glyphicon glyphicon-user"> </span> Login </NavLink></li>
                        <li>
                            <div><Button bsStyle="warning" style={btnStyle} href='/postproject'

                            > Post a Project </Button> </div> </li>

                    </ul>
                </div>
            </nav>
        </div>

    )
}

module.exports = Nav;