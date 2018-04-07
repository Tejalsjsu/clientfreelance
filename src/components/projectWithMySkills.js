import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
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
let bannerImg = require('../image/banner.png')
let bannerStyle = {width: '100%', height:'100%'}

var data = [];

class projectWithMySkills extends Component {
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


    componentWillMount() {
        if (cookie.load('userId') != undefined) {
            // Fetch all projects
            API.fetchAllProjects(this.state.userId)
                .then((res) => {
                    if (res.status === '201') {
                        this.setState({
                            isLoggedIn: true,
                            projectData: res.details
                        });
                        data = res.details;
                        console.log("after fetch" +this.state.projectData[0].ProjectName)
                        //this.props.history.push('/browseProjects');
                    } else if (res.status === '401') {
                        this.setState({
                            isLoggedIn: false,
                            message: "No projects found..!!",
                        });
                    }
                });
            // fetch all project ends here
        }
    }

    render(){
        var self = this;
        const withfilter = Object.keys(this.state.projectData).map((pd) =>{
            return(
                <tr key={this.state.projectData[pd].idtblProject} onClick={self.handleClick} className="odd ProjectTable-row project-details">
                    <td key={this.state.projectData[pd].ProjectName} className='ProjectTable-cell ProjectTable-summaryColumn' >
                        <div className="col-sm-1"><img src={cmpicon} style={iconstyle}/> </div>
                        <div  className="col-sm-10">
                        <span className="ProjectTable-title">
                            <a href="#" className='ProjectTable-title'>{this.state.projectData[pd].ProjectName}</a></span><br/>
                            ...{this.state.projectData[pd].projectDescription && this.state.projectData[pd].projectDescription.substr(0,100)}... <br/>
                            {this.state.projectData[pd].skills && this.state.projectData[pd].skills.split(',').map((skill) => <a href="#" className='a-skills'>{skill},</a>)}
                        </div>
                    </td>
                    {/*<td className='ProjectTable-cell'> {this.state.projectData[pd].count}</td>*/}
                    {/*<td className='ProjectTable-cell'> {(new Date(this.state.projectData[pd].postDate).toLocaleDateString())}</td>*/}
                    {/*<td className='ProjectTable-cell'> {this.state.projectData[pd].Bids}</td>*/}
                </tr>
            )
        })


        const withKeys1 = Object.keys(this.state.projectData).map((pd) =>{
            return(
                <tr key={this.state.projectData[pd].idtblProject} onClick={self.handleClick} className="odd ProjectTable-row project-details">
                    <td key={this.state.projectData[pd].ProjectName} className='ProjectTable-cell ProjectTable-summaryColumn' >
                        <div className="col-sm-1"><img src={cmpicon} style={iconstyle}/> </div>
                        <div  className="col-sm-10">
                        <span className="ProjectTable-title">
                            <a href="#" className='ProjectTable-title'>{this.state.projectData[pd].ProjectName}</a></span><br/>
                            ...{this.state.projectData[pd].projectDescription && this.state.projectData[pd].projectDescription.substr(0,100)}... <br/>
                            {this.state.projectData[pd].skills && this.state.projectData[pd].skills.split(',').map((skill) => <a href="#" className='a-skills'>{skill},</a>)}
                        </div>
                    </td>
                    <td className='ProjectTable-cell'> {this.state.projectData[pd].count}</td>
                    <td className='ProjectTable-cell'> {(new Date(this.state.projectData[pd].postDate).toLocaleDateString())}</td>
                    <td className='ProjectTable-cell'> {this.state.projectData[pd].Bids}</td>
                </tr>
            )
        })

        return(
            <div>
                <MyProjectsNav/>
                <Route exact path="/projectWithMySkills" render={() =>(
                    <div className="main-content">
                        <div className="container"> <br/> <br/>
                            <div className="section-inner">
                                <section className="steps-banner">
                                    <img src={bannerImg} style={bannerStyle}/>
                                </section>
                            </div>
                            <h1 align="left"> <strong>  Jobs Matching My Skills</strong></h1>  <br/>
                            <br/>
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
                                </div>





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

export default withRouter(projectWithMySkills);