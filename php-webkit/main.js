var gui = require('nw.gui');
var win = gui.Window.get();
var http = require('http');
var php = require('./node_modules/node-php');
var express = require('./node_modules/express');
var app = express();

win.title = gui.App.manifest.name;

var host = gui.App.manifest.phpwebkit.host;
if(host === undefined) {
	host = '127.0.0.1';
}

var port = gui.App.manifest.phpwebkit.port;
if(port === undefined) {
	port = 9090;
}

var phpinfo = {
	"path": "./application",
	"host": host,
	"port": port,
	"arguments": gui.App.argv,
	"manifest": gui.App.manifest
};

var server = http.createServer(app);
app.use('/', php.cgi(phpinfo));
server.listen(port, host);

var url = 'http://'+host+':'+port+'/';

http.get(url, function(res) {
	if(res.statusCode == 200) {
		changeState('Starting application...', '#00CD00');
	} else {
		changeState('Starting application with error code '+res.statusCode, '#FCD116');
	}
    window.location = url;
}).on('error', function(e) {
	changeState('<strong>ERROR: '+e.message+'</strong>', '#CD0000');
});

function changeState(msg, color){
	$('body').css('background-color', color);
	$('#loading p').html(msg);
}