var express = require('express'),
	swig = require('swig'),
	consolidate = require('consolidate');
var app = express();
var mensajes = [],
	ress = [];

swig.init({
	cache			: false
});

// View engine
app.engine('.html', consolidate.swig);
app.set('view engine', 'html');
app.set('views', './views');

// static files
app.use(express.static('./public'));

// post
app.use(express.bodyParser());
app.use(express.cookieParser());

app.get('/', function(req, res) {
	res.render('home', {
		mensajes		: mensajes
	});
});

app.post('/mensajes/new', function(req, res) {
	mensajes.push(req.body.mensaje);

	ress.forEach(function(res){
		res.send(mensajes);
	});

	res.send('Tu mensaje es: ' + req.body.mensaje);
});

app.get('/mensajes/list', function(req, res) {
	ress.push(res);
});

app.listen(3000);
console.log('Aplicación funcionando');
