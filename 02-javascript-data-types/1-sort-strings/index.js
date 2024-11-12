/**
 * sortStrings - sorts array of string by two criteria "asc" or "desc"
 * @param {string[]} arr - the array of strings
 * @param {string} [param="asc"] param - the sorting type "asc" or "desc"
 * @returns {string[]}
 */

export function sortStrings(arr, param = "asc") {
  const options = { caseFirst: "upper", sensitivity: "variant" };
  const locales = ["ru", "en"];
  const result = [...arr];
  const sortFunc = (a, b) => {
    if (param === "asc") return a.localeCompare(b, locales, options);
    return b.localeCompare(a, locales, options);
  };
  return result.sort(sortFunc);
}
