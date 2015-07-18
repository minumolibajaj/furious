Meet __furious__ - [commander](https://www.npmjs.com/package/commander) inspired elegant solution for creating command line tools.

__furious__ is ultra lightweight and less than 100 lines of code. The API is dead simple and have been modified from commander to make few things simpler.

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
//start execution of the command.
furious.parse(process.argv);  
```

### .command(commandName , description , callback)
Create a command with this function.

Arguments are available as first parameter of callback.

```javascript
furious
  .command('upper' , 'print upper case values' , function(args){
    var firstArg = arg[0];
    console.log(firstArg.toUpperCase());
  });
```

### .option( optionNamesArray , description , callback)
Create options for already existing command.

Arguments are available as first parameter of callback.
```javascript
furious
  .command('upper' , 'print upper case values' , function(args){
    var firstArg = arg[0];
    console.log(firstArg.toUpperCase());
  })
  .option(['-h' ,'--help'] , 'Help for Upper' , function(args){
    console.log('You can provide help for this command here.');
  });
```
In this case ,both  ``programname upper -h`` and  ``programname upper --help`` invoke the same callback.

Caveats
=======
- if definition for a command is specified twice then , first definition will be considered and rest are rejected.
