import React from 'react';
import '../App.css';
import logo from './headers/icon/Logo.png';
import HomeIngredient01Details from './HomeIngredientsDetails01';

const HomeIngredient01 = () => {

    return(
    
    <div className = "flex-HomeFounder">
         <HomeIngredient01Details/>
        <img src={logo} className = "image-HomeFounder" alt=""/>
       
    </div>
)
}
export default HomeIngredient01;