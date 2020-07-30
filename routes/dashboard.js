const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')
const Problem = require('../models/Problems')

router.get('/', ensureAuthenticated, async (req, res) => {
    const userProblems = await Problem.find({ author: req.user.name }).exec()
    res.render('dashboard/index', { 
        name: req.user.name,
        problems: userProblems
    })
})

router.get('/logout', (req, res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out')
    res.redirect('/login')
})

module.exports = router