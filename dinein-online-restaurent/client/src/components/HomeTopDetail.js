import React from 'react';
import '../App.css';

import logo from '../pages/images/Logo.png';

const HomeTopImageDetailsText = () => {

    return(
    
    <div className = "Home-top-details">
    <img src={logo} className="Home-Logo-styles" alt=""></img>
    <h1>Dine In</h1>
    <h3>Since 2004, we give you best quality delisious food </h3>
    <h3>collection in one place.</h3>
    </div>
)
}
export default HomeTopImageDetailsText;