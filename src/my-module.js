const config = require('config');

module.exports = function myModule(options) {
  const defaults = {
    apple: 'default-apple',
    pear: 'default-pear',
  };

  config.util.extendDeep(defaults, options);
  config.util.setModuleDefaults('myModule', defaults);

  console.log('my config:', config);

  //
  // Accessing the config within this module via the config.get() method will
  // result in an error on the second instantiation of the module.
  //
  const apple = config.get('myModule.apple');
  console.log('apple (config.get()):', apple);

  const pear = config.get('myModule.pear');
  console.log('pear (config.get()):', pear);

  //
  // However, if this was only accessed by dot notation, no errors occur
  //
  // const apple = config.myModule.apple;
  // console.log('apple (dot notation):', apple);

  // const pear = config.myModule.pear;
  // console.log('pear (dot notation):', pear);

  return {
    apple,
    pear,
  }
}
