const Menu = require('../models/MenuItems')


class APIfeatures {
    constructor(query, queryString){
        this.query = query;
        this.queryString = queryString;
    }
    filtering(){
      const queryObj = {...this.queryString} //queryString = req.query
      const excludedFields = ['page', 'sort', 'limit']
      excludedFields.forEach(el => delete(queryObj[el]))
       
      let queryStr = JSON.stringify(queryObj)
      queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
      
    //    gte = greater than or equal
    //    lte = lesser than or equal
    //    lt = lesser than
    //    gt = greater than
      this.query.find(JSON.parse(queryStr))
      
      return this;
    }

    sorting(){
        if(this.queryString.sort){
           const sortBy = this.queryString.sort.split(',').join(' ')
           this.query = this.query.sort(sortBy)
         } else{
         this.query = this.query.sort('-createdAt')
       
         }
         return this;
    }

    paginating(){
        const page = this.queryString.page * 1 || 1
        const limit = this.queryString.limit * 1 || 9
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit)
        return this;
    }
    }

const menuCtrl = {


    getMenu: async(req, res) =>{
        try {
          const features = new APIfeatures(Menu.find(), req.query).filtering().sorting()
          const menu = await features.query
         

           res.json({
                status: 'success',
                result: menu.length,
                menu: menu
            })
            
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createMenu: async(req, res) =>{
        try {
           const {menu_id, title, price, description, content, images, category} = req.body;
           if(!images) return res.status(400).json({msg: "No image upload"})

           const menu = await Menu.findOne({menu_id})
           if(menu)
             return res.status(400).json({msg: "This menu item already exists."})

           const newMenu = new Menu({
                menu_id, title: title.toLowerCase(), price, description, content, images, category
           })
                
                await newMenu.save()
                res.json({msg: "Created a product"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteMenu: async(req, res) =>{
        try {
           await Menu.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted a Product"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateMenu: async(req, res) =>{
        try {
           const {title, price, description, content, images, category} = req.body;
           if(!images) return res.status(400).json({msg: "No image upload"})

           await Menu.findOneAndUpdate({_id: req.params.id}, {
           title: title.toLowerCase(), price, description, content, images, category
          })

          res.json({msg: "Updated a Product"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = menuCtrl