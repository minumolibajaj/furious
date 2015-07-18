var furious = require('./index.js');
var assert = require('assert');

describe('.command()' , function(){
	it('should return undefined on 1 args', function(){
		var command = furious.command('test1');
		assert.equal(command,undefined);
	});
	it('should return undefined on 2 args', function(){
		var command = furious.command('test2');
		assert.equal(command,undefined);
	});
	it('should return an object on 3 args' , function(){
		var command = furious.command('test3' , 'description' , function(){});
		assert.notEqual(command , null);
		assert.notEqual(command , undefined );
	});
});

