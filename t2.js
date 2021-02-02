function sort(arr) {
  quickSort(arr, 0, arr.length - 1)

  return arr
}

function quickSort(arr, start, end) {
  if (start >= end) return
  var mid = partition(arr, start, end)
  quickSort(arr, start, mid - 1)
  quickSort(arr, mid + 1, end)
}

function partition(arr, start, end) {
  var privot = arr[start]
  var left = start + 1
  var right = end

  while(left < right) {
    while(left < right && arr[left] < privot) left++
  }
}