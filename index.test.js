const {
  getCurrentJSONkeys,
  checkVariableType,
  renameKeyForFlattenedValue,
  flatten,
  matchArrayIndexRegexPattern,
  assignOrAddValueToObject,
  flatIndexOfArray,
  flatDifferentType
} = require('./index');

const firstCaseNestedJSON = {
  cars: [
    {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      features: {
        interior: ['leather seats', 'touchscreen infotainment'],
        exterior: {
          color: 'blue',
          wheels: 'alloy',
          lights: ['LED headlights', 'fog lights']
        }
      },
      engine: {
        type: 'V6',
        horsepower: 301,
        fuel: 'gasoline'
      },
      owners: [
        {
          name: 'Alice',
          age: 35,
          address: {
            street: '123 Main St',
            city: 'Carville',
            zip: '98765'
          }
        },
        {
          name: 'Bob',
          age: 42,
          address: {
            street: '456 Elm Ave',
            city: 'Auto City',
            zip: '54321'
          }
        }
      ]
    },
    {
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      features: {
        interior: ['premium sound system', 'autopilot'],
        exterior: {
          color: 'white',
          wheels: 'aero',
          lights: ['LED headlights', 'taillights']
        }
      },
      engine: {
        type: 'electric',
        horsepower: 450,
        fuel: 'electricity'
      },
      owners: [
        {
          name: 'Charlie',
          age: 28,
          address: {
            street: '789 Electric Dr',
            city: 'Eco Town',
            zip: '12345'
          }
        }
      ]
    }
  ]
};

const flattenedFirstCaseJSON = {
  "cars[0].make": "Toyota",
  "cars[0].model": "Camry",
  "cars[0].year": 2022,
  "cars[0].features.interior[0]": "leather seats",
  "cars[0].features.interior[1]": "touchscreen infotainment",
  "cars[0].features.exterior.color": "blue",
  "cars[0].features.exterior.wheels": "alloy",
  "cars[0].features.exterior.lights[0]": "LED headlights",
  "cars[0].features.exterior.lights[1]": "fog lights",
  "cars[0].engine.type": "V6",
  "cars[0].engine.horsepower": 301,
  "cars[0].engine.fuel": "gasoline",
  "cars[0].owners[0].name": "Alice",
  "cars[0].owners[0].age": 35,
  "cars[0].owners[0].address.street": "123 Main St",
  "cars[0].owners[0].address.city": "Carville",
  "cars[0].owners[0].address.zip": "98765",
  "cars[0].owners[1].name": "Bob",
  "cars[0].owners[1].age": 42,
  "cars[0].owners[1].address.street": "456 Elm Ave",
  "cars[0].owners[1].address.city": "Auto City",
  "cars[0].owners[1].address.zip": "54321",
  "cars[1].make": "Tesla",
  "cars[1].model": "Model 3",
  "cars[1].year": 2023,
  "cars[1].features.interior[0]": "premium sound system",
  "cars[1].features.interior[1]": "autopilot",
  "cars[1].features.exterior.color": "white",
  "cars[1].features.exterior.wheels": "aero",
  "cars[1].features.exterior.lights[0]": "LED headlights",
  "cars[1].features.exterior.lights[1]": "taillights",
  "cars[1].engine.type": "electric",
  "cars[1].engine.horsepower": 450,
  "cars[1].engine.fuel": "electricity",
  "cars[1].owners[0].name": "Charlie",
  "cars[1].owners[0].age": 28,
  "cars[1].owners[0].address.street": "789 Electric Dr",
  "cars[1].owners[0].address.city": "Eco Town",
  "cars[1].owners[0].address.zip": "12345"
};

