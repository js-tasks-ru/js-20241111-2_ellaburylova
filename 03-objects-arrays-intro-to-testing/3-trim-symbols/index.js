/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (size <= 0) return "";
  if (size === undefined) return string;

  const resArray = [string[0]];
  let counter = 1;
  for (let i = 1; i < string.length; i++) {
    if (string[i] === string[i - 1]) {
      if (counter < size) {
        resArray.push(string[i]);
        counter += 1;
      }
    } else {
      resArray.push(string[i]);
      counter = 1;
    }
  }
  return resArray.join("");
}
