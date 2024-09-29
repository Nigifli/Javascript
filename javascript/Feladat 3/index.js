function calculateBMI() {

    const mass = parseFloat(document.getElementById("mass").value);
    const height = parseFloat(document.getElementById("height").value);

    if (isNaN(mass) || isNaN(height) || mass <= 0 || height <= 0) {
        alert("Please enter valid positive numbers for both mass and height.");
        return;
    }

    const bmi = mass / (height * height);

    document.getElementById("bmi-result").textContent = `Your BMI: ${bmi.toFixed(2)}`;
}