const flattenedFirstCaseJSONLineSeparator = {
  "cars[0]-make": "Toyota",
  "cars[0]-model": "Camry",
  "cars[0]-year": 2022,
  "cars[0]-features-interior[0]": "leather seats",
  "cars[0]-features-interior[1]": "touchscreen infotainment",
  "cars[0]-features-exterior-color": "blue",
  "cars[0]-features-exterior-wheels": "alloy",
  "cars[0]-features-exterior-lights[0]": "LED headlights",
  "cars[0]-features-exterior-lights[1]": "fog lights",
  "cars[0]-engine-type": "V6",
  "cars[0]-engine-horsepower": 301,
  "cars[0]-engine-fuel": "gasoline",
  "cars[0]-owners[0]-name": "Alice",
  "cars[0]-owners[0]-age": 35,
  "cars[0]-owners[0]-address-street": "123 Main St",
  "cars[0]-owners[0]-address-city": "Carville",
  "cars[0]-owners[0]-address-zip": "98765",
  "cars[0]-owners[1]-name": "Bob",
  "cars[0]-owners[1]-age": 42,
  "cars[0]-owners[1]-address-street": "456 Elm Ave",
  "cars[0]-owners[1]-address-city": "Auto City",
  "cars[0]-owners[1]-address-zip": "54321",
  "cars[1]-make": "Tesla",
  "cars[1]-model": "Model 3",
  "cars[1]-year": 2023,
  "cars[1]-features-interior[0]": "premium sound system",
  "cars[1]-features-interior[1]": "autopilot",
  "cars[1]-features-exterior-color": "white",
  "cars[1]-features-exterior-wheels": "aero",
  "cars[1]-features-exterior-lights[0]": "LED headlights",
  "cars[1]-features-exterior-lights[1]": "taillights",
  "cars[1]-engine-type": "electric",
  "cars[1]-engine-horsepower": 450,
  "cars[1]-engine-fuel": "electricity",
  "cars[1]-owners[0]-name": "Charlie",
  "cars[1]-owners[0]-age": 28,
  "cars[1]-owners[0]-address-street": "789 Electric Dr",
  "cars[1]-owners[0]-address-city": "Eco Town",
  "cars[1]-owners[0]-address-zip": "12345"
};

const flattenedFirstCaseJSONSpaceSeparator = {
  "cars[0]make": "Toyota",
  "cars[0]model": "Camry",
  "cars[0]year": 2022,
  "cars[0]featuresinterior[0]": "leather seats",
  "cars[0]featuresinterior[1]": "touchscreen infotainment",
  "cars[0]featuresexteriorcolor": "blue",
  "cars[0]featuresexteriorwheels": "alloy",
  "cars[0]featuresexteriorlights[0]": "LED headlights",
  "cars[0]featuresexteriorlights[1]": "fog lights",
  "cars[0]enginetype": "V6",
  "cars[0]enginehorsepower": 301,
  "cars[0]enginefuel": "gasoline",
  "cars[0]owners[0]name": "Alice",
  "cars[0]owners[0]age": 35,
  "cars[0]owners[0]addressstreet": "123 Main St",
  "cars[0]owners[0]addresscity": "Carville",
  "cars[0]owners[0]addresszip": "98765",
  "cars[0]owners[1]name": "Bob",
  "cars[0]owners[1]age": 42,
  "cars[0]owners[1]addressstreet": "456 Elm Ave",
  "cars[0]owners[1]addresscity": "Auto City",
  "cars[0]owners[1]addresszip": "54321",
  "cars[1]make": "Tesla",
  "cars[1]model": "Model 3",
  "cars[1]year": 2023,
  "cars[1]featuresinterior[0]": "premium sound system",
  "cars[1]featuresinterior[1]": "autopilot",
  "cars[1]featuresexteriorcolor": "white",
  "cars[1]featuresexteriorwheels": "aero",
  "cars[1]featuresexteriorlights[0]": "LED headlights",
  "cars[1]featuresexteriorlights[1]": "taillights",
  "cars[1]enginetype": "electric",
  "cars[1]enginehorsepower": 450,
  "cars[1]enginefuel": "electricity",
  "cars[1]owners[0]name": "Charlie",
  "cars[1]owners[0]age": 28,
  "cars[1]owners[0]addressstreet": "789 Electric Dr",
  "cars[1]owners[0]addresscity": "Eco Town",
  "cars[1]owners[0]addresszip": "12345"
};

const secondCaseNestedJSON = {
  make: 'Toyota',
  model: 'Camry',
  year: 2022,
  features: {
    interior: ['leather seats', 'touchscreen infotainment'],
    exterior: {
      color: 'blue',
      wheels: 'alloy',
      lights: ['LED headlights', 'fog lights']
    }
  },
  engine: {
    type: 'V6',
    horsepower: 301,
    fuel: 'gasoline'
  },
  owners: [
    {
      name: 'Alice',
      age: 35,
      address: {
        street: '123 Main St',
        city: 'Carville',
        zip: '98765'
      }
    },
    {
      name: 'Bob',
      age: 42,
      address: {
        street: '456 Elm Ave',
        city: 'Auto City',
        zip: '54321'
      }
    }
  ]
};

