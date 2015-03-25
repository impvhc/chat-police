var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var selector = require('./selector.js');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var unidades = [];

io.on('connection', function(socket){
  unidades.push(socket);

  socket.on('actualizar', function (data) {
  	if (typeof data == 'string')
  		data = JSON.parse(data);
  	socket.posicion = data.posicion;
    socket.estatus = data.estatus;
    socket.numero = data.numero;
    console.log(data);
  });

  socket.on('persecucion', function (data) {
  	if (typeof data == 'string')
  		data = JSON.parse(data);
    var disponibles = selector.getDisponibles(unidades, data);
    for(x in disponibles){
    	try{
    		if(socket.id != disponibles[x].id)
	    		io.to(disponibles[x].id).emit('persecucion',data);
    	}catch(e){
    		console.log(e);
    	}
    }
  });

  socket.on('disconnect', function () {
	  for(x in unidades){
	  	if(unidades[x].id == socket.id)
	  		unidades.splice(x,1);
	  }
  });

});

http.listen(process.env.PORT || 80, function(){
  console.log('listening on *:80');
});
