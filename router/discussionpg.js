var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose1 = require('mongoose');
//app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

var description = mongoose1.model('Message',{
    name : String,
    message : String
})
const dbUrl="mongodb://localhost/test";
app.get('/des', (req, res) => {
    description.find({},(err, messages)=> {
      res.send(description);
    })
  })

  app.get('/des/:user', (req, res) => {
    var user = req.params.user
  description.find({name: user},(err, description)=> {
      res.send(description);
    })
  })
  app.post('/des', async (req, res) => {
    var desc = new description(req.body);
    message.save((err) =>{
      if(err)
        sendStatus(500);
      io.emit('desc', req.body);
      res.sendStatus(200);
    })
  })

  io.on('connection', () =>{
    console.log('a user is connected')
})
  
mongoose1.connect(dbUrl ,{useMongoClient : true} ,(err) => {
    console.log('mongodb connected',err);
}) 