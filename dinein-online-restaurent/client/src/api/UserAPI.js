import axios from 'axios'
import {useState, useEffect} from 'react'

function UserAPI(token) {

const [isLogged, setIsLogged] = useState(false)
const [isUser, setIsUser] = useState(false)
const [ordered, setOrdered] = useState([])

useEffect(() =>{

if(token){
    const getAdmin = async () =>{
        try {
            const res = await axios.get('/admin/infor', {
                headers: {Authorization:token}
            })
            setIsLogged(true)
            res.data.role ===1 ? setIsUser(true): setIsUser(false)
            setOrdered(res.data.cart)
        } catch (err) {
            alert(err.response.data.msg)
        }
    }
    getAdmin()
}

},[token])

const addOrdered = async(menu) =>{
const check = ordered.every(item =>{
    return item._id !== menu._id
})
if(check){
    setOrdered([...ordered, {...menu, quantity: 1}])

    await axios.patch('/admin/addorder', {ordered: [...ordered, {...menu, quantity:1}]},{
        headers: {Authorization: token}
    })

}else{
    alert("Your order has noted and added to the list.")
}
}

    return {
        isLogged: [isLogged, setIsLogged],
        isUser: [isUser, setIsUser],
        ordered: [ordered, setOrdered],
        addOrdered: addOrdered
    }
}

export default UserAPI
