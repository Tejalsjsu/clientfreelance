var React = require('react');
var NavBar = require('../components/navbar');
var dashedBorder = {border:'1px dashed'}


class PostProject extends React.Component{
    state = {
        project: {
            name: '',
            description: '',
            skills:'',
            pay:'',
            budget:'',
            upgrade:''
        },
        isLoggedIn: false,
        message: ''
    };
    render(){
        return(
            <div>
            <NavBar/>
                <div className="container">
                    <div className="text-left">
                <h1> Tell us what you need done </h1>
                <div className="font-grey"> Get free quotes from skilled freelancers within minutes, view profiles, ratings and portfolios and chat with them. Pay the freelancer only when you are 100% satisfied with their work.</div>
                    <br/> <br/><br/>
                    <h3> Choose a name for your project</h3>
                        <input type="text" className="form-control input-lg" placeholder="e.g Build me a website" value={this.state.project.name}
                               onChange={(event) => {
                                   this.setState({
                                       project: {
                                           ...this.state.name,
                                           name: event.target.value
                                       }
                                   });
                               }}/> <br/> <br/><br/>
                        <h3> Tell us more about your project </h3>
                        <div className="font-grey">Great project descriptions include a little bit about yourself, details of what you are trying
                            to achieve, and any decisions that you have already made about your project. If there are things you are unsure of, don't worry, a freelancer will be able to help you fill in the blanks.</div>
                        <br/>
                        <textarea type="text" className="form-control input-lg" placeholder="Describe your project here..." value={this.state.project.description}
                                  rows={6}
                               onChange={(event) => {
                                   this.setState({
                                       project: {
                                           ...this.state.description,
                                           name: event.target.value
                                       }
                                   });
                               }}/> <br/> <br/><br/>
                        <fieldset style={dashedBorder}> <br/>
                            <div className="col-sm-4">
                            <span className="btn btn-plain btn-file-uploader">
                            <input type="file" className="input-file input-lg" multiple/>
                            </span></div>
                            <div className="col-sm-4">
                                <div className="font-grey"> Drag and Drop images or documents that might be useful in explaining your project brief here.<br/> </div> </div> <br/>

                        </fieldset> <br/> <br/> <br/>
                        <h3> What skills are required? </h3>
                        <div className="font-grey"> Enter up to 5 skills that best describe your project. Freelancers will use these skills to find projects they are most interested and experienced in. </div>

                        <div id='appText'>
                            <div className='tagHere'></div> <br/>
                            <input type="text" className="form-control input-lg" placeholder="What skills are required?" value={this.state.project.skills}
                                   onChange={(event) => {
                                       this.setState({
                                           project: {
                                               ...this.state.skills,
                                               name: event.target.value
                                           }
                                       });
                                   }}/>
                            <h3 className="font-grey"> Suggested skills: <a className="underline">  Website Design</a> ,<a className="underline"> Logo Design </a>,
                                <a className="underline"> Mobile App Development </a>,<a className="underline"> Data Entry </a>, <a className="underline"> Article Writing</a> </h3>
                            <br/> <br/><br/>

                            <h3> How do you want to pay</h3>
                            <input type="radio" name="payment" value="fixed" />  <span className="font-grey"> Fixed price project</span> <br/>
                            <input type="radio" name="payment" value="hourly"/> <span className="font-grey"> Hourly project </span> <br/>



                        </div>


                    </div>
                </div>
            </div>
        )
    }
}

module.exports = PostProject;