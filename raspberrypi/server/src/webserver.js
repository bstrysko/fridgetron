var express = require("express");

function WebServer(port, storage){
  var app = express();

  app.get('/', function(req, res){
    res.send('Welcome to Fridgetron');
  });

  app.get('/api', function(req, res){
    var r = "";
    r += "<h1>Fridgetron API</h1><br/>";
    r += "/api/ids<br/>"
    r += "/api/users<br/>";
    r += "/api/users/byUsername/:username<br/>";
    r += "/api/transactions<br/>";
    r += "/api/transactions/byUser/:id<br/>";
    r += "/api/transactions/byItem/:id<br/>";
    r += "/api/items<br/>";
    r += "/api/items/:id<br/>";
    res.send(r);
  });

  app.get('/api/users', function(req, res){
    storage.getUsers(function(users){
      res.send(users);
    });
  });
  
  app.get('/api/users/byUsername/:username', function(req, res){
    storage.getUserByUsername(req.params.username,function(user){
      if(typeof(user) == 'object') {
	res.send(user);
      } else {
	res.send(JSON.stringify({
	}));
      }
    });
  });

  app.get('/api/transactions', function(req, res){
    storage.getTransactions(function(transactions){
      res.send(transactions);
    });
  });

  app.get('/api/transactions/byUser/:id', function(req, res){
    storage.getTransactionsByUser(req.params.id,function(transactions){
      res.send(transactions);
    });
  });

  app.get('/api/transactions/byItem/:id', function(req, res){
    storage.getTransactionsByItem(req.params.id,function(transactions){
      res.send(transactions);
    });
  });

  app.get('/api/items', function(req, res){
    storage.getItems(function(items){
      res.send(items);
    });
  });
 
 app.get('/api/items/:id', function(req, res){
    storage.getItem(req.params.id,function(item){
      if(typeof(item) == 'object') {
	res.send(item);
      } else {
	res.send(JSON.stringify({
	}));
      }
    });
  });


  app.listen(port);
}

module.exports = WebServer;
