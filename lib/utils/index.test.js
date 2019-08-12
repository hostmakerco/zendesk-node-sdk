const {
  isObject,
  convertObjectArraysToCommaSeparatedList,
  assertRequired,
  convertKeysToSnakeCase,
  convertKeysToCamelCase,
} = require('./index');

describe(assertRequired.name, () => {
  test('should throw when an argument is not provided', () => {
    expect(() => {
      assertRequired({ thing: undefined });
    }).toThrow('thing is a required argument.');
  });

  test('should throw when any required argument is not provided', () => {
    expect(() => {
      assertRequired({ thing: true, otherThing: undefined, finalThing: 1 });
    }).toThrow('otherThing is a required argument.');
  });

  test('should not throw when all required arguments are defined', () => {
    expect(() => {
      assertRequired({ thing: true, otherThing: {}, finalThing: 1 });
    }).not.toThrow();
  });
});

describe(isObject.name, () => {
  test('returns true for object types', () => {
    expect(isObject({ a: 'a', b: 'b' })).toBe(true);
  });

  test('returns false for functions (an object primitive)', () => {
    function x() {
      return '';
    }

    expect(isObject(x)).toBe(false);
    expect(isObject(() => {})).toBe(false);
  });

  test('returns false for booleans', () => {
    expect(isObject(true)).toBe(false);
  });

  test('returns false for strings', () => {
    expect(isObject('xyz')).toBe(false);
  });

  test('returns false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  test('returns false for undefined', () => {
    expect(isObject(undefined)).toBe(false);
  });

  test('returns false for an array', () => {
    expect(isObject([])).toBe(false);
  });
});

describe(convertObjectArraysToCommaSeparatedList.name, () => {
  test('it transforms arrays into comma separated string', () => {
    const data = {
      v: ['a', 'b', 'c'], x: 'x', y: [1, 2, 3], z: 'zzzz',
    };

    expect(convertObjectArraysToCommaSeparatedList(data)).toEqual({
      v: 'a,b,c',
      x: 'x',
      y: '1,2,3',
      z: 'zzzz',
    });
  });

  test('it transforms nested arrays into comma separated lists', () => {
    const data = {
      child: {
        list: [1, 2, 3],
        grandchild: {
          list: [3, 2, 1],
          greatGrandchild: {
            list: [5, 6, 7],
          },
        },
      },
    };

    expect(convertObjectArraysToCommaSeparatedList(data)).toEqual({
      child: {
        list: '1,2,3',
        grandchild: {
          list: '3,2,1',
          greatGrandchild: {
            list: '5,6,7',
          },
        },
      },
    });
  });
});

describe(convertKeysToSnakeCase.name, () => {
  test('it converts all forms of keys to snake_case', () => {
    const data = {
      camelCase: 'c', PascalCase: 'p', snake_case: 's', CAPS_CASE: 'cc',
    };
    expect(convertKeysToSnakeCase(data)).toEqual({
      camel_case: 'c',
      pascal_case: 'p',
      snake_case: 's',
      caps_case: 'cc',
    });
  });

  test("it converts nested object's keys into snake_case", () => {
    const data = {
      child: {
        grandChild: {
          greatGrandChild: {},
        },
      },
    };
    expect(convertKeysToSnakeCase(data)).toEqual({
      child: {
        grand_child: {
          great_grand_child: {},
        },
      },
    });
  });
});

describe(convertKeysToCamelCase.name, () => {
  test('it converts all forms of keys to snake_case', () => {
    const data = {
      camelCase: 'c', PascalCase: 'p', snake_case: 's', CAPS_CASE: 'cc',
    };
    expect(convertKeysToCamelCase(data)).toEqual({
      camelCase: 'c',
      pascalCase: 'p',
      snakeCase: 's',
      capsCase: 'cc',
    });
  });

  test('it converts objects within a nested array to camelCase', () => {
    const data = { comments: [{ author_name: 'Tom', comment: 'some comment' }] };
    expect(convertKeysToCamelCase(data)).toEqual({
      comments: [{ authorName: 'Tom', comment: 'some comment' }],
    });
  });

  test("it converts nested object's keys into snake_case", () => {
    const data = {
      child: {
        grand_child: {
          great_grand_child: {},
        },
      },
    };
    expect(convertKeysToCamelCase(data)).toEqual({
      child: {
        grandChild: {
          greatGrandChild: {},
        },
      },
    });
  });
});
