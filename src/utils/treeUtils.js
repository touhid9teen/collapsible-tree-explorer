export const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export const getValueAtPath = (obj, path) => {
  let current = obj;
  for (const key of path) current = current[key];
  return current;
};

const setValueAtPath = (obj, path, newValue) => {
  const copy = JSON.parse(JSON.stringify(obj));
  let current = copy;
  for (let i = 0; i < path.length - 1; i++) {
    current = current[path[i]];
  }
  current[path[path.length - 1]] = newValue;
  return copy;
};

export const removeNodeAtPath = (obj, path) => {
  const parentPath = path.slice(0, -1);
  const keyToDelete = path[path.length - 1];

  const parentNode = getValueAtPath(obj, parentPath);
  const newParentNode = { ...parentNode };
  delete newParentNode[keyToDelete];

  return setValueAtPath(obj, parentPath, newParentNode);
};
