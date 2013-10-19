var mysql = require('mysql');

function Storage(host, username, password, database){
  this.connection = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database,
  });
}

Storage.prototype.connect = function(callback){
  this.connection.connect(function(err){
    if(err){
      throw err;
    }

    callback();
  });
}

Storage.prototype.getIDs = function(callback){
  
}

Storage.prototype.getUsers = function(callback){
  var query = "";
  query += "SELECT * FROM user";

  this.connection.query(query, function(err, rows, fields){
    if(err){
      throw err;
    }

    callback(rows);
  }); 
}

Storage.prototype.getUserByID = function(field2,callback){
  var query = "";
  query += "SELECT * FROM user WHERE ";
  query += "id_id=(SELECT DISTINCT(id) FROM id WHERE ";
  query += "field2="+field2+")";

  this.connection.query(query, function(err, rows, fields){
    if(err){
      throw err;
    }

    console.log(rows);
    //callback(rows[0]);
  }); 
}

Storage.prototype.getUserByUsername = function(username,callback){
  var query = "";
  query += "SELECT * FROM user WHERE ";
  query += "username='"+username+"'";

  this.connection.query(query, function(err, rows, fields){
    if(err){
      throw err;
    }

    callback(rows[0]);
  }); 
}


Storage.prototype.getTransactions = function(callback){
  var query = "";
  query += "SELECT * FROM transaction";

  this.connection.query(query, function(err, rows, fields){
    if(err){
      throw err;
    }

    callback(rows);
  }); 
}

Storage.prototype.getTransactionsByUser = function(user_id,callback){
  var query = "";
  query += "SELECT * FROM transaction ";
  query += "WHERE user_id=" + user_id;

  this.connection.query(query, function(err, rows, fields){
    if(err){
      throw err;
    }

    callback(rows);
  }); 
}

Storage.prototype.getTransactionsByItem = function(item_id,callback){
  var query = "";
  query += "SELECT * FROM transaction ";
  query += "WHERE item_id=" + item_id;

  this.connection.query(query, function(err, rows, fields){
    if(err){
      throw err;
    }

    callback(rows);
  }); 
}

Storage.prototype.getItems = function(callback){
  var query = "";
  query += "SELECT * FROM item";

  this.connection.query(query, function(err, rows, fields){
    if(err){
      throw err;
    }

    callback(rows);
  }); 
}

Storage.prototype.getItem = function(id, callback){
  var query = "";
  query += "SELECT * FROM item ";
  query += "WHERE id=" + id;

  this.connection.query(query, function(err, rows, fields){
    if(err){
      throw err;
    }

    callback(rows[0]);
  }); 
}

Storage.prototype.createUser = function(field1, field2, date_issued, username){

}

Storage.prototype.createID = function(field1, field2, date_issued, callback){
  var query = "";
  query += "INSERT INTO id ";
  query += "(field1, field2, date_issued) ";
  query += "VALUES ";
  query += "("+field1+","+field2+",'"+date_issued+"')";

  this.connection.query(query, function(err, result){
    if(err){
      throw err;
    }

    callback(result.insertId);
  }); 
 
}

module.exports = Storage;
