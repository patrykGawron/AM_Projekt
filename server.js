if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

// Routers
const indexRouter = require('./routes/index')
const primarySchoolRouter = require('./routes/primarySchool')
const highSchoolRouter = require('./routes/highSchool')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')


// Setup
app.use(expressLayouts)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(express.static('public'))


// MongoDB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, 
                {   useUnifiedTopology: true,
                    useNewUrlParser: true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


// Routes
app.use('/', indexRouter)
app.use('/primarySchool', primarySchoolRouter)
app.use('/highSchool', highSchoolRouter)
app.use('/login', loginRouter)
app.use('/register', registerRouter)


app.listen(process.env.PORT || 3000)