export const isObject = (value) =>
  value !== null && typeof value === "object" && !Array.isArray(value);

export const getValueAtPath = (obj, path) => {
  let current = obj;
  for (const key of path) current = current[key];
  return current;
};
