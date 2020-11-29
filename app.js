const express=require('express');
const app= express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose')
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.urlencoded({extended:false}))
var bodyParser = require('body-parser');
const passport = require('passport');
app.set('view engine', 'ejs');

//db configuration
const db=require('./config/keys').MongoURI;
mongoose.connect(db,{useNewUrlParser:true , useUnifiedTopology: true})
.then(()=> console.log('Connected to mongoDB for password'))
.catch(err=>console.log(err))

require('./config/passport')(passport)

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.urlencoded({
    extended: false
 }));
 
app.use('/',require('./router/index'))
app.use('/user',require('./router/user'))
app.use('/user',require('./router/discussionpg'))


  
const port=process.env.port || 4200;

app.listen(port , console.log(`Server started`));