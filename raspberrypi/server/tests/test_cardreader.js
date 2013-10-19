var assert = require('assert');
var exec = require('child_process').exec;
var CardReader = require('../src/cardreader.js');
var child_process = require('child_process');

var testDataFilename = "data/testCardData";
var fifoFilename = "cardreader";

describe('CardReader', function(){
  beforeEach(function(done){
    exec("mkfifo cardreader", function(error, stdout, stderr){
      if(error){
	throw error;
      }

      var args = [testDataFilename, fifoFilename];
      child_process.fork('writeCardTestData.js', args);

      done();	
    });
  });

  afterEach(function(done){
    exec("rm cardreader", function(error, stdout, stderr){
      if(error){
	throw error;
      }

      done();
    });
  });

  describe('#readCard(filename,callback)', function(){
    it('should return a json object with fields field1, field2, and dateIssued', function(done){
      CardReader.readCard(fifoFilename,function(card){
	assert.equal('number',typeof(card.field1));
	assert.notEqual('NaN',card.field1);
	assert.equal('number',typeof(card.field2));
	assert.notEqual('NaN',card.field2);
	assert.equal('number',typeof(card.dateIssued));
	assert.notEqual('NaN',card.dateIssued);

	done();
      })
    })
  })
})
