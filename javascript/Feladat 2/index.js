function calculateRemainingSeconds() {

    const currentHours = 14;
    const currentMinutes = 34;
    const currentSeconds = 42;

    const totalSecondsInDay = 24 * 60 * 60;

    const elapsedSeconds = currentHours * 60 * 60 + currentMinutes * 60 + currentSeconds;

    const remainingSeconds = totalSecondsInDay - elapsedSeconds;

    document.getElementById("remaining-seconds").textContent = remainingSeconds;
}