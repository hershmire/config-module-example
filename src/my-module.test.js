const myModule = require('./my-module')

describe('my-module', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
  });

  it('should not fail when creating multiple instances', () => {
    const module1 = myModule();
    expect(module1).toStrictEqual({
      apple: 'test-apple',
      pear: 'test-pear',
    });

    const module2 = myModule();
    expect(module2).toStrictEqual({
      apple: 'test-apple',
      pear: 'test-pear',
    });
  });
});
