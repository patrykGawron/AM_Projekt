const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('primarySchool/index')
})

router.get('/pythagoreanTheorem', (req, res) => {
    res.render('primarySchool/pythagoreanTheorem')
})


module.exports = router