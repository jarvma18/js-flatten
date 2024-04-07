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

function arrayIndexRegexPattern() {
  return new RegExp(/^\[\d+\]$/);
}

function renameKeyForFlattenedValue(parentKey, currentKey) {
  if (!parentKey) {
    return currentKey;
  }
  const result = currentKey.match(arrayIndexRegexPattern());
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

function flatten(data, parentKey) {
  const keys = getCurrentJSONkeys(data);
  let flattenedData = {};
  if (!keys) {
    return data;
  }
  for (const key of keys) {
    const keyValue = data[key];
    const keyType = checkVariableType(keyValue);
    const parentKeyPlusCurrentKey = renameKeyForFlattenedValue(parentKey, key);
    if (keyType === 'object') {
      const newKeyValue = flatten(keyValue, parentKeyPlusCurrentKey);
      flattenedData = { ...flattenedData, ...newKeyValue };
    }
    else if (keyType === 'array') {
      for (let i = 0; i < keyValue.length; i++) {
        const newName = '[' + i + ']';
        const renamedKey = renameKeyForFlattenedValue(parentKeyPlusCurrentKey, newName);
        const newKeyValue = flatten(keyValue[i], renamedKey);
        const newKeyValueType = checkVariableType(newKeyValue);
        flattenedData = assignOrAddValueToObject(newKeyValue, newKeyValueType, flattenedData, renamedKey);
      }
    }
    else {
      flattenedData[parentKeyPlusCurrentKey] = keyValue;
    }
  }
  return flattenedData;
}

module.exports = {
  getCurrentJSONkeys,
  checkVariableType,
  renameKeyForFlattenedValue,
  flatten,
  arrayIndexRegexPattern,
  assignOrAddValueToObject
};