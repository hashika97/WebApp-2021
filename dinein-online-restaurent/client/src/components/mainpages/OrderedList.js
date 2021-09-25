import React, {useContext, useState, useEffect} from 'react'
import {GlobalState} from '../../GlobalState'

function OrderedList() {
    const state = useContext(GlobalState)
    const [ordered, setOrdered] = state.userAPI.ordered
    const [total, setTotal] = useState(0)


useEffect(() => {
    const getTotal = () =>{
const total = ordered.reduce((prev, item) => {
    return prev + (item.price * item.quantity)

},0)
setTotal(total)
    }
    getTotal()
}, [ordered])

const increment = (id) =>{
    ordered.forEach(item =>{
        if(item._id === id){
            item.quantity += 1
        }
    })
    setOrdered([...ordered])
}

const decrement = (id) =>{
    ordered.forEach(item =>{
        if(item._id === id){
            item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
        }
    })
    setOrdered([...ordered])
}

const removeMenu = id =>{
    if (window.confirm("Do you want to remove this from your order ?")){
        ordered.forEach((item, index) =>{
            if(item._id === id){
                ordered.splice(index, 1)
            }
        })
        setOrdered([...ordered])
    }
}

    if(ordered.length === 0)
        return <h3 style={{textAlign:"center", fontSize:"3rem"}}>No any orders</h3>
    return (
        <div>
          {
              ordered.map(menu =>(
                  <div key={menu._id}>
                    <div className="ordered-menu-blocks" key={menu._id}>
           
                    <div className="flex">
           
                         <img src={menu.images.url} alt="" className="menu-image-block"/>

                        <div className = "menu-item-detail-align">
                        <h3 title={menu.title} className = "menu-item-name">{menu.title}</h3>
                        <p className = "menu-item-detail">{menu.description}</p>
                        <div className="flex">
                        <h3 className = "menu-item-price">Rs: {menu.price*menu.quantity}</h3>
                        <div>
                            <button onClick={()=> decrement(menu._id)}> - </button>
                            <span>{menu.quantity}</span>
                            <button onClick={()=> increment(menu._id)}> + </button>
                        </div>
                        <div>
                        <button onClick={()=> removeMenu(menu._id)}> X </button>
                        </div>
                        </div>
                        </div>
                        </div>
                     </div>
                  </div>
              ))
          }
          <div>
              <h3>Total: Rs: {total}</h3>
          </div>
        </div>
    )
}

export default OrderedList
