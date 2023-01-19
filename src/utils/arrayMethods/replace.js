function elementByElement(arr, oldEle, newEle) {
  const oldIndex = arr.indexOf(oldEle);
  if (oldIndex !== -1) {
    arr[oldIndex] = newEle;
  }
  return arr;
}

function lastElementWhenExceedLength(array, limitValue) {
  array.length > limitValue ? array.splice(array.length - 1, 1) : array;
  return array;
}

export default {elementByElement, lastElementWhenExceedLength};
