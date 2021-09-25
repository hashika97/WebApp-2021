import React, {useContext} from 'react'
import {Link} from 'react-router-dom'
import {GlobalState} from '../../../GlobalState'


function BtnRender({menu, deleteMenu}) {
    const state = useContext(GlobalState)
    const [isUser] = state.userAPI.isUser
    const addOrdered = state.userAPI.addOrdered
     

    
    return (
        <div >
            {
                isUser ?
                <div className="flex-btn">
                    <button id="btn_order" to="#1" onClick={()=>deleteMenu(menu._id, menu.images.public_id)} className="order-btn2">
                     Delete
                    </button>
                    <Link to={`/edit/${menu._id}`}>
                    <button id="btn_order" to="#1" className="order-btn1">
                     Edit
                    </button></Link>
                    
                </div>
                : <>
                    <button id="btn_order" to="#1" onClick={()=> addOrdered(menu)} className="order-btn">
                    Order
                    </button>
                </>
            }
           
        </div>
    )
}

export default BtnRender
