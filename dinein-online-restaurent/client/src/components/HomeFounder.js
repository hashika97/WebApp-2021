import React from 'react';
import '../App.css';
import logo from './headers/icon/Logo.png';
import HomeFounderDetails from './HomeFounderDetails';

const HomeFounder = () => {

    return(
    
    <div className = "flex-HomeFounder">
        <img src={logo} className = "image-HomeFounder" alt=""/>
        <HomeFounderDetails/>
    </div>
)
}
export default HomeFounder;