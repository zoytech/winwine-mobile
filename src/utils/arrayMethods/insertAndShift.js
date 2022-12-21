export default function insertAndShift(arr, from, to) {
  const customArr = arr && arr;
  console.log('from: ', from);
  if (customArr && customArr !== []) {
    let cutOut = customArr.splice(from, 1)[0]; // cut the element at index 'from'
    customArr.splice(to, 0, cutOut); // insert it at index 'to'
  }
}
