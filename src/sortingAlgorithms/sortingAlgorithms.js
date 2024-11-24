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
  const auxiliaryArray = array.slice(); // Copy of array to sort
  
  // Step 1: Build the max-heap
  buildMaxHeap(auxiliaryArray, animations);

  // Step 2: Perform heap sort
  let endIdx = auxiliaryArray.length - 1;
  while (endIdx > 0) {
    // Swap the root with the last element
    animations.push([0, endIdx]);  // Highlight swap
    swap(auxiliaryArray, 0, endIdx);  // Swap root and last element
    animations.push([0, endIdx]);  // Revert color after swap
    
    // Heapify the root after swap to restore heap property
    heapify(auxiliaryArray, 0, endIdx, animations);
    endIdx--;  // Decrease the size of the heap
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

  // If left child is larger than current node
  if (leftIdx < heapSize && array[leftIdx] > array[largest]) {
    largest = leftIdx;
  }
  
  // If right child is larger than current largest
  if (rightIdx < heapSize && array[rightIdx] > array[largest]) {
    largest = rightIdx;
  }
  
  // If largest is not currentIdx, swap and recursively heapify the affected subtree
  if (largest !== currentIdx) {
    // Visualize the swap (add color change and height update)
    animations.push([currentIdx, largest]);
    animations.push([currentIdx, largest]); // Revert color after swap
    swap(array, currentIdx, largest);
    heapify(array, largest, heapSize, animations);  // Recursive heapify
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
  const auxiliaryArray = array.slice(); // Copy of the array for sorting

  // Bubble Sort Logic
  for (let i = 0; i < auxiliaryArray.length - 1; i++) {
    for (let j = 0; j < auxiliaryArray.length - i - 1; j++) {
      // Add comparison animation
      animations.push([j, j + 1]);

      if (auxiliaryArray[j] > auxiliaryArray[j + 1]) {
        // Add swap animation (height updates)
        animations.push([j, auxiliaryArray[j + 1]]);
        animations.push([j + 1, auxiliaryArray[j]]);

        // Perform the swap
        const temp = auxiliaryArray[j];
        auxiliaryArray[j] = auxiliaryArray[j + 1];
        auxiliaryArray[j + 1] = temp;
      } else {
        // If no swap is needed, just push the heights (no update)
        animations.push([j, auxiliaryArray[j]]);
        animations.push([j + 1, auxiliaryArray[j + 1]]);
      }
    }
  }

  // Debug: Log animations to verify the steps
  console.log('Generated Bubble Sort Animations:', animations);

  return animations;
}