const flattenedSecondCaseJSON = {
  "make": "Toyota",
  "model": "Camry",
  "year": 2022,
  "features.interior[0]": "leather seats",
  "features.interior[1]": "touchscreen infotainment",
  "features.exterior.color": "blue",
  "features.exterior.wheels": "alloy",
  "features.exterior.lights[0]": "LED headlights",
  "features.exterior.lights[1]": "fog lights",
  "engine.type": "V6",
  "engine.horsepower": 301,
  "engine.fuel": "gasoline",
  "owners[0].name": "Alice",
  "owners[0].age": 35,
  "owners[0].address.street": "123 Main St",
  "owners[0].address.city": "Carville",
  "owners[0].address.zip": "98765",
  "owners[1].name": "Bob",
  "owners[1].age": 42,
  "owners[1].address.street": "456 Elm Ave",
  "owners[1].address.city": "Auto City",
  "owners[1].address.zip": "54321"
};

const thirdCaseNestedJSON = {
  company: {
    name: 'Test company',
    code: 'XX101023124',
    seniorLeaderShip: {
      ceo: 'John',
      cto: 'Camille',
      cfo: 'Rick',
      clo: 'Andy',
      vpe: 'Eric',
      vp: 'Kim'
    },
    employees: ['John', 'Smith', 'Sahr', 'Otto', 'James', 'Johnny', 'Jane'],
    sites: [
      {
        name: 'Lahti site',
        city: 'Lahti',
        code: '001'
      },
      {
        name: 'Helsinki site',
        city: 'Helsinki',
        code: '002'
      },
      {
        name: 'Stockholm site',
        city: 'Stockholm',
        code: '003'
      }
    ]
  },
  cars: [
    {
      make: 'Toyota',
      model: 'Camry',
      year: 2022,
      features: {
        interior: ['leather seats', 'touchscreen infotainment'],
        exterior: {
          color: 'blue',
          wheels: 'alloy',
          lights: ['LED headlights', 'fog lights']
        }
      },
      engine: {
        type: 'V6',
        horsepower: 301,
        fuel: 'gasoline'
      },
      owners: [
        {
          name: 'Alice',
          age: 35,
          address: {
            street: '123 Main St',
            city: 'Carville',
            zip: '98765'
          }
        },
        {
          name: 'Bob',
          age: 42,
          address: {
            street: '456 Elm Ave',
            city: 'Auto City',
            zip: '54321'
          }
        }
      ]
    },
    {
      make: 'Tesla',
      model: 'Model 3',
      year: 2023,
      'features': {
        'interior': ['premium sound system', 'autopilot'],
        'exterior': {
          'color': 'white',
          'wheels': 'aero',
          'lights': ['LED headlights', 'taillights']
        }
      },
      'engine': {
        'type': 'electric',
        'horsepower': 450,
        'fuel': 'electricity'
      },
      'owners': [
        {
          'name': 'Charlie',
          'age': 28,
          'address': {
            'street': '789 Electric Dr',
            'city': 'Eco Town',
            'zip': '12345'
          }
        }
      ]
    }
  ]
};

