function printNumbers() {
    let result = "";
    let countDiv3 = 0; 
    let skipCount = 1; 

    for (let i = 1; i <= 100; i++) {
        if (i % 3 === 0) {
            countDiv3++; 

            if (countDiv3 === skipCount) {
                skipCount++; 
                continue; 
            }
        }

        result += i + (i < 100 ? ", " : ""); 
    }
    document.getElementById("numbers-result").textContent = result;
}
