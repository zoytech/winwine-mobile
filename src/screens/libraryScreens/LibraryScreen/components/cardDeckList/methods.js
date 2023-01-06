export function getPinnedFirst(dt, pinDeckIds) {
  return (
    dt &&
    dt.reduce((acc, element) => {
      const hasPinId = pinDeckIds.includes(element?.cardDeckId);
      return hasPinId ? [element, ...acc] : [...acc, element];
    }, [])
  );
}

export function getFilteringDataByTag(dt, tagId) {
  return dt && dt.filter(item => item?.hashtags.includes(tagId));
}

export function getMarginItem(index) {
  const isEven = index % 2 === 0;
  return isEven ? {marginRight: 8} : {marginLeft: 8};
}