const flattenedThirdCaseJSON = {
  "company.name": "Test company",
  "company.code": "XX101023124",
  "company.seniorLeaderShip.ceo": "John",
  "company.seniorLeaderShip.cto": "Camille",
  "company.seniorLeaderShip.cfo": "Rick",
  "company.seniorLeaderShip.clo": "Andy",
  "company.seniorLeaderShip.vpe": "Eric",
  "company.seniorLeaderShip.vp": "Kim",
  "company.employees[0]": "John",
  "company.employees[1]": "Smith",
  "company.employees[2]": "Sahr",
  "company.employees[3]": "Otto",
  "company.employees[4]": "James",
  "company.employees[5]": "Johnny",
  "company.employees[6]": "Jane",
  "company.sites[0].name": "Lahti site",
  "company.sites[0].city": "Lahti",
  "company.sites[0].code": "001",
  "company.sites[1].name": "Helsinki site",
  "company.sites[1].city": "Helsinki",
  "company.sites[1].code": "002",
  "company.sites[2].name": "Stockholm site",
  "company.sites[2].city": "Stockholm",
  "company.sites[2].code": "003",
  "cars[0].make": "Toyota",
  "cars[0].model": "Camry",
  "cars[0].year": 2022,
  "cars[0].features.interior[0]": "leather seats",
  "cars[0].features.interior[1]": "touchscreen infotainment",
  "cars[0].features.exterior.color": "blue",
  "cars[0].features.exterior.wheels": "alloy",
  "cars[0].features.exterior.lights[0]": "LED headlights",
  "cars[0].features.exterior.lights[1]": "fog lights",
  "cars[0].engine.type": "V6",
  "cars[0].engine.horsepower": 301,
  "cars[0].engine.fuel": "gasoline",
  "cars[0].owners[0].name": "Alice",
  "cars[0].owners[0].age": 35,
  "cars[0].owners[0].address.street": "123 Main St",
  "cars[0].owners[0].address.city": "Carville",
  "cars[0].owners[0].address.zip": "98765",
  "cars[0].owners[1].name": "Bob",
  "cars[0].owners[1].age": 42,
  "cars[0].owners[1].address.street": "456 Elm Ave",
  "cars[0].owners[1].address.city": "Auto City",
  "cars[0].owners[1].address.zip": "54321",
  "cars[1].make": "Tesla",
  "cars[1].model": "Model 3",
  "cars[1].year": 2023,
  "cars[1].features.interior[0]": "premium sound system",
  "cars[1].features.interior[1]": "autopilot",
  "cars[1].features.exterior.color": "white",
  "cars[1].features.exterior.wheels": "aero",
  "cars[1].features.exterior.lights[0]": "LED headlights",
  "cars[1].features.exterior.lights[1]": "taillights",
  "cars[1].engine.type": "electric",
  "cars[1].engine.horsepower": 450,
  "cars[1].engine.fuel": "electricity",
  "cars[1].owners[0].name": "Charlie",
  "cars[1].owners[0].age": 28,
  "cars[1].owners[0].address.street": "789 Electric Dr",
  "cars[1].owners[0].address.city": "Eco Town",
  "cars[1].owners[0].address.zip": "12345"
};

/*
Tests for checking that right keys are returned in array in current JSON level
*/

test('check that right keys are returned at current json level', () => {
  const object = {
    testKey: '123',
    array: [1, 2, 3],
    number: 1,
    string: 'string'
  };
  const result = getCurrentJSONkeys(object);
  expect(result).toStrictEqual(['testKey', 'array', 'number', 'string']);
});

test('check that right keys are returned at current json level case 1', () => {
  const object = firstCaseNestedJSON;
  const result = getCurrentJSONkeys(object);
  expect(result).toStrictEqual(['cars']);
});

test('check that right keys are returned at current json level case 2', () => {
  const object = secondCaseNestedJSON;
  const result = getCurrentJSONkeys(object);
  expect(result).toStrictEqual(['make', 'model', 'year', 'features', 'engine', 'owners']);
});

test('check that right keys are returned at current json level case 3', () => {
  const object = thirdCaseNestedJSON;
  const result = getCurrentJSONkeys(object);
  expect(result).toStrictEqual(['company', 'cars']);
});

test('check that null is returned at current json level with string', () => {
  const notAnObject = 'string';
  const result = getCurrentJSONkeys(notAnObject);
  expect(result).toStrictEqual(null);
});

test('check that null is returned at current json level with number', () => {
  const notAnObject = 1;
  const result = getCurrentJSONkeys(notAnObject);
  expect(result).toStrictEqual(null);
});

test('check that null is returned at current json level with array', () => {
  const notAnObject = [1, 2, 3];
  const result = getCurrentJSONkeys(notAnObject);
  expect(result).toStrictEqual(null);
});

test('check that null is returned at current json level with undefined', () => {
  const notAnObject = undefined;
  const result = getCurrentJSONkeys(notAnObject);
  expect(result).toStrictEqual(null);
});

test('check that null is returned at current json level with null', () => {
  const notAnObject = null;
  const result = getCurrentJSONkeys(notAnObject);
  expect(result).toStrictEqual(null);
});

test('check that null is returned at current json level with 0', () => {
  const notAnObject = 0;
  const result = getCurrentJSONkeys(notAnObject);
  expect(result).toStrictEqual(null);
});

