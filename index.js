function getCurrentJSONkeys(object) {
  // return Object keys only when the passed object is really an object
  // otherwise throw new Error
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

function renameKeyForFlattenedValue(parentKey, currentKey) {
  // return just currentKey early if parentKey is null etc.
  if (!parentKey) {
    return currentKey;
  }
  // using regex to check if the currentKey is [digit..]
  const regex = /^\[\d+\]$/;
  const result = currentKey.match(regex);
  // return new name differently when current key is array index
  if (result) {
    return parentKey + currentKey;
  }
  return parentKey + '.' + currentKey;
}

function flatten(data, parentKey) {
  const keys = getCurrentJSONkeys(data);
  let flattenedData = {};
  // return early if given argument is not a JSON object
  if (!keys) {
    return data;
  }
  for (const key of keys) {
    keyValue = data[key];
    const keyType = checkVariableType(keyValue);
    if (keyType === 'object') {
      const newName = renameKeyForFlattenedValue(parentKey, key);
      const newKeyValue = flatten(keyValue, newName);
      flattenedData = { ...flattenedData, ...newKeyValue };
    }
    else if (keyType === 'array') {
      const parentCurrentKeyPair = renameKeyForFlattenedValue(parentKey, key);
      for (let i = 0; i < keyValue.length; i++) {
        const newObject = {};
        const newName = '[' + i + ']';
        let renamedKey = renameKeyForFlattenedValue(parentCurrentKeyPair, newName);
        const newKeyValue = flatten(keyValue[i], renamedKey);
        newObject[renamedKey] = newKeyValue;
        flattenedData = { ...flattenedData, ...newObject };
      }
    }
    else {
      const renamedKey = renameKeyForFlattenedValue(parentKey, key);
      flattenedData[renamedKey] = keyValue;
    }
  }
  return { ...flattenedData };
}

module.exports = {
  getCurrentJSONkeys,
  checkVariableType,
  renameKeyForFlattenedValue,
  flatten
};