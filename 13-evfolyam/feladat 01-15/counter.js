let counter = 0;

function changeCounter(amount) {
    counter += amount;
    document.getElementById("counter").textContent = counter;
}