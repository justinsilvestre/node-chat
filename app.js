var socket = require('socket.io')
	, http = require('http');

var app = require('express')();
var s = http.createServer(app);
var io = socket(app.listen(8000));


app.get('/', function(request, response) {
	response.sendFile(__dirname + '/index.html')
});

// when new client connects to server
io.on('connection', function(socket) {
	console.log('Client connected...');


	// emit messages event on the client
	socket.broadcast.emit('welcome', 'someone has entered')

	socket.on('chat message', function(msg) {
		console.log(msg);
		socket.broadcast.emit('chat message', msg)
	});

	socket.on('disconnect', function(msg) {
		socket.broadcast.emit('goodbye', 'someone has left')
	});


});




// var io = socket.listen(app.listen(8000));