const express = require('express')
const expressHandlebars = require('express-handlebars')
const dotenv = require('dotenv')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')

const db = require('./config/db')

//load a config file that will store variables
dotenv.config({path: './config/config.env'})

//initialize my passport config
require('./config/passport')(passport)

db.connectDB()
const app = express()

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))

//needed to read the information from POST 
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use(express.static(__dirname + '/public'))
app.set('view engine', 'handlebars')

//using the sessions
app.use(session({
    secret: 'mylittlesecret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))

//pasport middleware
app.use(passport.initialize())
app.use(passport.session())

const port = process.env.port || 3000

app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.listen(port, () => {
    console.log(`Server started listening on port: ${port}`)
})