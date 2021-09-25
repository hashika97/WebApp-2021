import React from 'react'
import HomeTopImage from '../HomeTopImage';
import HomeFounder from '../HomeFounder';
import HomeIngredient01 from '../HomeIngredient01';
import HomeIngredient02 from '../HomeIngredient02';
import HomeContactUsComments from '../HomeContactUsComments';
import HomeCrew from '../HomeCrew';


function Home() {
    return (
       
        <div>
     <HomeTopImage/>
     <div>
     <HomeFounder/>
   
    <h2 >We have good collection of food all around the world with different flavours</h2>
    
    
    <div>
        <h2>FARMED FRESH</h2>
        <HomeIngredient01/>
        <HomeIngredient02/>
        <HomeCrew/>
        
    <div className="Home-ContactUs">
    <HomeContactUsComments/>
    </div>
    
    </div>
     </div>
    </div>
    )
}
export default Home;
