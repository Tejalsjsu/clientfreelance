import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import PropTypes from 'prop-types';
import * as API from "../api";
import cookie from 'react-cookies';
import MyProjectsNav from '../components/myProjectsNav';
import Post from '../components/postproject';
import Project from './projectdetails'
import {Button} from 'react-bootstrap'
import {logout} from "../api";
let noPadding = { paddingLeft: '0px'}
let center ={alignItems: 'center'}
let icon = {fontSize:'50px', color: 'white'}
let cmpicon = require('../image/laptop.png')
let iconstyle = {width: '30px', height:'30px'}

var data = [];

class browseProjects extends Component {
    state = {
        username: '',
        isLoggedIn:'',
        userId: cookie.load('userId'),
        search:'',
        projectData:{
            projectName:'',
            projectDescription:'',
            projectBudget:'',
            projectSkills:'',
            bidamount:'',
            duration:''
         },
        pageOfItems:'',
        message:''
    };

    handleChange(e) {
        this.setState({ value: e });
    }

    updateSearch(event) {
        this.setState({
            search: event.target.value
        });
    }

    // onChangePage(pageOfItems) {
    //     // update state with new page of items
    //     this.setState({ pageOfItems: pageOfItems });
    // }

    componentWillMount() {
        if (cookie.load('userId') != undefined) {
            // Fetch all projects
            API.fetchAllProjectsForBrowse(this.state.userId)
                .then((res) => {
                    if (res.status === '201') {
                        this.setState({
                            isLoggedIn: true,
                            pages:res.length,
                            projectData: res,
                            search: []
                        });
                        data = res.details;
                        console.log("after fetch" +this.state.projectData.details[0]._id);
                        //this.props.history.push('/browseProjects');
                    } else if (res.status === '401') {
                        this.setState({
                            isLoggedIn: false,
                            message: "No projects found..!!",
                        });
                    }
                });
            // fetch all project ends here
        } // add code to redirect to login page
    }

