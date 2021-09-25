const Admins = require('../models/adminModels')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const adminCtrl = {
    register:async(req, res) =>{
        try{
            const {name, email, password}= req.body;
            const admin = await Admins.findOne({email})

            if(admin) return res.status(400).json({msg:"The email already exists."})
            
            if(password.length < 6) 
            return res.status(400).json({msg: "Password is at least 6 characters long."})

            // Password Encryption
            const passwordHash = await bcrypt.hash(password, 10)
            const newAdmin = new Admins({
                name, email, password: passwordHash
            })
            await newAdmin.save()

            const accesstoken = createAccessToken({id: newAdmin._id})
            const refreshtoken = createRefreshToken({id: newAdmin._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/admin/refresh_token',
                maxAge: 7*24*60*60*1000
            })

            res.json({accesstoken})
            //res.json({msg: "Register success"})
        
        }catch(err) {
            return res.status(500).json({msg:err.message})
        }
    },
    login: async (req, res) =>{
        try {
            const {email, password} = req.body;

            const admin = await Admins.findOne({email})
            if(!admin) return res.status(400).json({msg: "User does not exist."})
            
            const isMatch = await bcrypt.compare(password, admin.password)
            if(!isMatch) return res.status(400).json({msg: "Incorrect password."})

            const accesstoken = createAccessToken({id: admin._id})
            const refreshtoken = createRefreshToken({id: admin._id})

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                path: '/admin/refresh_token',
                maxAge: 7*24*60*60*1000
            })

            res.json({accesstoken})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async (req, res) =>{
        try {
            res.clearCookie('refreshtoken', {path: '/admin/refresh_token'})
            return res.json({msg: "Logged out"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    refreshToken: (req, res) =>{
        try {
            const rf_token = req.cookies.refreshtoken;
            if(!rf_token) return res.status(400).json({msg:"Please Login or Register."})
    
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, admin) =>{
                    if(err) return res.status(400).json({msg: "Please Login or Register."})
                    const accesstoken = createAccessToken({id: admin.id})
                    res.json({accesstoken})
                })

           //res.json({rf_token})

        } catch (err) {
            return res.status(500).json({msg: err.message})
            
        }
        
    },
    getAdmin: async (req, res) =>{
        try {
            const admin = await Admins.findById(req.admin.id).select('-password')
            if(!admin) return res.status(400).json({msg: "User does not exist."})
            res.json(admin)
        } catch (err) {
            return res.status(500).json({msg: err.message})
             
        }
    },
    addOrder: async (req,res) =>{
        try {
            const admin = await Admins.findById(req.admin.id)
            if(!admin) return res.status(400).json({msg: "User does not exist."})

            await Admins.findOneAndUpdate({_id: req.admin.id}, {
                ordered: req.body.ordered
            })

            return res.json({msg: "Added to cart"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
             
        }
    }
    
}

const createAccessToken = (admin) =>{
    return jwt.sign(admin, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '11m'})
}
const createRefreshToken = (admin) =>{
    return jwt.sign(admin, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '7d'})
}
module.exports = adminCtrl
