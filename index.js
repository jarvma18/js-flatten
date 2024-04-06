function getCurrentJSONkeys(object) {
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

function flatten(data, parentKey) {
  const keys = getCurrentJSONkeys(data);
  let flattenedData = {};
  if (!keys) {
    return data;
  }
  for (const key of keys) {
    const keyValue = data[key];
    const keyType = checkVariableType(keyValue);
    if (keyType === 'object') {
      const newName = renameKeyForFlattenedValue(parentKey, key);
      const newKeyValue = flatten(keyValue, newName);
      flattenedData = { ...flattenedData, ...newKeyValue };
    }
    else if (keyType === 'array') {
      const parentCurrentKeyPair = renameKeyForFlattenedValue(parentKey, key);
      for (let i = 0; i < keyValue.length; i++) {
        const newName = '[' + i + ']';
        const renamedKey = renameKeyForFlattenedValue(parentCurrentKeyPair, newName);
        const newKeyValue = flatten(keyValue[i], renamedKey);
        const newKeyValueType = checkVariableType(newKeyValue);
        if (newKeyValueType === 'object') {
          Object.assign(flattenedData, newKeyValue);
        }
        else {
          flattenedData[renamedKey] = newKeyValue;
        }
      }
    }
    else {
      const renamedKey = renameKeyForFlattenedValue(parentKey, key);
      flattenedData[renamedKey] = keyValue;
    }
  }
  return flattenedData;
}

module.exports = {
  getCurrentJSONkeys,
  checkVariableType,
  renameKeyForFlattenedValue,
  flatten,
  arrayIndexRegexPattern
};