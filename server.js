const express = require('express')
const ejs = require('ejs')
const path = require('path')

const PORT = process.env.PORT || 3400
const app = express()

// import controller from './src/'

app.engine('html',ejs.renderFile)
app.set('view engine', 'html')
app.set('views',path.join(process.cwd(),'src'))

app.use(express.static(path.join(__dirname,'src')))

app.get('/', (req,res) => res.render('views/home'))
app.get('/register', (req,res) => res.render('views/register'))
app.get('/login', (req,res) => res.render('views/login'))
app.get('/admin', (req,res) => res.render('views/admin'))
app.get('/image.jpeg', (req,res) => res.sendFile('uploads/image.jpeg'))
app.get('/download/:fileName', (req,res) => console.log('come'))



app.listen(PORT, () => console.log('*'+PORT))