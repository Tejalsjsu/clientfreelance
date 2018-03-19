import React, {Component} from 'react';
import {Link, withRouter, Route} from 'react-router-dom';
import cookie from "react-cookies";
import '../slider.css';

class Slider extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: '',
        isLoggedIn: '',
        userId: cookie.load('userId')
    };

    render() {
        return (
            <div>
                <div className="switch switch-blue">
                    <input type="radio" className="switch-input" name="view2" value="week2" id="week2"/>
                        <label for="week2" className="switch-label switch-label-off"> Employer </label>
                        <input type="radio" className="switch-input" name="view2" value="month2" id="month2"/>
                            <label for="month2" className="switch-label switch-label-on"> Freelancer </label>
                            <span className="switch-selection"></span>
                </div>
            </div>
        );
    }
}

export default Slider;