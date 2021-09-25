import React, {useContext} from 'react'
import {GlobalState} from '../../GlobalState'
import logo from './icon/Logo.png'
import {Link} from 'react-router-dom'
import axios from 'axios'

function Header() {
    const navStyle = {
        color: 'white',
        textDecoration: 'none',
        fontSize:'20px'
    }
const state = useContext(GlobalState)
const [isLogged, setIsLogged] = state.userAPI.isLogged
const [isUser, setIsUser] = state.userAPI.isUser
const [ordered] = state.userAPI.ordered



   const logoutAdmin = async () =>{
       await axios.get('/admin/logout')
       
        localStorage.removeItem('firstLogin')
        
        window.location.href = "/";
    }

    const userRouter = () =>{
       return(
           <div  className = "nav-links">
               <li  className = "nav-links"><Link to="/create" style={navStyle}>Create</Link></li>
               <li  className = "nav-links"><Link to="/category" style={navStyle}>Categories</Link></li>
           </div>
        )
    }

    const loggedRouter = () =>{
        return(
           <div  className = "nav-links">
                <li  className = "nav-links"><Link to="/" style={navStyle} onClick={logoutAdmin}>Logout</Link></li>
            </div>
        )
    }


  

    return (

           

      <header >
          <nav className = "Nav">
          
            
            <img src={logo} className="nav-logo" alt=""></img>
            
              
             <h2 className = "nav-DineIn">{isUser ? 'Admin' : 'DineIn'}</h2>
            
            
            <div  className="nav-links"></div>
            <ul className="nav-links">
              
            <Link style={navStyle} to="/">
            <li className = "nav-links">Home</li>
            </Link>
            <Link style={navStyle} to="/menu">
            <li className = "nav-links">{isUser ? 'Menu' : 'Menu'}</li>
            </Link>

{isUser && userRouter()}
{
  isLogged ? loggedRouter() : <Link style={navStyle} to="/admin">
                            <li className = "nav-links">Admin</li>
                            </Link>
}

           
            
            
           
           
            
        </ul>

           
        </nav>
      </header>
    )
}

export default Header
