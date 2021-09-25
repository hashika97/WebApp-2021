import React, {useContext, useState} from 'react'
import MenuHeader from '../MenuHeader/Menuheader'
import { GlobalState } from '../../GlobalState'
import MenuItem from './utils/menuItem'
import axios from 'axios'
import Filters from './Filters'

function Menu() {
    const state = useContext(GlobalState)
    const [menu, setMenu] = state.menuAPI.menu
    const [isUser]=state.userAPI.isUser
    const [token] = state.token
    const [callback, setCallback] = state.menuAPI.callback
    const [isCheck, setIsCheck] = useState(false)
    const handleCheck = (id) => {
       menu.forEach(menu =>{
           if(menu._id === id) menu.checked = !menu.checked
       })
       setMenu([...menu])
     }

     const deleteMenu = async(id, public_id) =>{
       
        try {
          const destroyImg = axios.post('/api/destroy',{public_id},{
             headers: {Authorization: token}
          })
           const deleteMenu = axios.delete(`/api/menu/${id}`,{
            headers: {Authorization: token}
            })
           await destroyImg
            await deleteMenu
           setCallback(!callback)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }

const checkAll = () =>{
    menu.forEach(menu =>{
        menu.checked = !isCheck
    })
    setMenu([...menu])
    setIsCheck(!isCheck)
}
const deleteAll = () =>{
    menu.forEach(menu =>{
        if(menu.checked)deleteMenu(menu._id , menu.images.public_id)
    })
}
    return (
        <div>
         <MenuHeader/>
         <Filters/>
        {
            isUser &&
            <div className = "delete-all">
                <span>Select all</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Delete all</button>
            </div>
        }
        
       
        <div className="flex">
            {
                menu.map(menu =>{
                    return <MenuItem key={menu._id} menu={menu} 
                    isUser={isUser} deleteMenu={deleteMenu} handleCheck={handleCheck} />
               
                })
            }
        </div>
        
        </div>
    )
}
export default Menu
