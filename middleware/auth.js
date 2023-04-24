const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const {Profile} = require('../models/Profile')

const protect = asyncHandler(async (req,res,next) => {
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            //get token from header- format- Bearer(space)token
            token = req.headers.authorization.split(' ')[1]
            //verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            //get user from token
            req.user = await Profile.findById(decoded.id).select('-password')
            next()
        }
        catch(err) {
            console.log(err)
            res.status(401)
            throw new Error('Not authorized')
        }
    }
    if(!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})

module.exports = protect