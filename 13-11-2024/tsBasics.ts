let scores: number[] = [88, 72, 93, 64, 79];
let fruits: string[] = ["mango", "apple", "kiwi", "orange", "pineapple"];

// 1. push - Adds one or more elements to the end of an array
scores.push(90);
console.log("Scores after push:", scores);

// 2. pop - Removes the last element from an array
scores.pop(); 
console.log("Scores after pop:", scores);

// 3. unshift - Adds one or more elements to the beginning of an array
fruits.unshift("banana"); 
console.log("Fruits after unshift:", fruits);

// 4. shift - Removes the first element from an array
fruits.shift();
console.log("Fruits after shift:", fruits);

// 5. map - Creates a new array with modified values
let squaredScores = scores.map(score => score * score); 
console.log("Squared scores:", squaredScores);

// 6. filter - Filters elements that match the criteria
let highScores = scores.filter(score => score >= 80);
console.log("High scores:", highScores);

// 7. reduce - Reduces an array to a single accumulated value
let totalScore = scores.reduce((acc, score) => acc + score, 0);
console.log("Total score:", totalScore);

// 8. slice - Slices a portion of an array without modifying the original
let topTwoFruits = fruits.slice(0, 2); 
console.log("Top two fruits:", topTwoFruits);

// 9. splice - Modifies the array by removing or adding elements
scores.splice(2, 1, 95);
console.log("Scores after splice:", scores); 

// 10. forEach - Iterates through each element
console.log("Fruit names in uppercase:");
fruits.forEach(fruit => console.log(fruit.toUpperCase()));
console.log(fruits);

// Additional Array Methods:

// 11. find - Finds the first element that meets a condition
let firstHighScore = scores.find(score => score > 85); 
console.log("First high score:", firstHighScore);

// 12. includes - Checks if a value exists in the array
let hasKiwi = fruits.includes("kiwi");
console.log("Array includes 'kiwi':", hasKiwi);

// 13. concat - Combines two arrays
let combinedArrays = scores.concat([55, 100]);
console.log("Combined arrays:", combinedArrays);

// 14. sort - Sorts the elements of an array in place
let sortedScores = [...scores].sort((a, b) => b - a); 
console.log("Scores sorted in descending order:", sortedScores);

// 15. every - Tests if all elements pass a condition
let allPassingScores = scores.every(score => score >= 60); 
console.log("All scores passing:", allPassingScores);

// 16. some - Tests if at least one element passes a condition
let anyPerfectScore = scores.some(score => score === 100); 
console.log("Array has a perfect score:", anyPerfectScore);
