export function sortArray(arr, isDescending) {
  let sortedArr = [];
  if (isDescending) {
    sortedArr = [...arr].sort((a, b) => b - a);
  } else {
    sortedArr = [...arr].sort((a, b) => a - b);
  }

  return sortedArr;
}
