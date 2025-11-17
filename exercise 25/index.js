const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const combinedArray = [...array1, ...array2];

console.log(combinedArray);


function multiply(...numbers) {
  return numbers.reduce((product, num) => product * num, 1);
}

// Examples:
console.log(multiply(2, 3, 4));
console.log(multiply(5, 5));   
console.log(multiply(7,1));     
