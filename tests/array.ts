// create an array of numbers
let ages: number[] = [22, 33, 11, 26, 45, 65, 71];
console.log(ages);
console.log("how many elements: " + ages.length);

// get access an element by index
// first element
console.log(ages[0]);
console.log(ages[6]);
console.log(ages[7]);
console.log(ages[ages.length - 1]);

for (let i = 0; i < ages.length; i++) {
  console.log("element at index " + i + " is " + ages[i]);
}

let userId: number[] = [2222, 5632, 3759, 8495, 9111, 9119];
console.log(userId);

for (let i = 0; i < 6; i++) {
  // console.log('User id number ' + i + ' is ' + userId[i]);
  if (userId[i] > 8000) {
    console.log(userId[i]);
  } // prints out elements bigger than 8000
  console.log("Current iteration number: " + i);
  console.log("Current array value: " + userId[i]);
  if (userId[i] > 8000) {
    console.log(userId[i]);
  }
}
