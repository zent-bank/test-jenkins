var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());

var port = process.env.PORT || 3000;

io.on('connection', function(socket) {
    console.log("connected")
    socket.on('chat message', function(msg) {
        console.log("chat message", msg)
        io.emit('chat message', msg);
    });

    socket.on('error', (error) => {
      console.log("chat message", "error")
    });
    socket.on('disconnect', (reason) => {
      console.log("chat message", "disconnect")
    });
});

app.post('/signin',function(req, res, next){
  console.log(req.body);
  res.cookie("userLogin" , req.body).send('Cookie is set');
  console.log(req.cookies);
});

var chat = io
  .of('/chat')
  .on('connection', function (socket) {
    socket.emit('a message', {
        that: 'only'
      , '/chat': 'will get'
    });
    chat.emit('a message', {
        everyone: 'in'
      , '/chat': 'will get'
    });
  });


http.listen(port, function() {
    console.log('listening on *:' + port);
});

