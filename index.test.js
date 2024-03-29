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

test('flatten firstCaseNestedJson', () => {

});

test('flatten secondCaseNestedJson', () => {

});

test('flatten thirdCaseNestedJson', () => {

});