import React from 'react';
import '../App.css';




    const EmailPlaceHolders = '  Email'
    const Email = <input placeholder = {EmailPlaceHolders} autoCapitalize ></input>
    
    const CommentPlaceHolders = '  Write your comment here...'
    const Comments = <input placeholder = {CommentPlaceHolders} autoCapitalize ></input>
    
    const Customer = () =>{
        return(
            
            <div className = "Customer">
                <h1 className="Your-comments">Your comments</h1>
                <div className="Comment-emailbox">{Email}</div>
                <div className="Comment-commentbox">{Comments}</div>
            </div>
          
        );
    }
    export default Customer;