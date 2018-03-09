import React, { Component } from 'react';
import {Route,withRouter} from 'react-router-dom';
import  logo from '../image/fl-logo.png';
import PostProject from './postproject';
let imgStyle = {height: '50px', width: '140px'};
let btnStyle = { marginTop: '8px', marginRight: '4px'}



class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-default">
                    <div >
                        {/* removed className="container-fluid"*/}
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a href="#">  <img src={logo} style={imgStyle} alt="logo"/></a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="#">Home</a></li>
                                <li><a href="#">About</a></li>
                                <li><a href="#">Contact</a></li>
                                <li className="dropdown">
                                    <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#">Action</a></li>
                                        <li><a href="#">Another action</a></li>
                                        <li><a href="#">Something else here</a></li>
                                        <li role="separator" className="divider"></li>
                                        <li className="dropdown-header">Nav header</li>
                                        <li><a href="#">Separated link</a></li>
                                        <li><a href="#">One more separated link</a></li>
                                    </ul>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                                <li className="active"><a href="./">Default <span className="sr-only">(current)</span></a></li>
                                <li><a href="../navbar-static-top/">Static top</a></li>
                                <li>
                                    <div align="center">
                                    <button type="button" className="btn btn-warning" style={btnStyle}
                                    onClick={() => {
                                        this.props.history.push("/postproject");
                                    }}
                                    >Post a Project</button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>


                <div className="jumbotron">
                    <h1>Navbar example</h1>
                    <p>This example is a quick exercise to illustrate how the default, static navbar and fixed to top navbar work. It includes the responsive CSS and HTML, so it also adapts to your viewport and device.</p>
                    <p>
                        <a className="btn btn-lg btn-primary" href="../../components/#navbar" role="button">View navbar docs &raquo;</a>
                    </p>
                </div>

                <Route exact path="/postproject" render={() => (
                    <PostProject/>
                )}/>

            </div>
        );
    }
}

export default withRouter(NavBar);