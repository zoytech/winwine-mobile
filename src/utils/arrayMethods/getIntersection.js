export function getNewIntersection(conditionArray, templateArray) {
  return conditionArray.filter(element => templateArray.includes(element));
}

export function getSeparateIntersection(conditionArray, templateArray) {
  return templateArray.reduce((acc, element) => {
    if (conditionArray.includes(element)) {
      return [element, ...acc];
    }
    return [...acc, element];
  }, []);
  // return conditionArray.filter(item => item[templateKey] === intersectionIds)
}
