function determineWinner() {

    const player1Choice = document.getElementById("player1").value;
    const player2Choice = document.getElementById("player2").value;

    let result;
    if (player1Choice === player2Choice) {
        result = "The game is a tie.";
    } else if (
        (player1Choice === "rock" && player2Choice === "scissors") ||
        (player1Choice === "scissors" && player2Choice === "paper") ||
        (player1Choice === "paper" && player2Choice === "rock")
    ) {
        result = "The first player wins.";
    } else {
        result = "The second player wins.";
    }

    document.getElementById("winner-result").textContent = result;
}
