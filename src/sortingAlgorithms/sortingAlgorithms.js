export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations,) {
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
  }
  
  function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations,) {
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
//========================================================Quick Sort==========================================================================
  export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return animations;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, startIdx, endIdx, animations) {
    if (startIdx < endIdx) {
        const pivotIdx = partition(array, startIdx, endIdx, animations);
        quickSortHelper(array, startIdx, pivotIdx - 1, animations);
        quickSortHelper(array, pivotIdx + 1, endIdx, animations);
    }
}

function partition(array, startIdx, endIdx, animations) {
    const pivot = array[endIdx];
    let i = startIdx - 1;

    for (let j = startIdx; j < endIdx; j++) {
        // Push comparison for coloring
        animations.push([j, endIdx, 'compare']);
        animations.push([j, endIdx, 'revert']);

        if (array[j] <= pivot) {
            i++;
            // Push swap animations
            animations.push([i, array[j], 'swap']);
            animations.push([j, array[i], 'swap']);
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Push pivot swap
    animations.push([i + 1, array[endIdx], 'swap']);
    animations.push([endIdx, array[i + 1], 'swap']);
    [array[i + 1], array[endIdx]] = [array[endIdx], array[i + 1]];

    return i + 1;
}
//=========================================================Heap Sort====================================================================
export function getHeapSortAnimations(array) {
  const animations = [];
  const auxiliaryArray = array.slice();

  buildMaxHeap(auxiliaryArray, animations);

  let endIdx = auxiliaryArray.length - 1;
  while (endIdx > 0) {
    // Highlight root and last element before swap
    animations.push([0, endIdx, "compare"]);
    // Swap the root with the last element
    swap(auxiliaryArray, 0, endIdx);
    animations.push([0, endIdx, "swap"]); // Record the swap

    // Restore heap property after swap
    heapify(auxiliaryArray, 0, endIdx, animations);
    endIdx--;
  }

  return animations;
}

function buildMaxHeap(array, animations) {
  const startIdx = Math.floor(array.length / 2) - 1;
  for (let i = startIdx; i >= 0; i--) {
    heapify(array, i, array.length, animations);
  }
}

function heapify(array, currentIdx, heapSize, animations) {
  let largest = currentIdx;
  const leftIdx = 2 * currentIdx + 1;
  const rightIdx = 2 * currentIdx + 2;

  if (leftIdx < heapSize && array[leftIdx] > array[largest]) {
    animations.push([currentIdx, leftIdx, "compare"]);
    largest = leftIdx;
  }
  if (rightIdx < heapSize && array[rightIdx] > array[largest]) {
    animations.push([currentIdx, rightIdx, "compare"]);
    largest = rightIdx;
  }
  if (largest !== currentIdx) {
    animations.push([currentIdx, largest, "compare"]);
    animations.push([currentIdx, largest, "swap"]);
    swap(array, currentIdx, largest);
    heapify(array, largest, heapSize, animations);
  }
}

function swap(array, idx1, idx2) {
  const temp = array[idx1];
  array[idx1] = array[idx2];
  array[idx2] = temp;
}

//=========================================================Bubble Sort====================================================================
export function getBubbleSortAnimations(array) {
  const animations = [];
  const auxiliaryArray = array.slice();
  
  // Bubble Sort logic
  let n = auxiliaryArray.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      // Add comparison animation
      animations.push([j, j + 1, "compare"]);

      // If out of order, add swap animation
      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        animations.push([j, j + 1, "swap"]);
        swap(auxiliaryArray, j, j + 1);
      }
    }
  }
  return animations;
}
