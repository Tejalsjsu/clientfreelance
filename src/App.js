import React, { Component } from 'react';
import './App.css';
import {BrowserRouter, Route} from 'react-router-dom';
import Login from "./components/login";
import Post from "./components/postproject";
import Nav from './components/Nav';
import Dashboard from './components/dashboard'
import Home from './components/Home';
import Signup from './components/signup';
import Profile from './components/profile';

class App extends Component {
  render() {
    return (

          <BrowserRouter >
              <div className="App">
              <Nav/>
        {/*<Login/>*/}
              {/*<Post/>*/}
              <Route exact path="/Home" component={Home}/>
              <Route path="/postproject" component={Post}/>
              <Route path="/login" component={Login}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/dashboard" component={Dashboard}/>
                  <Route path="/profile" component={Profile}/>
              </div>
          </BrowserRouter>

    );
  }
}

export default App;
