function calculateAverage() {

    const number = document.getElementById("number").value;

    let sum = 0;
    let count = 0;

    // Loop through each digit of the number
    for (let i = 0; i < number.length; i++) {
        sum += parseInt(number[i], 10); 
        count++;

    const average = sum / count;

    document.getElementById("average-result").textContent = `The average of digits is ${average}.`;
    }
}
