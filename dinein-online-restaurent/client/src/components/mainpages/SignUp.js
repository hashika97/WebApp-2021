import React, { useState} from 'react'
import { Link } from 'react-router-dom'
import user from '../headers/icon/user.png'
import axios from 'axios'


const Name = 'Name'

const UserName = 'Username'

const Password = 'Password'



function SignUp() {

    const [admin, setAdmin] =  useState({
       name:'', email:'',password:''
    })

    const onChangeInput = e =>{
        const{name, value} = e.target;
        setAdmin({...admin,[name]:value})
    }
    const registerSubmit =async e=>{
        e.preventDefault()
        try {
            await axios.post('/admin/register',{...admin})
            
            localStorage.setItem('firstLogin', true)
            window.location.href = "/";
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    return (
    <div className="Login-App-header">
    <form onSubmit={registerSubmit}>
    <div>
    <div className="Login-App-login ">
    <img src={user} className="Login-App-user-image-block" alt=""></img>
    <div className="Login-App-login-row-spacing-01"></div>
    
    <div >
        {Name} 
        <input 
        type="text" 
        name="name" 
        required 
        placeholder="Name" 
        value={admin.name}
        onChange={onChangeInput}>
            </input>  
    </div>

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
    
    <button type="submit" className="Login-App-login-login-button">Register</button>
    <Link to="/login"><button  className="Login-App-login-signup-button">Login</button></Link>
      </div>
    </div>
    </form>
</div>
    )
}
export default SignUp;
