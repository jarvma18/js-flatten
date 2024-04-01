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
  // return early if given argument is not a JSON object
  if (!keys) {
    return data;
  }
  let flattenedData = {};
  for (const key of keys) {
    keyValue = data[key];
    const typeofKey = checkVariableType(keyValue);
    switch (typeofKey) {
      case 'object':
        const newKeyValue = flatten(keyValue, key);
        flattenedData = { ...flattenedData, ...newKeyValue };
        break;
      case 'array':
        const newObject = {};
        for (let j = 0; j < keyValue.length; j++) {
          const parentCurrentKeyPair = renameKeyForFlattenedValue(parentKey, key);
          const newName = '[' + j + ']';
          const renamedKey = renameKeyForFlattenedValue(parentCurrentKeyPair, newName);
          const newKeyValue = flatten(keyValue[j], renamedKey);
          newObject[renamedKey] = newKeyValue;
        }
        flattenedData = { ...flattenedData, ...newObject };
        break;
      default:
        const renamedKey = renameKeyForFlattenedValue(parentKey, key);
        flattenedData[renamedKey] = keyValue;
        break;
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