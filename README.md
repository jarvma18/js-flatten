# js-flatten

js-flatten is utility designed to flatten nested JSON structures. Nested JSON can be challenging to work with and flattening the structure will give more simple view about the complex nested JSON. This could be used also to abstractify the complex JSON to more simple structure that is manageable by the user.

Features include:
* Recursive flattening √
* Customizable separators √
* Efficient and lightweight √
* Easy integration √

In the future:
* Deflatten feature

I practiced TDD with this small project.

## Prerun actions

* Install Node.js

## How to run

### Install npm packages
```
npm install
```

### Run
```
# Create new file for example. main.js
# Require flatten function from index.js
# Use flatten like this:

flatten(data, separator, parentKey)

# data = object to be flattened
# separator = what separator to use when combining nested objects to one key
# parentKey = leave this null if you don't want that the main flattened object has prefix key

```

### Run tests
```
npm run test
```
