import {useState, useEffect} from 'react'
import axios from 'axios'


function MenuAPI() {
    const [menu, setMenu] = useState([])
    const [callback, setCallback] = useState(false)
    const [category, setCategory] = useState('')
    const [sort, setSort] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [result, setResult] = useState(0)
   useEffect(() =>{
        const getMenu = async () => {
            const res = await axios.get(`/api/menu?${category}&${sort}&title[regex]=${search}`)
            setMenu(res.data.menu)
           setResult(res.data.result)
        }
        getMenu()
    },[callback, category, sort, search])
        
  
    
    return {
        menu: [menu, setMenu],
        callback: [callback, setCallback],
        category: [category, setCategory],
        sort: [sort, setSort],
        search: [search, setSearch],
        page: [page, setPage],
        result: [result, setResult]
      
    }
}

export default MenuAPI
