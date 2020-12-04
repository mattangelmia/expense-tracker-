const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middleware/auth')
const User = require('../models/User')


// GER api/auth
// get logged in users
// Private
router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }


})

//POST api/author// loggin an users
// public
router.post('/', async (req, res) => {

    const {
        email,
        password
    } = req.body

    try {

        let user = await User.findOne({
            email: email
        })
        if (!user) {
            res.status(404).json({
                message: 'User not found'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({
                msg: 'Invalid credentials'
            })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtsecret'), {
            expiresIn: 3600
        }, (err, token) => {
            if (err) throw err
            res.json({
                token
            })
        })


    } catch (err) {
        console.log(err.message)
        res.status(500).send('server error')
    }





})


module.exports = router;