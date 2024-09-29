function printLetters() {

    const myString = document.getElementById("my-string").value;

    let output = '';

    for (let i = 0; i < myString.length; i++) {
        output += myString[i] + '\n';
    }

    document.getElementById("letter-output").textContent = output;
}
