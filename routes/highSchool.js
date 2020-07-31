const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('highSchool/index')
})

router.get('/quadraticFunction', (req, res) => {
    res.render('highSchool/quadraticFunction')
})

router.get('/circleEquation', (req, res) => {
    res.render('highSchool/circleEquation')
})

module.exports = router