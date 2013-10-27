var mysql = require('mysql');

function Storage(host, username, password, database){
  this.connection = mysql.createConnection({
    host: host,
    user: username,
    password: password,
    database: database,
  });

  this.ID_TABLE_NAME = "id";
  this.USER_TABLE_NAME = "user";
  this.TRANSACTION_TABLE_NAME = "transaction";
  this.ITEM_TABLE_NAME = "item";
  this.API_USER_TABLE_NAME = "api_user";
}

Storage.prototype.connect = function(callback){
  this.connection.connect(function(err){
    if(err){
      throw err;
    }

    callback();
  });
}

Storage.prototype.queryPlural = function(query, callback){
  this.connection.query(query, function(err, rows, fields){
    if(err){
      throw err;
    }

    callback(rows);
  }); 
}

Storage.prototype.querySingular = function(query, callback){
  this.queryPlural(query,function(rows){
    callback(rows[0]);
  });
}

Storage.prototype.getIDs = function(callback){
  var query = "";
  query += "SELECT * FROM " + this.ID_TABLE_NAME;

  this.queryPlural(query, callback);
}

Storage.prototype.getIDByField2 = function(field2, callback){
  var query = "";
  query += "SELECT * FROM " + this.ID_TABLE_NAME;
  query += " WHERE field2=" + field2;

  this.querySingular(query, callback);
}

Storage.prototype.getUsers = function(callback){
  var query = "";
  query += "SELECT * FROM " + this.USER_TABLE_NAME;

  this.queryPlural(query, callback);
}

Storage.prototype.getUserById = function(id, callback){
  var query = "";
  query += "SELECT * FROM " + this.USER_TABLE_NAME;
  query += " WHERE id=" + id;

  this.querySingular(query, callback);
}

Storage.prototype.getUserByUsername = function(username,callback){
  var query = "";
  query += "SELECT * FROM " + this.USER_TABLE_NAME;
  query += " WHERE username='"+username+"'";

  this.querySingular(query, callback);


Storage.prototype.getTransactions = function(callback){
  var query = "";
  query += "SELECT * FROM " + this.TRANSACTION_TABLE_NAME;

  this.queryPlural(query, callback);
}

Storage.prototype.getTransactionsByUserId = function(user_id,callback){
  var query = "";
  query += "SELECT * FROM " + this.TRANSACTION_TABLE_NAME;
  query += " WHERE user_id=" + user_id;

  this.queryPlural(query, callback);
}

Storage.prototype.getTransactionsByItemId = function(item_id,callback){
  var query = "";
  query += "SELECT * FROM " + this.TRANSACTION_TABLE_NAME;
  query += " WHERE item_id=" + item_id;

  this.queryPlural(query, callback);
}

Storage.prototype.getItems = function(callback){
  var query = "";
  query += "SELECT * FROM " + this.ITEM_TABLE_NAME;

  this.queryPlural(query, callback);
}

Storage.prototype.getItemById = function(id, callback){
  var query = "";
  query += "SELECT * FROM " + this.ITEM_TABLE_NAME;
  query += " WHERE id=" + id;

  this.querySingular(query, callback);
}

Storage.prototype.getAPIUserByUsernameAndPasswordHash = function(username,password_hash,callback){
  var query = "";
  query += "SELECT * FROM " + this.API_USER_TABLE_NAME;
  query += " WHERE username=" + username + " AND";
  query += " password_hash=" + password_hash;

  this.querySingular(query, callback);
}


/*
 * Write Methods
 */

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
