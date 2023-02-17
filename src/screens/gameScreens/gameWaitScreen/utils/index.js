export function getPreviewCardNumber(total, maxPreview) {
  return total >= maxPreview ? maxPreview : total;
}

export function getPreviewDataItem(data, initIndex) {
  const length = data.length;
  const showLimitedCard = getPreviewCardNumber(length);
  return data.slice(initIndex, showLimitedCard);
}
