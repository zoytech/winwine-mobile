export function getDataWithLimitedLength(array, limitValue) {
  array.length > limitValue ? array.splice(array.length - 1, 1) : array;
  return array;
}
