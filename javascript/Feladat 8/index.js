function calculateFactorial() {

    const number = parseInt(document.getElementById("number").value);

    if (isNaN(number) || number < 0) {
        alert("Please enter a valid non-negative integer.");
        return;
    }

    let factorial = 1;

    for (let i = 1; i <= number; i++) {
        factorial *= i;
    }

    document.getElementById("factorial-result").textContent = `${number} factorial is ${factorial}.`;
}
