var phpwebkit = {

	runApp: function(){

		var gui = require('nw.gui');
		var win = gui.Window.get();
		var os = require('os');
		var os = os.platform();
		var pw = this;
        var fs = require('fs');

		process.on('uncaughtException', function(err){
			pw.changeState('<strong>'+err+'</strong>', '#CD0000');
		});

		win.title = gui.App.manifest.name;

		var bin = gui.App.manifest.phpwebkit.bin;
		if(bin === undefined || bin == "") {
			if(os == 'win32' || os == 'win64') {
				bin = './bin/php/php-cgi.exe';
			} else if(os == 'darwin') {
				bin = './bin/php/php-cgi';
			} else if(os == 'linux') {
				bin = './bin/php/php-cgi';
			} else {
				bin = 'php-cgi';
			}
		}
        var path = process.cwd() + bin.slice(1);
        if(fs.existsSync(path)){
            // set the permissions to be able to execute
            fs.chmodSync(path, 0755);
        }

		this.fileExists(bin, function(result){
			if(result === false) { 
				return 'php-cgi';
			}
		});

		var path = gui.App.manifest.phpwebkit.path;
		if(path === undefined || path == "") {
			path = './application';
		}

		var host = gui.App.manifest.phpwebkit.host;
		if(host === undefined || host == "") {
			host = 'localhost';
		}

		var port = gui.App.manifest.phpwebkit.port;
		if(port === undefined || port == "") {
			port = 0;
		}

		var config = {
			"path": path,
			"bin": bin,
			"host": host,
			"port": port,
			"arguments": gui.App.argv,
			"manifest": gui.App.manifest
		}

		this.startServer(config);
	},

	startServer: function(config, callback){
		
		var http = require('http');
		var php = require('../lib/bridge');
		var express = require('express');
		var app = express();
		var host = config.host;
		var port = config.port;
		var pw = this;

		var server = http.createServer(app);

		app.use('/', php.cgi(config));

		server.listen(port, host, function(){
			pw.changeState('Starting application...', '#00CD00');
			window.location = 'http://'+host+':'+server.address().port +'/';
		}).on('error', function(err) {
			pw.changeState('<strong>Error: '+server.err+'</strong>', '#CD0000');
		});
	},

	changeState: function(msg, color){
		
		$('body').css('background-color', color);
		$('#loading p').html(msg);
	},

	fileExists: function(file, callback){
		
		var fs = require('fs');
		fs.stat(file, function(err, stats) { 
			if(!err && stats.isFile()) { 
				return true;
			} else {
				return false;
			}
		});
	}

};

phpwebkit.runApp();
