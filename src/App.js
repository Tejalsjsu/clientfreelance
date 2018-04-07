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
import MyProjects from './components/myprojects';
import ProjectDetails from './components/projectdetails';
import MyProjectDetails from './components/myprojectdetails';
import EditProfile from './components/editprofile';
import NavLogin from './components/NavLogin';
import BrowseProjects from './components/browseProjects'
import ProjectWithMySkills from './components/projectWithMySkills';
import CurrentWorkAsFreelancer from './components/CurrentWorkAsFreelancer';
import PastWorkFreelancer from './components/PastWorkFreelancer'
import ActiveBidsFreelancer from './components/ActiveBidsFreelancer'
import PastProjectEmployee from './components/PastProjectEmployee';
import WorkInProgressEmployee from './components/WorkInProgressEmployee'
import FinancialDashboard from './components/financialDashboard'
import AddMoney from './components/addMoney'
import WithdrawMoney from './components/withdrawMoney'
import FinancialDashboardIn from './components/financialDashboardIn'

class App extends Component {
  render() {
    return (

          <BrowserRouter >
              <div className="App">
              <Nav/>
        {/*<Login/>*/}
              {/*<Post/>*/}
                  <Route exact path="/" component={Home}/>
              <Route exact path="/Home" component={Home}/>
              <Route path="/postproject" component={Post}/>
              <Route path="/login" component={Login}/>
                  <Route path="/signup" component={Signup}/>
                  <Route path="/dashboard" component={Dashboard}/>
                  <Route path="/profile" component={Profile}/>
                  <Route path="/myprojects" component={MyProjects}/>
                  <Route path="/projectdetails" component={ProjectDetails}/>
                  <Route path="/myprojectdetails" component={MyProjectDetails}/>
                  <Route path="/editprofile" component={EditProfile}/>
                  <Route path="/browseProjects" component={BrowseProjects}/>
                  <Route path="/projectWithMySkills" component={ProjectWithMySkills}/>
                  <Route path="/CurrentWorkAsFreelancer" component={CurrentWorkAsFreelancer}/>
                  <Route path="/PastWorkFreelancer" component={PastWorkFreelancer}/>
                  <Route path="/ActiveBidsFreelancer" component={ActiveBidsFreelancer}/>
                  <Route path="/PastProjectEmployee" component={PastProjectEmployee}/>
                  <Route path="/WorkInProgressEmployee" component={WorkInProgressEmployee}/>
                  <Route path="/financialDashboard" component={FinancialDashboard}/>
                  <Route path="/financialDashboardIn" component={FinancialDashboardIn}/>
                  <Route path="/addMoney" component={AddMoney}/>
                  <Route path="/withdrawMoney" component={WithdrawMoney}/>
              </div>
          </BrowserRouter>

    );
  }
}

export default App;
