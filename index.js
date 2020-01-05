const express = require('express');
const bodyParser = require('body-parser')
const Nexmo = require('nexmo')
const ejs = require('ejs')

const messager = new Nexmo({
    apiKey: '',
    apiSecret: ''

},{debug : true})


const app = express()
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.set('view engine','html');
app.engine('html',ejs.renderFile);

app.get('/',(req,res)=>{
    res.render('index')
})

app.post('/post',(req,res)=>{
    const number = req.body.phone
    const mes = req.body.text
    const from = 'Nexmo';
const to = '91' + number;
const text = '' + mes;

messager.message.sendSms(from, to, text);
res.redirect('/')
})

app.use(express.static(__dirname + '/public'));

app.listen(3000,()=>console.log('server started at localhost:3000'))

