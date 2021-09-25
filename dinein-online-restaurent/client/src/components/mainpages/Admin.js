import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import user from '../headers/icon/user.png'
import axios from 'axios'


const UserName = 'Username'

const Password = 'Password'



function Admin() {

    const [admin, setAdmin] =  useState({
        email:'',password:''
    })

    const onChangeInput = e =>{
        const{name, value} = e.target;
        setAdmin({...admin,[name]:value})
    }
    const loginSubmit =async e=>{
        e.preventDefault()
        try {
            await axios.post('/admin/login',{...admin})
           localStorage.setItem('firstLogin', true)
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
    <div className="Login-App-header">
    <form onSubmit={loginSubmit}>
    <div>
    <div className="Login-App-login ">
    <img src={user} className="Login-App-user-image-block" alt=""></img>
    <div className="Login-App-login-row-spacing-01"></div>
    
    <div >
        {UserName} 
        <input 
        type="email" 
        name="email" 
        required 
        placeholder="Email" 
        value={admin.email}
        onChange={onChangeInput}>
            </input>  
    </div>
    
    <div className="Login-App-login-row-spacing"></div>
    
    <div>
        {Password}  
        <input 
        type="password" 
        name="password" 
        required 
        placeholder="Password" 
        value={admin.password}
        autoComplete="on"
        onChange={onChangeInput}>
        </input>  
    
        </div>
    
    <button type="submit" className="Login-App-login-login-button">Login</button>
    <Link to="/register"><button  className="Login-App-login-signup-button">SignUp</button></Link>
      </div>
    </div>
    </form>
</div>
    )
}
export default Admin;
