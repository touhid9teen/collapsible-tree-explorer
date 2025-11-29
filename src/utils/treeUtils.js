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

export const addNodeAtPath = (obj, path, newKey, newValue) => {
  const target = getValueAtPath(obj, path);
  if (!isObject(target)) return obj;

  const newTarget = { ...target, [newKey]: newValue };
  return setValueAtPath(obj, path, newTarget);
};

export const removeNodeAtPath = (obj, path) => {
  const parentPath = path.slice(0, -1);
  const keyToDelete = path[path.length - 1];

  const parentNode = getValueAtPath(obj, parentPath);
  const newParentNode = { ...parentNode };
  delete newParentNode[keyToDelete];

  return setValueAtPath(obj, parentPath, newParentNode);
};

export const updateNodeAtPath = (obj, path, newKey, newValue) => {
  const oldKey = path[path.length - 1];
  const parentPath = path.slice(0, -1);

  const parentNode =
    parentPath.length === 0 ? obj : getValueAtPath(obj, parentPath);
  if (!isObject(parentNode)) return obj;

  const updatedNode = { ...parentNode };
  const currentNode = parentNode[oldKey];
  const isParent = typeof currentNode === "object" && currentNode !== null;
  if (oldKey !== newKey) {
    updatedNode[newKey] = updatedNode[oldKey];
    delete updatedNode[oldKey];
  }
  if (!isParent) {
    updatedNode[newKey] = newValue;
  }
  return parentPath.length === 0
    ? updatedNode
    : setValueAtPath(obj, parentPath, updatedNode);
};
