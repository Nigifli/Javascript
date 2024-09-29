function calculateCuboid() {
    const side1 = parseFloat(document.getElementById("side1").value);
    const side2 = parseFloat(document.getElementById("side2").value);
    const side3 = parseFloat(document.getElementById("side3").value);

    if (isNaN(side1) || isNaN(side2) || isNaN(side3) || side1 <= 0 || side2 <= 0 || side3 <= 0) {
        alert("Please enter valid positive numbers for all sides.");
        return;
    }

    const surfaceArea = 2 * (side1 * side2 + side1 * side3 + side2 * side3);
    const volume = side1 * side2 * side3;

    document.getElementById("surface-area").textContent = `Surface Area: ${surfaceArea} square units`;
    document.getElementById("volume").textContent = `Volume: ${volume} cubic units`;
}