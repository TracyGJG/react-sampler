import { primary } from './utils1';
import * as utils2 from './utils2';
// import * as mockUtils2 from "./__mocks__/utils2";
import * as utils3 from './utils3';
import * as mockUtils3 from './__mocks__/utils3';

describe('Utils One', () => {
  beforeAll(() => {
    console.clear();
    utils2.secondary = jest.fn(); // mockUtils2.secondary;
    utils3.tertiary = mockUtils3.tertiary;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('primary calls secondary', () => {
    expect(utils2.secondary).toHaveBeenCalledTimes(0);
    expect(utils3.tertiary).toHaveBeenCalledTimes(0);

    expect(primary).not.toThrow();

    expect(utils2.secondary).toHaveBeenCalledTimes(1);
    expect(utils3.tertiary).toHaveBeenCalledTimes(1);
  });
});
