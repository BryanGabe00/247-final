const express = require('express')
const expressHandlebars = require('express-handlebars')
const dotenv = require('dotenv')

//load a config file that will store variables
dotenv.config({path: './config/config'})

const app = express()

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
}))
app.use(express.static(__dirname + '/public'))
app.set('view engine', 'handlebars')

const port = process.env.port || 3000


app.use('/', require('./routes/index'))
app.use('/proposal', require('./routes/index'))
app.listen(port, () => {
    console.log(`Server started listening on port: ${port}`)
})