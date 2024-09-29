function checkLeapYear() {

    const year = parseInt(document.getElementById("year").value);

    if (isNaN(year) || year <= 0) {
        alert("Please enter a valid positive year.");
        return;
    }

    let isLeapYear = false;
    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        isLeapYear = true;
    }

    const resultElement = document.getElementById("leap-year-result");
    if (isLeapYear) {
        resultElement.textContent = `${year} is a leap year.`;
    } else {
        resultElement.textContent = `${year} is not a leap year.`;
    }
}
