/**
 * createGetter - creates function getter which allows select value from object
 * @param {string} path - the strings path separated by dot
 * @returns {function} - function-getter which allow get value from object by set path
 */
export function createGetter(path) {
  const pathArray = path.split(".");

  function getInner(currentProperty, index = 0) {
    if (!currentProperty || index >= pathArray.length) return currentProperty;
    if (!Object.hasOwn(currentProperty, pathArray[index])) return;
    return getInner(currentProperty[pathArray[index]], index + 1);
  }
  return function (obj) {
    return getInner(obj);
  };
}
