import React from 'react';
import {getMergeSortAnimations, getQuickSortAnimations, getHeapSortAnimations, getBubbleSortAnimations} from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 120;

// This is the main color of the array bars.
const PRIMARY_COLOR = '#96d4af';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
      array.push(randomIntFromInterval(5, 500));
    }
    this.setState({array});
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName('array-bar');
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }
//========================================================Quick Sort==========================================================================
  quickSort() {
    const animations = getQuickSortAnimations(this.state.array);
    const arrayBars = document.getElementsByClassName('array-bar');

    for (let i = 0; i < animations.length; i++) {
        const [barOneIdx, barTwoIdxOrHeight, action] = animations[i];

        if (action === 'compare' || action === 'revert') {
            const color = action === 'compare' ? SECONDARY_COLOR : PRIMARY_COLOR;
            setTimeout(() => {
                arrayBars[barOneIdx].style.backgroundColor = color;
                arrayBars[barTwoIdxOrHeight].style.backgroundColor = color;
            }, i * ANIMATION_SPEED_MS);
        } else if (action === 'swap') {
            setTimeout(() => {
                const barStyle = arrayBars[barOneIdx].style;
                barStyle.height = `${barTwoIdxOrHeight}px`;
            }, i * ANIMATION_SPEED_MS);
        }
    }

    // Reset all colors to PRIMARY_COLOR after animations complete
    setTimeout(() => {
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
        }
    }, animations.length * ANIMATION_SPEED_MS);
}
//=============================================================Heap Sort==========================================================================
heapSort() {
  const animations = getHeapSortAnimations(this.state.array);
  let i = 0;
  const arrayBars = document.getElementsByClassName('array-bar');

  const sort = () => {
    if (i < animations.length) {
      const isColorChange = i % 2 === 0; // Color change on comparisons (even steps)
      const [barOneIdx, barTwoIdx] = animations[i];
      
      // Ensure the indices are valid
      if (barOneIdx >= 0 && barOneIdx < arrayBars.length && barTwoIdx >= 0 && barTwoIdx < arrayBars.length) {
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;

        if (isColorChange) {
          // Highlight bars being compared
          const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * ANIMATION_SPEED_MS);
        } else {
          // Update bar height after swap
          setTimeout(() => {
            const [barIdx, newHeight] = animations[i];
            const barStyle = arrayBars[barIdx].style;
            barStyle.height = `${newHeight}px`;
          }, i * ANIMATION_SPEED_MS);
        }

        // Reset colors after each comparison/swap (reset after every swap)
        if (i % 4 === 1 || i % 4 === 3) {
          const colorReset = i % 4 === 1 ? PRIMARY_COLOR : SECONDARY_COLOR;
          setTimeout(() => {
            barOneStyle.backgroundColor = colorReset;
            barTwoStyle.backgroundColor = colorReset;
          }, (i + 1) * ANIMATION_SPEED_MS);
        }
      }

      i++;

      // Ensure the sorting function doesn't break by using setTimeout (instead of requestAnimationFrame)
      if (i < animations.length) {
        setTimeout(sort, ANIMATION_SPEED_MS); // Continue to the next frame after the timeout
      }
    }
  };

  sort(); // Start the sorting process
}
//=========================================================Bubble Sort====================================================================
bubbleSort() {
  const animations = getBubbleSortAnimations(this.state.array);
  let i = 0;
  const arrayBars = document.getElementsByClassName('array-bar');
  
  // Debug: Check if arrayBars match the number of elements in state.array
  console.log('Number of bars in DOM:', arrayBars.length, 'Array length:', this.state.array.length);

  const sort = () => {
    if (i < animations.length) {
      const isColorChange = i % 2 === 0; // Color change for comparisons (even steps)
      const [barOneIdx, barTwoIdx] = animations[i];

      // Debug: Check for valid indices before accessing the arrayBars
      if (barOneIdx >= arrayBars.length || barTwoIdx >= arrayBars.length || barOneIdx < 0 || barTwoIdx < 0) {
        console.error('Invalid indices:', barOneIdx, barTwoIdx);
        return; // Stop animation if invalid indices
      }

      const barOneStyle = arrayBars[barOneIdx].style;
      const barTwoStyle = arrayBars[barTwoIdx].style;

      if (isColorChange) {
        // Highlight bars being compared
        const color = i % 4 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        // Swap the bars (update heights)
        setTimeout(() => {
          const [barIdx, newHeight] = animations[i];
          const barStyle = arrayBars[barIdx].style;
          barStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }

      // Reset colors after each comparison/swap
      if (i % 4 === 1 || i % 4 === 3) {
        const colorReset = i % 4 === 1 ? PRIMARY_COLOR : SECONDARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = colorReset;
          barTwoStyle.backgroundColor = colorReset;
        }, (i + 1) * ANIMATION_SPEED_MS);
      }

      i++;

      // Continue sorting after the timeout
      if (i < animations.length) {
        setTimeout(sort, ANIMATION_SPEED_MS);
      }
    }
  };

  sort(); // Start sorting process
}






  // NOTE: This method will only work if your sorting algorithms actually return
  // the sorted arrays; if they return the animations (as they currently do), then
  // this method will be broken.
  testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = randomIntFromInterval(1, 1000);
      for (let i = 0; i < length; i++) {
        array.push(randomIntFromInterval(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  render() {
    const {array} = this.state;

    return (
      <div className="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
            }}></div>
        ))}
        <button onClick={() => this.resetArray()}>Generate New Array</button>
        <button onClick={() => this.mergeSort()}>Merge Sort</button>
        <button onClick={() => this.quickSort()}>Quick Sort</button>
        <button onClick={() => this.heapSort()}>Heap Sort</button>
        <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
      </div>
    );
  }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
  if (arrayOne.length !== arrayTwo.length) return false;
  for (let i = 0; i < arrayOne.length; i++) {
    if (arrayOne[i] !== arrayTwo[i]) {
      return false;
    }
  }
  return true;
}