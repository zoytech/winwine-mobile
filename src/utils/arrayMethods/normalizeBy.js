export default function normalizeBy(key) {
  return (acc, item) => {
    acc[item[key]] = item;
    return acc;
  };
}
