function printDivisors() {
    let result = "";
    let number = 10; 

    while (number <= 30) {
        let divisors = ""; 
        let divisor = 2; 

        while (divisor <= number) {
            if (number % divisor === 0) {
                divisors += divisor + ", "; 
            }
            divisor++; 
        }

        if (divisors.length > 0) {
            divisors = divisors.slice(0, -2);
        }

        result += number + ": " + divisors + "\n";
        number++; 
    }

    document.getElementById("divisors-result").textContent = result;
}
