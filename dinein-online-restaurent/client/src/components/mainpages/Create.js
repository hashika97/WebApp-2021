import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {GlobalState} from '../../GlobalState'
import {useHistory, useParams} from 'react-router-dom'


const initialState = {
  menu_id: '',
  title:'',
  price:0,
  description:'menu item description',
  content:'',
  category:'',
  _id:''
}

function Create() {
  const state = useContext(GlobalState)
  const [menu, setMenu] = useState(initialState)
  const [categories] = state.categoriesAPI.categories
  const [images,setImages] = useState(false)
  


const [isUser] = state.userAPI.isUser
const [token] = state.token

  const history = useHistory()
  const param = useParams()

  const [menus] = state.menuAPI.menu
  const [onEdit, setOnEdit] = useState(false)
  const [callback, setCallback] = state.menuAPI.callback

useEffect(()=>{
  if(param.id){
    setOnEdit(true)
    menus.forEach(menu =>{
      if(menu._id === param.id) {
        setMenu(menu)
        setImages(menu.images)
      }
    })

  }else{
    setOnEdit(false)
    setMenu(initialState)
    setImages(false)
  }
}, [param.id, menus])


const handleUpload = async e =>{
  e.preventDefault()
  try {
    if(!isUser) return alert("You are not an admin")
    const file = e.target.files[0]
            
            if(!file) return alert("File not exist.")

            if(file.size > 1024 * 1024) // 1mb
                return alert("Size too large!")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png') // 1mb
                return alert("File format is incorrect.")

            let formData = new FormData()
            formData.append('file', file)

            
            const res = await axios.post('/api/upload', formData, {
                headers: {'content-type': 'multipart/form-data', Authorization: token}
            })
           
            setImages(res.data)
  } catch (err) {
    alert(err.response.data.msg)
  }
}

const handleDestroy = async () => {
  try {
      if(!isUser) return alert("You're not an admin")
      
      await axios.post('/api/destroy', {public_id: images.public_id}, {
          headers: {Authorization: token}
      })
      
      setImages(false)
  } catch (err) {
      alert(err.response.data.msg)
  }
}

const handleChangeInput = e =>{
  const {name, value} = e.target
  setMenu({...menu, [name]:value})
}


const handleSubmit = async e =>{
  e.preventDefault()
  try {
      if(!isUser) return alert("You're not an admin")
      if(!images) return alert("No Image Upload")

      if(onEdit){
          await axios.put(`/api/menu/${menu._id}`, {...menu, images}, {
              headers: {Authorization: token}
         })
      }else{
          await axios.post('/api/menu', {...menu, images}, {
              headers: {Authorization: token}
          })
        }
        
      setCallback(!callback)
      history.push("/")
  } catch (err) {
      alert(err.response.data.msg)
  }
}



  const styleUpload ={
    display: images ? "block" : "none"
  }



  return (
        <div className="create_product">

          <div className="upload">
            <input type="file" name="file" id="file_up" onChange={handleUpload}/>
           
           
           
            <div id="file_img" style={styleUpload}>
              <img src={images ? images.url:''} alt="" />
              <span onClick={handleDestroy}>X</span>
            </div>
            </div>

            <form onSubmit={handleSubmit}>
            <div className="row">
              <label htmlFor="menu_id">MenuItem Id</label>
              <input type="text" name="menu_id" id="menu_id" required
              value={menu.menu_id} onChange={handleChangeInput} disabled={menu._id} />
            </div>

            <div className="row">
              <label htmlFor="title">Title</label>
              <input type="text" name="title" id="title" required
              value={menu.title} onChange={handleChangeInput} />
            </div>

            <div className="row">
              <label htmlFor="price">Price</label>
              <input type="number" name="price" id="price" required
              value={menu.price} onChange={handleChangeInput} />
            </div>

            <div className="row">
              <label htmlFor="description">Description</label>
              <input type="text" name="description" id="description" required
              value={menu.description} onChange={handleChangeInput} />
            </div>

            <div className="row">
              <label htmlFor="content">Content</label>
              <input type="text" name="content" id="content" required
              value={menu.content} onChange={handleChangeInput} />
            </div>

            <div className="row">
              <label htmlFor="categories">Categories :</label>
              <select name ="category" value={menu.category} onChange={handleChangeInput} >
                <option value="">Please select a category.</option>
                  {
                    categories.map(category =>(
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    ))
                  }

              </select>
            </div>
                  <button type="submit" >{onEdit? "Update" :  "Create"}</button>
                  </form>
        </div>
    )
}

export default Create
