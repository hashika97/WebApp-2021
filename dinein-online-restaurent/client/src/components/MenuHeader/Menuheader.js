import React from 'react'
import {Link} from 'react-router-dom'


function MenuHeader() {
    

    return (
        <header>
            <div className="menu-container" >
               
            <Link to="/orderedlist">
            <button className="ordered">Ordered list</button>
            </Link>
            </div>

            

           
            
        </header>
    )
}

export default MenuHeader