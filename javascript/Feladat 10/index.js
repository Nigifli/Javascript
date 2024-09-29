function drawSquare() {

    const size = parseInt(document.getElementById("size").value);
    
    if (isNaN(size) || size < 1) {
        alert("Please enter a valid size greater than 0.");
        return;
    }

    let square = "";

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {

            if (i === 0 || i === size - 1 || j === 0 || j === size - 1 || i === j) {
                square += "%"; 
            } else {
                square += " "; 
            }
        }
        square += "\n"; 
    }
    document.getElementById("square-result").textContent = square;
}
