function printLetters() {

    const inputString = document.getElementById("inputString").value;
    let result = "";

    for (let i = 0; i < inputString.length; i++) {
        const char = inputString[i];

        if (/^[a-zA-Z]$/.test(char)) {
            result += char; 
        } else {
            break; 
        }
    }
 
    document.getElementById("letters-result").textContent = result.length > 0 ? result : "No letters found.";
}
