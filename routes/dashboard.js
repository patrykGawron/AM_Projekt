const express = require('express')
const router = express.Router()
const { ensureAuthenticated } = require('../config/auth')

router.get('/', ensureAuthenticated, (req, res) => {
    res.render('dashboard/index', { name: req.user.name })
})

router.get('/logout', (req, res) =>{
    req.logout();
    req.flash('success_msg', 'You are logged out')
    res.redirect('/login')
})

module.exports = router