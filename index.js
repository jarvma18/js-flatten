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

function renameKeyForFlattenedValue(parentKey, currentKey, separator) {
  separator = separator.toString().trim();
  if (!parentKey) {
    return currentKey;
  }
  const result = currentKey.match(matchArrayIndexRegexPattern());
  if (result) {
    return parentKey + currentKey;
  }
  return parentKey + separator + currentKey;
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

function flatIndexOfArray(index, value, parentKeyPlusCurrentKey, flattenedObject, separator){
  const newName = '[' + index + ']';
  const renamedKey = renameKeyForFlattenedValue(parentKeyPlusCurrentKey, newName, separator);
  const newKeyValue = flatten(value, separator, renamedKey);
  const newKeyValueType = checkVariableType(newKeyValue);
  return assignOrAddValueToObject(newKeyValue, newKeyValueType, flattenedObject, renamedKey);
}

function flatDifferentType(value, type, parentAndCurrentKeyCombination, flattenedObject, separator) {
  if (type === 'object') {
    const newKeyValue = flatten(value, separator, parentAndCurrentKeyCombination);
    flattenedObject = { ...flattenedObject, ...newKeyValue };
  }
  else if (type === 'array') {
    for (let i = 0; i < value.length; i++) {
      flattenedObject = flatIndexOfArray(i, value[i], parentAndCurrentKeyCombination, flattenedObject, separator);
    }
  }
  else {
    flattenedObject[parentAndCurrentKeyCombination] = value;
  }
  return flattenedObject;
}

function flatten(data, separator = '.', parentKey) {
  const keys = getCurrentJSONkeys(data);
  let flattenedObject = {};
  if (!keys) {
    return data;
  }
  for (const key of keys) {
    const value = data[key];
    const type = checkVariableType(value);
    const parentAndCurrentKeyCombination = renameKeyForFlattenedValue(parentKey, key, separator);
    flattenedObject = flatDifferentType(value, type, parentAndCurrentKeyCombination, flattenedObject, separator);
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