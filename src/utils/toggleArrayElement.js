export function toggleArrayElement(arr, item) {
  if (arr.includes(item)) {
    return arr.filter((element) => element !== item);
  } else {
    return [...arr, item];
  }
}
