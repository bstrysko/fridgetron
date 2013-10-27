var ws = require('ws');
var WebSocketServer = ws.Server;

function PrivateWebSocketServer(configuration, callback){
  var port = configuration.port || 8080;
  var cUsername = configuration["username"] || "admin";
  var cPassword = configuration["password"] || "password1234";

  this.wss = new WebSocketServer({port: port});

  this.wss.on('connection', function(ws) {
    var headers = ws.upgradeReq.headers;
    var cookiesSA = headers["cookie"].split("; ");
    var cookies = {};  
  
    for(var cookieSi in cookiesSA){
      var cookieS = cookiesSA[cookieSi];
      var s = cookieS.split("=");
      cookies[s[0]] = s[1];
    }

    var username = cookies["username"];
    var password = cookies["password"];

    if((username !== cUsername) || (password !== cPassword)){
      ws.send(JSON.stringify({
	error: "Invalid username and/or password",
      }));
      ws.close();
    }

    ws.on('message', function(message) {
	try {	
	  message = JSON.parse(message);
	} catch(e) {
	  callback(e,null);
	  return;
	}

	var type = message['type'];
	
	if(typeof(type) != 'undefined') {
	  callback(null, type);
	} else {
	  callback(new Error("Invalid PrivateWebSocketServerMessage: " + message),null);
	}
    });
  });
}

PrivateWebSocketServer.prototype.send = function(message){
  for(var ws in this.wss.clients){
    ws.send(JSON.stringify(message));
  }
}

module.exports = PrivateWebSocketServer;
