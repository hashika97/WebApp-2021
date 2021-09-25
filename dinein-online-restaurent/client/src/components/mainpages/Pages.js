import React, {useContext} from 'react'
import {Switch, Route} from 'react-router-dom'
import Menu from './Menu';
import Admin from './Admin';
import NotFound from './NotFound';


import {GlobalState} from '../../GlobalState'
import Home from './Home'
import SignUp from './SignUp';
import OrderedList from './OrderedList';
import Categories from './Categories';
import Create from './Create';


function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isUser] = state.userAPI.isUser


    return (
        <div>
           
        
        <Switch>
        
        <Route path="/admin" exact component={isLogged ? NotFound : Admin}/>
        <Route path="/menu" exact component={Menu}/>
        <Route path="/create" exact component={isLogged ? Create : NotFound}/>
        <Route path="/edit/:id" exact component={isLogged ? Create : NotFound}/>
       
        <Route path="/category" exact component={isUser ? Categories : NotFound}/>
        <Route path="/register" exact component={isLogged ? NotFound : SignUp}/>
        <Route path="/orderedlist" exact component={OrderedList}/>
        <Route path="/" exact component={Home}/>
        
        <Route path = "/*" component={NotFound}/>
       </Switch>
       
       </div>
    )
}

export default Pages