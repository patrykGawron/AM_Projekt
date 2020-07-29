if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

// Passport config
require('./config/passport')(passport)


// Setup
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.static('public'))


// Bodyparser
app.use(express.urlencoded({ extended: false }))

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
}))

app.use(passport.initialize())
app.use(passport.session())
// Connect flash
app.use(flash())

// Global Variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('sucess_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next();
})

app.use(function(req, res, next){
    res.locals.login = req.isAuthenticated();
    next()
})


// MongoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, 
                {   useUnifiedTopology: true,
                    useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


// Routers
const indexRouter = require('./routes/index')
const primarySchoolRouter = require('./routes/primarySchool')
const highSchoolRouter = require('./routes/highSchool')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const dashboardRouter = require('./routes/dashboard')

// Routes
app.use('/', indexRouter)
app.use('/primarySchool', primarySchoolRouter)
app.use('/highSchool', highSchoolRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)
app.use('/dashboard', dashboardRouter)


app.listen(process.env.PORT || 3000)