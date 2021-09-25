import React from 'react';
import '../App.css';
import ContactUs from './HomeContactUs';
import Customer from './HomeComments';
import logo from '../pages/images/Logo.png';

const HomeContactUsComments = () => {

    return(
    
    <div className = "flex-HomeFounder">
        <Customer/>
        <img src={logo} className="Home-Logo-styles" alt="" ></img>
        <ContactUs/>
    </div>
)
}
export default HomeContactUsComments;