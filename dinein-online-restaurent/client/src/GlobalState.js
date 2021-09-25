import axios from 'axios'
import React, {createContext, useState, useEffect} from 'react'
import MenuAPI from './api/MenuAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
   
const [token, setToken] = useState(false)

useEffect(() =>{
    const firstLogin = localStorage.getItem('firstLogin')

    if (firstLogin) {
        const refreshToken = async () =>{
        const res = await axios.get('/admin/refresh_token')
        
            setToken(res.data.accesstoken)
            setTimeout(() =>{
                refreshToken()
            },10 * 60 * 1000)
        } 
        
          
        refreshToken()
    }

  },[])

    
  
    const state = {
        token: [token, setToken],
        menuAPI :MenuAPI(),
        userAPI :UserAPI(token),
        categoriesAPI: CategoriesAPI()
    }
      
    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}