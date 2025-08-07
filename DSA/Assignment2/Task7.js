const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  const merge = (a, b) => {
    let i = 0, j = 0, result = [];
    while (i < a.length && j < b.length) {
      if (a[i] < b[j]) result.push(a[i++]);
      else result.push(b[j++]);
    }
    return result.concat(a.slice(i)).concat(b.slice(j));
  };

  return merge(left, right);
};

const binarySearch = (arr, target) => {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
};

let data = [4, 1, 7, 3, 8];
let sorted = mergeSort(data);
console.log("Sorted:", sorted);
console.log("Index of 7:", binarySearch(sorted, 7));