/*
Tests for typeof value
*/

test('check that typeof works for simple array', () => {
  const value = [1, 2, 3];
  const result = checkVariableType(value);
  expect(result).toBe('array');
});

test('check that typeof works for complex array', () => {
  const value = firstCaseNestedJSON.cars;
  const result = checkVariableType(value);
  expect(result).toBe('array');
});

test('check that typeof works for simple json', () => {
  const value = { testKey: 123 };
  const result = checkVariableType(value);
  expect(result).toBe('object');
});

test('check that typeof works for complex json case 1', () => {
  const value = firstCaseNestedJSON;
  const result = checkVariableType(value);
  expect(result).toBe('object');
});

test('check that typeof works for complex json case 2', () => {
  const value = secondCaseNestedJSON;
  const result = checkVariableType(value);
  expect(result).toBe('object');
});

test('check that typeof works for complex json case 3', () => {
  const value = thirdCaseNestedJSON;
  const result = checkVariableType(value);
  expect(result).toBe('object');
});

test('check that typeof does not return json or array for other values', () => {
  const value = 1;
  const result = checkVariableType(value);
  expect(result).toBe('number');
});

test('check that typeof does not return json or array for other values', () => {
  const value = 'string';
  const result = checkVariableType(value);
  expect(result).toBe('string');
});

test('check that typeof does not return json or array for other values', () => {
  const value = '98765';
  const result = checkVariableType(value);
  expect(result).toBe('string');
});

/*
Tests for new flattened key
*/

test('new key for flattened object case 1', () => {
  parentKey = 'parentKey';
  currentKey = 'currentKey';
  const result = renameKeyForFlattenedValue(parentKey, currentKey, '.');
  expect(result).toBe('parentKey.currentKey');
});

test('new key for flattened object case 2', () => {
  parentKey = 'parentKey';
  currentKey = '[0]';
  const result = renameKeyForFlattenedValue(parentKey, currentKey, '.');
  expect(result).toBe('parentKey[0]');
});

test('new key for flattened object case - as separator', () => {
  parentKey = 'parentKey';
  currentKey = '[0]';
  const result = renameKeyForFlattenedValue(parentKey, currentKey, '-');
  expect(result).toBe('parentKey[0]');
});

test('new key for flattened object case space as separator', () => {
  parentKey = 'parentKey';
  currentKey = '[0]';
  const result = renameKeyForFlattenedValue(parentKey, currentKey, ' ');
  expect(result).toBe('parentKey[0]');
});

/*
Tests for array index regex pattern
*/

test('get regex pattern for array index', () => {
  const result = matchArrayIndexRegexPattern();
  expect(result).toStrictEqual(/^\[\d+\]$/);
});

/*
Tests for assigned in object or with new key with object index
*/

test('assign object to original object', () => {
  const object = {
    testKey: '123',
    array: [1, 2, 3]
  };
  const value = {
    number: 1,
    string: 'string'
  };
  const objectShouldBe = {
    testKey: '123',
    array: [1, 2, 3],
    number: 1,
    string: 'string'
  };
  const typeofValue = 'object';
  const result = assignOrAddValueToObject(value, typeofValue, object, null);
  expect(result).toStrictEqual(objectShouldBe);
});

test('add number to original object', () => {
  const object = {
    testKey: '123',
    array: [1, 2, 3]
  };
  const value = 1;
  const objectShouldBe = {
    testKey: '123',
    array: [1, 2, 3],
    number: 1
  };
  const typeofValue = 'number';
  const result = assignOrAddValueToObject(value, typeofValue, object, 'number');
  expect(result).toStrictEqual(objectShouldBe);
});

test('add string to original object', () => {
  const object = {
    testKey: '123',
    array: [1, 2, 3]
  };
  const value = 'string';
  const objectShouldBe = {
    testKey: '123',
    array: [1, 2, 3],
    string: 'string'
  };
  const typeofValue = 'string';
  const result = assignOrAddValueToObject(value, typeofValue, object, 'string');
  expect(result).toStrictEqual(objectShouldBe);
});

test('add array to original object', () => {
  const object = {
    testKey: '123'
  };
  const value = [1, 2, 3];
  const objectShouldBe = {
    testKey: '123',
    array: [1, 2, 3]
  };
  const typeofValue = 'array';
  const result = assignOrAddValueToObject(value, typeofValue, object, 'array');
  expect(result).toStrictEqual(objectShouldBe);
});

