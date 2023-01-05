function elementAtLast(arr, e) {
  return arr && arr.push(e);
}

function arrayAtLast(baseArr, addArr) {
  return baseArr && baseArr.push(...addArr);
}

function elementAtFirst(arr, e) {
  return arr && arr.unshift(e);
}

function arrayAtFirst(baseArr, addArr) {
  return baseArr && baseArr.unshift(addArr);
}

function elementAtMiddle(array, element, index) {
  return array && array.splice(index, 0, element);
}

function arrayAtMiddle(baseArr, addArr, index) {
  return baseArr && baseArr.splice(index, 0, ...addArr);
}

export default {
  elementAtLast,
  arrayAtLast,
  elementAtFirst,
  arrayAtFirst,
  elementAtMiddle,
  arrayAtMiddle,
};
