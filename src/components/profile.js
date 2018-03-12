import React, {Component} from 'react';
import {Button} from 'react-bootstrap'
import {withRouter, Route} from 'react-router-dom'
import NavBar from '../components/navbar';

class Profile extends Component{
    render(){
        return(
            <div>
                <NavBar/>
            <div className="container">
                <Route exact path="/profile" render={() => (
                    <div >

                    This is user Profile
            </div>
                )}/>
            </div>
            </div>
        )
    }
}

export default withRouter(Profile)