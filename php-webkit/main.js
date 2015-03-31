var gui = require('nw.gui');
var win = gui.Window.get();
var http = require('http');
var php = require('node-php');
var express = require('express');
var app = express();
var os = require('os');
var os = os.platform();

win.title = gui.App.manifest.name;

var bin = gui.App.manifest.phpwebkit.bin;
if(bin === undefined || bin == "") {
	if(os == 'win32' || os == 'win64') {
		bin = './php/php-cgi.exe';
	} else if(os == 'darwin') {
		bin = './php/php-cgi';
	} else if(os == 'linux') {
		bin = './php/php-cgi';
	} else {
		bin = 'php-cgi';
	}
}

var path = gui.App.manifest.phpwebkit.path;
if(path === undefined || path == "") {
	path = './application';
}

var host = gui.App.manifest.phpwebkit.host;
if(host === undefined || host == "") {
	host = '127.0.0.1';
}

var port = gui.App.manifest.phpwebkit.port;
if(port === undefined || port == "") {
	port = 9090;
}

var phpinfo = {
	"path": path,
	"bin": bin,
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