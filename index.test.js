const {
  getCurrentJSONkeys,
  checkVariableType,
  renameKeyForFlattenedValue,
  flatten,
  arrayIndexRegexPattern
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

test('check that error is returned at current json level with array', () => {
  const notAnObject = [1, 2, 3];
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
  const result = renameKeyForFlattenedValue(parentKey, currentKey);
  expect(result).toBe('parentKey.currentKey');
});

test('new key for flattened object case 2', () => {
  parentKey = 'parentKey';
  currentKey = '[0]';
  const result = renameKeyForFlattenedValue(parentKey, currentKey);
  expect(result).toBe('parentKey[0]');
});

/*
Tests for array index regex pattern
*/

test('get regex pattern for array index', () => {
  const result = arrayIndexRegexPattern();
  expect(result).toStrictEqual(/^\[\d+\]$/);
});


/*
Tests for flattening
*/

test('flatten firstCaseNestedJson', () => {
  const value = firstCaseNestedJSON;
  const result = flatten(value);
  console.log(result);
  // expect(result).toStrictEqual(flattenedFirstCaseJSON, null);
});

// test('flatten secondCaseNestedJson', () => {
//   const value = secondCaseNestedJSON;
//   const result = flatten(value);
//   expect(result).toStrictEqual(flattenedSecondCaseJSON, null);
// });

// test('flatten thirdCaseNestedJson', () => {
//   const value = thirdCaseNestedJSON;
//   const result = flatten(value);
//   expect(result).toStrictEqual(flattenedThirdCaseJSON, null);
// });