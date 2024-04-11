function getCurrentJSONkeys(object) {
  if (!object) {
    return null;
  }
  if (typeof object === 'object' && !Array.isArray(object)) {
    return Object.keys(object);
  }
  return null;
}

function checkVariableType(value) {
  if (Array.isArray(value)) {
    return 'array';
  }
  return typeof value;
}

function matchArrayIndexRegexPattern() {
  return new RegExp(/^\[\d+\]$/);
}

function renameKeyForFlattenedValue(parentKey, currentKey) {
  if (!parentKey) {
    return currentKey;
  }
  const result = currentKey.match(matchArrayIndexRegexPattern());
  if (result) {
    return parentKey + currentKey;
  }
  return parentKey + '.' + currentKey;
}

function assignOrAddValueToObject(value, typeofValue, object, keyToUseWithAdd) {
  if (!keyToUseWithAdd && keyToUseWithAdd !== 0) {
    keyToUseWithAdd = 'joker';
  }
  if (typeofValue === 'object') {
    Object.assign(object, value);
  }
  else {
    object[keyToUseWithAdd] = value;
  }
  return object;
}

function flatIndexOfArray(index, value, parentKeyPlusCurrentKey, flattenedObject){
  const newName = '[' + index + ']';
  const renamedKey = renameKeyForFlattenedValue(parentKeyPlusCurrentKey, newName);
  const newKeyValue = flatten(value, renamedKey);
  const newKeyValueType = checkVariableType(newKeyValue);
  return assignOrAddValueToObject(newKeyValue, newKeyValueType, flattenedObject, renamedKey);
}

function flatDifferentType(value, type, parentAndCurrentKeyCombination, flattenedObject) {
  if (type === 'object') {
    const newKeyValue = flatten(value, parentAndCurrentKeyCombination);
    flattenedObject = { ...flattenedObject, ...newKeyValue };
  }
  else if (type === 'array') {
    for (let i = 0; i < value.length; i++) {
      flattenedObject = flatIndexOfArray(i, value[i], parentAndCurrentKeyCombination, flattenedObject);
    }
  }
  else {
    flattenedObject[parentAndCurrentKeyCombination] = value;
  }
  return flattenedObject;
}

function flatten(data, parentKey) {
  const keys = getCurrentJSONkeys(data);
  let flattenedObject = {};
  if (!keys) {
    return data;
  }
  for (const key of keys) {
    const value = data[key];
    const type = checkVariableType(value);
    const parentAndCurrentKeyCombination = renameKeyForFlattenedValue(parentKey, key);
    flattenedObject = flatDifferentType(value, type, parentAndCurrentKeyCombination, flattenedObject);
  }
  return flattenedObject;
}

module.exports = {
  getCurrentJSONkeys,
  checkVariableType,
  renameKeyForFlattenedValue,
  flatten,
  matchArrayIndexRegexPattern,
  assignOrAddValueToObject,
  flatIndexOfArray,
  flatDifferentType
};