function uniqueElement(arr) {
  return (
    arr &&
    arr.length !== 0 &&
    arr.filter((item, index) => arr.indexOf(item) === index)
  );
}

function intersectionElement(shortArr, longArr) {
  return longArr.filter(element => shortArr.includes(element));
}

export default {uniqueElement, intersectionElement};
