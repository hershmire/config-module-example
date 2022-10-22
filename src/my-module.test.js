// import { myModule } from './my-module.js';
const myModule = require('./my-module')

describe('my-module', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    jest.restoreAllMocks();
  });

  it('should not fail 1', () => {
    const module = myModule();
    expect(module).toStrictEqual({
      apple: 'test-apple',
      pear: 'test-pear',
    });
  });

  it('should not fail 2', async () => {
    const module = myModule();
    expect(module).toStrictEqual({
      apple: 'test-apple',
      pear: 'test-pear',
    });
  });
});
