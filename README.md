# Node Config with modules

This repo is to demo node-config and how errors occur when the module references the config by `config.get('myModule.apple')` rather than dot notation `config.myModule.apple`.

## Setup

`yarn install`

## Error when using `config.get('myModule.apple')`

If you run `yarn test` you will notice the following error:

```sh
› yarn test
yarn run v1.22.19
$ jest
  console.log
    my config: Config { myModule: { apple: 'test-apple', pear: 'test-pear' } }

      at log (src/my-module.js:12:11)

  console.log
    apple (config.get()): test-apple

      at log (src/my-module.js:19:11)

  console.log
    pear (config.get()): test-pear

      at log (src/my-module.js:22:11)

  console.log
    my config: Config { myModule: { apple: 'test-apple', pear: 'test-pear' } }

      at log (src/my-module.js:12:11)

 FAIL  src/my-module.test.js
  my-module
    ✕ should not fail when creating multiple instances (16 ms)

  ● my-module › should not fail when creating multiple instances

    TypeError: Cannot redefine property: myModule
        at Function.defineProperty (<anonymous>)

      16 |   // result in an error on the second instantiation of the module.
      17 |   //
    > 18 |   const apple = config.get('myModule.apple');
         |                        ^
      19 |   console.log('apple (config.get()):', apple);
      20 |
      21 |   const pear = config.get('myModule.pear');

      at Config.Object.<anonymous>.util.makeImmutable (node_modules/config/lib/config.js:423:14)
      at Config.Object.<anonymous>.Config.get (node_modules/config/lib/config.js:170:12)
      at get (src/my-module.js:18:24)
      at Object.myModule (src/my-module.test.js:19:21)
```

This seems to occur when a second instance of `myModule` is created, node-config tries to set the module defaults and then deeper within that module, it tries to get a value from the config with the `get` method. This issue does not occur with the dot notation.

-----

To confirm this, you can also call `node src/index.js` and the following error will occur:

```sh
› node src/index.js
my config: Config { myModule: { apple: 'default-apple', pear: 'default-pear' } }
apple (config.get()): default-apple
pear (config.get()): default-pear
my config: Config { myModule: { apple: 'default-apple', pear: 'default-pear' } }
/Users/example/config-module-example/node_modules/config/lib/config.js:423
      Object.defineProperty(object, propertyName, {
             ^

TypeError: Cannot redefine property: myModule
    at Function.defineProperty (<anonymous>)
    at Config.util.makeImmutable (/Users/example/config-module-example/node_modules/config/lib/config.js:423:14)
    at Config.get (/Users/example/config-module-example/node_modules/config/lib/config.js:170:12)
    at myModule (/Users/example/config-module-example/src/my-module.js:18:24)
    at Object.<anonymous> (/Users/example/config-module-example/src/index.js:7:1)
    at Module._compile (node:internal/modules/cjs/loader:1105:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1159:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
```

## Works fine with dot notation `config.myModule.apple`

However if I change the interals of the `myModule` to use dot notation when getting it's config everything works fine.

`yarn test` returns:

```sh
› yarn test
yarn run v1.22.19
$ jest
  console.log
    my config: Config { myModule: { apple: 'test-apple', pear: 'test-pear' } }

      at log (src/my-module.js:12:11)

  console.log
    apple (dot notation): test-apple

      at log (src/my-module.js:28:11)

  console.log
    pear (dot notation): test-pear

      at log (src/my-module.js:31:11)

  console.log
    my config: Config { myModule: { apple: 'test-apple', pear: 'test-pear' } }

      at log (src/my-module.js:12:11)

  console.log
    apple (dot notation): test-apple

      at log (src/my-module.js:28:11)

  console.log
    pear (dot notation): test-pear

      at log (src/my-module.js:31:11)

 PASS  src/my-module.test.js
  my-module
    ✓ should not fail 1 (11 ms)
    ✓ should not fail 2 (2 ms)
```

And `node src/index.js` returns:

```sh
› node src/index.js
my config: Config { myModule: { apple: 'default-apple', pear: 'default-pear' } }
apple (dot notation): default-apple
pear (dot notation): default-pear
my config: Config { myModule: { apple: 'default-apple', pear: 'default-pear' } }
apple (dot notation): default-apple
pear (dot notation): default-pear
```
