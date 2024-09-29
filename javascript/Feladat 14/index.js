function playFizzBuzz() {
    let result = "";

    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0 && i % 5 === 0) {
            result += "fizzbuzz, "; 
        } else if (i % 3 === 0) {
            result += "fizz, "; 
        } else if (i % 5 === 0) {
            result += "buzz, "; 
        } else {
            result += i + ", "; 
        }
    }

    if (result.length > 0) {
        result = result.slice(0, -2);
    }

    document.getElementById("fizzbuzz-result").textContent = result;
}
