import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Switch} from 'react-router-dom';
import Login from "./components/login";
import { reduxForm, Field } from 'redux-form';

class App extends Component {
  render() {
    return (
      <div className="App">
          <BrowserRouter >
        <Login/>
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
