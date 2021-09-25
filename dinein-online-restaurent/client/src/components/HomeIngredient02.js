import React from 'react';
import '../App.css';
import logo from './headers/icon/Logo.png';
import HomeIngredient02Details from './HomeIngredientDetails02';

const HomeIngredient02 = () => {

    return(
    
    <div className = "flex-HomeFounder">
        <img src={logo} className = "image-HomeFounder" alt=""/>
        <HomeIngredient02Details/>
    </div>
)
}
export default HomeIngredient02;