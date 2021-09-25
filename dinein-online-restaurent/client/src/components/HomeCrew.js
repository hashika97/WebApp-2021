import React from 'react';
import '../App.css';
import logo from './headers/icon/Logo.png';
import HomeCrewDetails from './HomeCrewDetail';

const HomeCrew = () => {

    return(
    
    <div className = "flex-HomeFounder">
        <HomeCrewDetails/>
        <img src={logo} className = "image-HomeFounder" alt=""/>
        
    </div>
)
}
export default HomeCrew;