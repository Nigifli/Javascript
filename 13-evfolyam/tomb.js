const tomb = [1, 1, 2, 3, 5, 3, 8, 8];
let egyedi = [];
let egyedi2 = [];
const hossz = tomb.length;

tomb.forEach(item => {
    if(!egyedi.includes(item)) {
        egyedi.push(item);
    }
})

for(let i = 0; i<tomb.length; i++) {
    let num = tomb[i];

    let db = tomb.filter(y => y === num).length;

    if (db === 1) {
        egyedi2.push(num);
    }
}

console.log(egyedi);
console.log(egyedi2);