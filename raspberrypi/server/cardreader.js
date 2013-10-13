var fs = require('fs');

var CardReader = {
  dev : "/dev/cardreader",
};

function parseResults(data){
  var chunks = data.split("=");

  var field2 = chunks[0].substring(1);

  var semiIndex = chunks[1].indexOf(";"); 
  var field1 = chunks[1].substring(semiIndex+1);

  var qIndex = chunks[2].indexOf("?");
  var issued = chunks[2].substring(0,qIndex); 

  var result = {
    field1: field1,
    field2: field2,
    issued: issued,
  };

  return result;
}

CardReader.readCard = function(callback){
  fs.readFile(CardReader.dev, function(err1,data1){
    if(err1){
      throw err1;
    } else {
      fs.readFile(CardReader.dev, function(err2, data2){
	if(err2){
	  throw err2;
	} else {
	  var parsedResults = parseResults(data1+data2);
	  callback(parsedResults);
	}
      });
    }
  });
}

CardReader.readCard(function(data){
  console.log(data);
});
