var furious = require('./index.js');

var result = furious
	.command('test' , function(args){
		console.log('this command prints the arguments other than command and options' + args);
	})
	.option(['-a' , '--a'] , function(){
		console.log('a option is executing');
	})
	.option(['-b' , '--b'], function(){
		console.log('b option is executing');
	});
	
console.log(JSON.stringify(result));
furious.parse(process.argv);