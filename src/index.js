process.env.SUPPRESS_NO_CONFIG_WARNING = 'y';

const myModule = require('./my-module');
module.exports = { myModule };

myModule();

// Comment this second instantiation out and everything works fine
myModule();
