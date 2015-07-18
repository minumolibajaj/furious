Meet __furious__ - [commander](https://www.npmjs.com/package/commander) inspired elegant solution for creating command line tools.

__furious__ is ultra __lightweight__ and __less than 100 lines of code__. The API is dead simple and have been modified from commander to make few things simpler.

Installation
============
```bash 
npm install furious --save
```

API
===
### furious
```javascript
var furious = require('furious');
//add commands and options here 
furious.execution(process.argv); //execute the user given command.  
```
> __NOTE__ : Don't forget to call furious.execute() at the end. It is responsible for executing the user command.

### .command(commandName , description , callback)
Create a command with this function.

Arguments are available as first parameter of callback.

```javascript
furious
  .command('upper' , 'print upper case values' , function(args){
    var firstArg = args[0];
    console.log(firstArg.toUpperCase());
  });
```

### .option( optionNamesArray , description , callback)
Create options for already existing command.

Arguments are available as first parameter of callback.
```javascript
furious
  .command('upper' , 'print upper case values' , function(args){
    var firstArg = args[0];
    console.log(firstArg.toUpperCase());
  })
  .option(['-h' ,'--help'] , 'Help for Upper' , function(args){
    console.log('You can provide help for this command here.');
  });
```
In this case ,both  ``programname upper -h`` and  ``programname upper --help`` invoke the same callback.

### .execute(process.argv)
This is where the user given command on the terminal is parsed and executed. It is usual to send ``process.argv`` as parameter here.

Caveats
=======
- if definition for a command is specified twice then , first definition will be considered and rest are rejected.
