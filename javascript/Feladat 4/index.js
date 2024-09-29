// Function to calculate the letter grade based on the score
function calculateGrade() {
    // Get the score from the input field
    const score = parseFloat(document.getElementById("score").value);

    // Validate the score
    if (isNaN(score) || score < 0 || score > 100) {
        alert("Please enter a valid score between 0 and 100.");
        return;
    }

    // Determine the letter grade based on the score
    let grade;
    if (score >= 90) {
        grade = 'A';
    } else if (score >= 80) {
        grade = 'B';
    } else if (score >= 70) {
        grade = 'C';
    } else if (score >= 60) {
        grade = 'D';
    } else {
        grade = 'F';
    }

    // Display the grade in the HTML
    document.getElementById("grade-result").textContent = `Your Grade: ${grade}`;
}