    render(){

        var self = this;
        // console.log("On object " +Object.keys(this.state.projectData));
        // const withKeys = data.map((function(item, key){
        //     return(
        //         <tr key={item.idtblProject} onClick={self.handleClick}>
        //             <td key={item.idtblProject}><a href={`/projectdetails?projectid=${item.idtblProject}`}> {item.ProjectName}</a></td>
        //             <td>{item.count}</td><td>{item.Bids}</td><td>{(new Date(item.EndDate)).toLocaleDateString()}</td>
        //             <td>{item.budgetRange}</td>
        //         </tr>
        //     )
        // }))


        const withfilter = (this.state.projectData.details && (Object.keys(this.state.projectData.details)).map((pd) =>{
            return(
                <tr key={this.state.projectData.details[pd]._id.projectId} onClick={self.handleClick} className="odd ProjectTable-row project-details">
                    <td key={this.state.projectData.details[pd]._id.projectName} className='ProjectTable-cell ProjectTable-summaryColumn' >
                        <div className="col-sm-1"><img src={cmpicon} style={iconstyle}/> </div>
                        <div  className="col-sm-10">
                        <span className="ProjectTable-title">
                            <a href={`/projectdetails?projectid=${this.state.projectData.details[pd]._id.projectId}`} className='ProjectTable-title'>{this.state.projectData.details[pd]._id.projectName}</a></span><br/>
                            ...{this.state.projectData.details[pd]._id.projectDescription && this.state.projectData.details[pd]._id.projectDescription.substr(0,100)}... <br/>
                            {this.state.projectData.details[pd].skills && this.state.projectData.details[pd].skills.split(',').map((skill) => <a href="#" className='a-skills'>{skill},</a>)}
                        </div>
                    </td>
                    <td className='ProjectTable-cell' key={this.state.projectData.details[pd].count}> {this.state.projectData.details[pd].count}</td>
                    <td className='ProjectTable-cell' key={this.state.projectData.details[pd]._id.postProjectDate}> {(new Date(this.state.projectData.details[pd]._id.postProjectDate).toLocaleDateString())}</td>
                    <td className='ProjectTable-cell' key={this.state.projectData.details[pd].average}> {this.state.projectData.details[pd].average}</td>
                </tr>
            )
        }))
        const newRecords = (this.state.search && (Object.keys(this.state.projectData.details))
            .filter(key => this.state.search.includes(this.state.projectData.details[key]._id.projectName))
            .reduce((obj, key) => {
                return {
                    ...obj,
                    [key]: this.state.projectData.details[key]
                };
            }, {})
        )

        const withfilter1 = (newRecords && (Object.keys(newRecords)).map((pd) =>{
            return(
                <tr>
                    <td className='ProjectTable-cell' key={newRecords[pd]._id._id}> {newRecords[pd]._id.projectName}</td>

                </tr>
            )
        }))
        return(
            <div>
                <MyProjectsNav/>
                <Route exact path="/browseProjects" render={() =>(
                    <div className="main-content">
                        <div className="container"> <br/> <br/>
                            <h1 align="left"> <strong> Freelance Jobs</strong></h1>  <br/>
                        <div className="fl-banner fl-banner-small" >
                            <div className="col-sm-4" style={noPadding}>
                            <figure className="fl-banner-image">
                                <img className="fl-banner-image-content" src="https://cdn3.f-cdn.com/build/css/images/pages/project-view/upsell-exam.jpg?v=a67c36df83f59da56c71bfa6dcef30ed&amp;m=6" width="320" height="140" alt="Employers prefer freelancers with certified skills"/>
                            </figure>
                            </div>

                            <div className="fl-banner-content col-sm-6 text-left">
                                <span className="fl-banner-heading"> <h3> <strong>Certify your skills to win more jobs</strong> </h3></span>
                                <span className="fl-banner-text">
                                Employers prefer freelancers with certified skills. Get certified and increase your chance of being awarded a project.
                            </span>
                            </div>
                            <div className="fl-banner-content col-sm-2" >
                                <br/><br/><br/><br/>
                                <button className="fl-banner-button">
                                    <i className="fa fa-arrow-circle-right" style={icon}></i>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12" className="flicon-chevron-right"><path fill="none" d="M2.714 11.75L9.284 6 2.715.25"></path></svg>
                                </button>
                            </div>
                        </div>
                            <br/>
                            <div className='section-heading'>
                            <h3 align="left"> <strong> Browse Jobs on Freelancer</strong> </h3>
                            </div>
                            <div className='section-heading text-left'>
                                    <div className="form-group">
                                        <label className="control-label col-sm-2 padding" htmlFor="search"> <h4> Search</h4> </label>

                                        <div className="col-sm-10">
                                            <div className='input-group'>
                                            <span className="input-group-addon"><i className="glyphicon glyphicon-search"></i></span>
                                            <input type="text" className="form-control input-lg" placeholder="Search for Projects" value={this.state.search} id="search"
                                                onChange={this.updateSearch.bind(this)}
                                                //onChange={(event) => {

                                                       // this.setState({
                                                       //     projectData: {
                                                       //         ...this.state.projectData,
                                                       //         projectName: event.target.value
                                                       //     }
                                                       // });
                                            //       }}
                                            />
                                            </div>

                                        </div>
                                    </div>
                                <br/>
                            </div>

                            <div className='section-heading text-left'>
                                <div className="form-group">
                                    <label className="control-label col-sm-2 padding" htmlFor="skills"> <h4> Skills </h4> </label>

                                    <div className="col-sm-10">
                                        <div className='input-group'>
                                            <input type="text" className="form-control input-lg" placeholder="Type to filter projects by skills.." value={this.state.projectData.skills} id="skills"
                                                   onChange={(event) => {
                                                       this.setState({
                                                           projectData: {
                                                               ...this.state.projectData,
                                                               skills: event.target.value
                                                           }
                                                       });
                                                   }}/>
                                        </div>

                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div className='section-heading text-left'>
                                <div className="form-group">
                                    <label className="control-label col-sm-2 padding" htmlFor="types"> <h4> Job Types: </h4> </label>

                                    <div className="col-sm-10">
                                        <div className='input-group ProjectFilters-item--JobType' id='types'>
                                            <label className="checkbox-inline ProjectFilters-checkbox">
                                                <input type="checkbox" value="Hourly"/>Hourly Projects
                                            </label>
                                            <label className="checkbox-inline ProjectFilters-checkbox">
                                                <input type="checkbox" value="Fixed" />Fixed Price Projects
                                            </label>
                                        </div>

                                    </div>
                                </div>
                                <br/>
                            </div>

                            <div className='section-heading text-left'>
                                <div className="form-group col-sm-8">
                                    <button type="button" className="btnfilters">  <span className="glyphicon glyphicon-th-list"></span>    More Options </button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button type="button" className="btnfilters"> Clear Filters </button>
                                </div>
                                <div className='form-group col-sm-4'>
                                        <label htmlFor="filter-length" className="ProjectFilters-dd">Results per page</label>
                                        <select name="filter-length" id="quantity-selector" className='ProjectFilters-quantitySelector'>
                                            <option>20</option>
                                            <option>50</option>
                                            <option>100</option>
                                        </select>
                                </div>
<br/> <br/>
                                <div className='section-heading text-left'>

                                    <table className='ProjectTable'>
                                        <thead className='ProjectTable-head'>
                                        <tr>
                                            <td className='ProjectTable-header ProjectTable-summaryColumn'> PROJECT </td>
                                            <td className='ProjectTable-header'> BIDS </td>
                                            <td className='ProjectTable-header'><a className="a-table" href="#"> STARTED</a> <span className="glyphicon glyphicon-chevron-down"></span></td>
                                            <td className='ProjectTable-header'> PRICE (USD)</td>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {/*{withKeys1}*/}
                                        {withfilter}

                                        </tbody>
                                    </table>
                                    <div className="col-sm-12">
                                    <div className="dataTables_info col-sm-9">
                                        Showing 1 to 20 of 220
                                    </div>
                                    <div className="dataTables_paginate col-sm-3">
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination">
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo;</span>
                                                        <span className="sr-only">Previous</span>
                                                    </a>
                                                </li>
                                                <li className="page-item"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Next">
                                                        <span aria-hidden="true">&raquo;</span>
                                                        <span className="sr-only">Next</span>
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                    </div>





                                </div>

<br/>
                                <br/>
                            </div>
                        </div>
                        <div>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
                    </div>


                )}/>
            </div>
        );
    }
}

export default withRouter(browseProjects);