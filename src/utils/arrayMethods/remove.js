function lastElement(arr) {
  return arr && arr.pop();
}

function firstElement(arr) {
  return arr && arr.shift();
}

function arrayAtMiddle(arr, fromElement, toElement) {
  const startIndex = arr.indexOf(fromElement);
  const lastIndex = arr.indexOf(toElement);
  if (startIndex !== -1 && lastIndex !== -1) {
    const deleteCount = lastIndex - startIndex + 1;
    return arr.splice(startIndex, deleteCount);
  }
  return arr;
}

function elementAtMiddle(arr, element) {
  const elementIndex = arr.indexOf(element);
  if (elementIndex !== -1) {
    return arr.splice(elementIndex, 1);
  }
  return arr;
}

export default {
  lastElement,
  firstElement,
  arrayAtMiddle,
  elementAtMiddle,
};

/*
get(return data) length = 0 : sort order (dkien) - replace(index) - getByCondition()
post (return add) length >
remove( return remove) length <
 */
