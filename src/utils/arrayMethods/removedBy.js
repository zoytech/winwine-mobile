// it splice directly without looping
export function removeJustOneItem(array, value) {
  const NUMBER_REMOVE_ITEM = 1;
  const index = array.indexOf(value);
  index >= 0 && array.splice(index, NUMBER_REMOVE_ITEM);
  return [...array];
}

export function removeAllSameItem(array, value) {}

// it will be looping -> cause render longer
export function removeIdenticalItemInArray(array) {
  return array.filter((item, index) => array.indexOf(item) === index);
}
