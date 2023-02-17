function uniqueElement(arr) {
  const uniqueArr = arr.filter((item, index) => arr.indexOf(item) === index);
  return arr && arr.length !== 0 ? uniqueArr : [];
}

function intersectionElement(shortArr, longArr) {
  const intersectionArr = longArr.filter(element => shortArr.includes(element));
  return longArr && shortArr ? intersectionArr : [];
}

export default {uniqueElement, intersectionElement};
