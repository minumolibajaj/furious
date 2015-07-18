#!/usr/bin/env node
var commandList = [];
exports.parse = function(argv){
	//remove node command and filename
	argv.shift();argv.shift();
	//remove command and arg
	var isOption = function(item){ 
		var first = item.substr(0,2);
		return first[0] == '-' || first == '--';
	};
	var currentCommandAndArgs = argv.filter(function(item){ return !isOption(item); });
	var currentCommandName = currentCommandAndArgs.shift();
	var currentOptions = argv.filter(isOption);
	var currentCommand = getCommandByCommandName(currentCommandName);
	if(currentOptions.length == 0)
		currentCommand.operation.call(this , currentCommandAndArgs );
	else{
		var result = currentCommand.options.filter(function(option){
			return isArrayInArray(currentOptions , option.optionNames);
		});
		//will execute all the option functions with matcing option names. 
		result.forEach(function(option){
			option.operation.call(this , currentCommand.args );
		});	
	}
};
var isNotValidFunction = function(myfunc){ return !myfunc || typeof myfunc != 'function'; };
var isElementInArray = function(element , array){ return array.indexOf(element) > -1;};
var isArrayInArray = function(givenArray , refArray ){ return givenArray.some(function(value){ return isElementInArray(value , refArray); })};
//command
exports.command = function(name , description ,  defaultOperation){
	if( isNotValidFunction(defaultOperation) ) return;
	var registeredCommand =  new Command(name , description , defaultOperation); 
	commandList.push(registeredCommand);
	var getIndexOfCommandInList = function(command){
		return (function () {
			for (var i = 0; i < commandList.length; i++) return commandList[i].command == this.command ? i : new Error('Command not found.');
		}).call(command);	
	};
	var index = getIndexOfCommandInList(registeredCommand);
	commandList[index].index = index; 
	return registeredCommand;
};
var Command = function(command , description ,  operation ) { 
	this.command = command ; this.index = -1 ; this.operation = operation ; this.description = description ;
	this.args  = [] , this.options = [] ; 
	this.option = function(optionsArray , description , optionOperation ){
			if(isNotValidFunction(optionOperation)) return;
			commandList[this.index].options.push(new Option(optionsArray , description , optionOperation));
			return this;
	};
};
var getCommandByCommandName = function(name){
	//if operation for a command is specified twice then , first definition will be considered and rest are rejected. 
	return commandList.filter(function(cmd){ return cmd.command == name; })[0];
}
//Option
var Option = function( optionNames , description ,   operation ){
	this.optionNames = optionNames;
	this.description = description; 
	this.operation = operation;
}