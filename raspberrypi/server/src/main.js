var ws = require('ws');
var Storage = require('./storage');
var WebServer = require('./webserver');
var CardReader = require('./cardreader');

var WebSocketServer = ws.Server;
var wss = new WebSocketServer({port: 8080});

var callback = function(card){
  console.log(card);
  setTimeout(CardReader.readCard("/dev/cardreader",callback),1);
}

CardReader.readCard("/dev/cardreader",callback);

var storage = new Storage('localhost', 'fridgetron', 'FRIDGE:TRON', 'fridgetrondb');

storage.connect(function(){
  var wserver = new WebServer(80,storage);
});

wss.on('connection', function(ws) {
    ws.on('message', function(message) {
        console.log('received: %s', message);
    });
    ws.send('something');
});
