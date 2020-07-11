const express = require('express')
const passport = require('passport')
const router = express.Router()
const bcrypt = require('bcryptjs')

// User model
const User = require('../models/User')

router.get('/', (req, res) => {
    res.render('register/index')
})

router.post('/', (req, res) => {
    //console.log(req.body)
    const { name, email, password, password2 } = req.body
    let errors = []

    // Check required fields
    if(!name || !email || !password || !password2) {
        errors.push({msg: 'Wypełnij wszystkie pola!'})
    }

    // Check passwords match
    if(password !== password2) {
        errors.push({ msg: 'Hasła są różne.' })
    }

    // Check pass length
    if(password.length < 6 ){
        errors.push({ msg: 'Hasło powinno mieć przynajmniej 6 znaków.' })
    }

    if(errors.length > 0 ){
        res.render('register', {
            errors, 
            name,
            email,
            password,
            password2
        })
    } else {
        // Validation passed
        User.findOne({ email: email })
            .then(user => {
                if(user) {
                    // User exists
                    errors.push({ msg: 'Istnieje już konto z takim emailem.'})
                    res.render('register', {
                        errors, 
                        name,
                        email,
                        password,
                        password2
                    })
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password,
                    })
                    // Hash Password
                    
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if(err) throw err
                            // Set password to hashed
                            newUser.password = hash
                            // Save user
                            newUser.save()
                                .then( user =>{
                                    req.flash('sucess_msg', 'Zostałeś zarejestrowany i możesz teraz się zalogować.')
                                    res.redirect('/login')
                                })
                                .catch(err => console.log(err))
                        })
                    })
                }
            })
            .catch(err => console.log(err))
    }
})

module.exports = router