test('add array to original object with null keyToUseWith argument', () => {
  const object = {
    testKey: '123'
  };
  const value = [1, 2, 3];
  const objectShouldBe = {
    testKey: '123',
    joker: [1, 2, 3]
  };
  const typeofValue = 'array';
  const result = assignOrAddValueToObject(value, typeofValue, object);
  expect(result).toStrictEqual(objectShouldBe);
});

test('add array to original object with 0 keyToUseWith argument', () => {
  const object = {
    testKey: '123'
  };
  const value = [1, 2, 3];
  const objectShouldBe = {
    testKey: '123',
    0: [1, 2, 3]
  };
  const typeofValue = 'array';
  const result = assignOrAddValueToObject(value, typeofValue, object, 0);
  expect(result).toStrictEqual(objectShouldBe);
});

/*
Tests for flattening array
*/

test('flat index of array where value is number', () => {
  const value = 1;
  const parentAndCurrentKeyCombination = 'object.array';
  const shouldBe = { "object.array[0]": 1 };
  const result = flatIndexOfArray(0, value, parentAndCurrentKeyCombination, {}, '.');
  expect(result).toStrictEqual(shouldBe);
});

test('flat index of array where value is string', () => {
  const value = "string";
  const parentAndCurrentKeyCombination = 'object.array';
  const shouldBe = { "object.array[0]": "string" };
  const result = flatIndexOfArray(0, value, parentAndCurrentKeyCombination, {}, '.');
  expect(result).toStrictEqual(shouldBe);
});

test('flat index of array where value is array', () => {
  const value = [1, 2, 3];
  const parentAndCurrentKeyCombination = 'object.array';
  const shouldBe = { "object.array[0]": [1, 2, 3] };
  const result = flatIndexOfArray(0, value, parentAndCurrentKeyCombination, {}, '.');
  expect(result).toStrictEqual(shouldBe);
});

test('flat index of array where value is object', () => {
  const value = {
    array: [1, 2, 3],
    number: 1,
    string: 'string'
  };
  const parentAndCurrentKeyCombination = 'object.array';
  const shouldBe = {
    "object.array[0].array[0]": 1,
    "object.array[0].array[1]": 2,
    "object.array[0].array[2]": 3,
    "object.array[0].number": 1,
    "object.array[0].string": 'string'
  };
  const result = flatIndexOfArray(0, value, parentAndCurrentKeyCombination, {}, '.');
  expect(result).toStrictEqual(shouldBe);
});

/*
Tests for flattening different type of value
*/

test('flat object value', () => {
  const value = {
    array: [1, 2, 3],
    number: 1,
    string: 'string'
  };
  const type = 'object';
  const parentAndCurrentKeyCombination = 'object';
  const shouldBe = {
    "object.array[0]": 1,
    "object.array[1]": 2,
    "object.array[2]": 3,
    "object.number": 1,
    "object.string": 'string'
  };
  const result = flatDifferentType(value, type, parentAndCurrentKeyCombination, {});
  expect(result).toStrictEqual(shouldBe);
});

/*
Tests for flattening
*/

test('flatten firstCaseNestedJson', () => {
  const value = firstCaseNestedJSON;
  const result = flatten(value);
  expect(result).toStrictEqual(flattenedFirstCaseJSON);
});

test('flatten secondCaseNestedJson', () => {
  const value = secondCaseNestedJSON;
  const result = flatten(value);
  expect(result).toStrictEqual(flattenedSecondCaseJSON);
});

test('flatten thirdCaseNestedJson', () => {
  const value = thirdCaseNestedJSON;
  const result = flatten(value);
  expect(result).toStrictEqual(flattenedThirdCaseJSON);
});

test('flatten firstCaseNestedJson', () => {
  const value = firstCaseNestedJSON;
  const result = flatten(value, '-');
  expect(result).toStrictEqual(flattenedFirstCaseJSONLineSeparator);
});

test('flatten firstCaseNestedJson', () => {
  const value = firstCaseNestedJSON;
  const result = flatten(value, ' ');
  expect(result).toStrictEqual(flattenedFirstCaseJSONSpaceSeparator);
});