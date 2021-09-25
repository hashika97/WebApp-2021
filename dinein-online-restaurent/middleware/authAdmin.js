const Admins = require('../models/adminModels')

const authAdmin = async (req, res, next) =>{
    try {
        
        const admin = await Admins.findOne({
            _id: req.admin.id
        })
        if(admin.role ===0)
            return res.status(400).json({msg:"Admin resources access denied"})

            next()


    } catch (err) {
        return res.this.status(500).json({msg: err.message})
    }
}
module.exports = authAdmin