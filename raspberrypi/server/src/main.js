var Storage = require('./storage');
var WebServer = require('./webserver');
var CardReader = require('./cardreader');
var PrivateWebSocketServer = require('./privatewebsocketserver');

var callback = function(card){
  console.log(card);
  setTimeout(CardReader.readCard("/dev/cardreader",callback),1);
}

CardReader.readCard("/dev/cardreader",callback);

var storage = new Storage('localhost', 'fridgetron', 'FRIDGE:TRON', 'fridgetrondb');

storage.connect(function(){
  var wserver = new WebServer(80,storage);
});

var config = {
  username: "fridgetron",
  password: "FRIDGE:TRON",
  port: 8080
};
var privateWebSocketServer = new PrivateWebSocketServer(config, function(err,data){
  if(err){
    console.log(err);
  }
  else {
    var type = data["type"];
  
    if (type === "createIDForUser") {

    } else if(type === "purchase") {
	var user_id = data["user_id"];
    } else if (type === "deposit") {
	var user_id = data["user_id"];
    }
  }
})
