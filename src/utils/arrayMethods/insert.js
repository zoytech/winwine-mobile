function elementAtMiddle(array, element, index) {
  return array && array.splice(index, 0, element);
}

function arrayAtMiddle(baseArr, addArr, index) {
  return baseArr && baseArr.splice(index, 0, ...addArr);
}

export default {
  elementAtMiddle,
  arrayAtMiddle,
};
