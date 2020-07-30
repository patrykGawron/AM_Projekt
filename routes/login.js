const express = require('express')
const router = express.Router()
const passport = require('passport')
const { ensureNotAuthenticated } = require('../config/notAuth')

router.get('/', ensureNotAuthenticated, (req, res) => {
    res.render('login/index')
})

router.post('/', ensureNotAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})

module.exports = router