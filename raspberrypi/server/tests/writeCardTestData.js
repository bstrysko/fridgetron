var child_process = require('child_process');
var linereader = require('line-reader');

var usage = process.argv[1] + " <cardDataFilename> <cardFIFO>";

var testDataFilename = process.argv[2];
var fifoFilename = process.argv[3];

if((typeof(testDataFilename) == 'undefined') || (typeof(fifoFilename) == 'undefined')){ 
  throw new Error(usage);
}

linereader.eachLine(testDataFilename, function(line, last){
  var cmd = ""; 
  cmd += "echo '";
  cmd += line;
  cmd += "' > ";
  cmd += fifoFilename;
 
  child_process.exec(cmd, function(error,stdout,stderr){
    if(error){
      throw error;
    }
  })
});
