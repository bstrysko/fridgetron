var fs = require('fs');

var CardReader = {};

/*
 * Converts magnetic stripe data into human
 * readable form.
 * @param data Expects 
 * %%d=0044?
 * ;%d=%d?
 *
 * where the sscanf(fmt,field2,field1,dateIssued)
 */
function parseResults(data){
  var chunks = data.split("=");

  var field2 = chunks[0].substring(1);

  var semiIndex = chunks[1].indexOf(";"); 
  var field1 = chunks[1].substring(semiIndex+1);

  var qIndex = chunks[2].indexOf("?");
  var dateIssued = chunks[2].substring(0,qIndex); 

  var result = {
    field1: parseInt(field1),
    field2: parseInt(field2),
    dateIssued: parseInt(dateIssued),
  };

  return result;
}

/**
 * Whenever filename has new data, parse it and if
 * in correct format, call callback with resulting 
 * card information object. 
 *
 * @param filename fifo that card reader data is piped to.
 * Because card reader places a newline in the data must
 * read the fifo twice.
 * @param callback called with card data if every time
 * the fifo is filled the data it is valid.  If the data
 * cannot be parsed callback will not be called and the
 * bad data will be discarded.
 */
CardReader.readCard = function(filename, callback){
    fs.readFile(filename, function(err1,data1){
      if(err1){
	throw err1;
      } else {
	fs.readFile(filename, function(err2, data2){
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

module.exports = CardReader;
