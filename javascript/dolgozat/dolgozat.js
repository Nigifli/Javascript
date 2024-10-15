// 1. feladat - Seconds Remaining
function seconds(time) {
    let [hours, minutes, seconds] = time.split(':').map(Number);

    let elapsedSeconds = hours * 3600 + minutes * 60 + seconds;

    let totalSecondsInDay = 24 * 3600;

    return totalSecondsInDay - elapsedSeconds;
}

// 2. feladat - Divisors
function divisors(number) {
    let result = [];

    for (let i = 1; i <= number; i++) {
        if (number % i === 0) {
            result.push(i);
        }
    }
    return result;
}

// 3. feladat - Leap Year
function isLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            return year % 400 === 0;
        }
        return true;
    }
    return false;
}

// 4. feladat - Fizzbuzz
function fizzbuzz(number) {
    if (number % 3 === 0 && number % 5 === 0) {
        return 'fizzbuzz'; 
    } else if (number % 3 === 0) {
        return 'fizz'; 
    } else if (number % 5 === 0) {
        return 'buzz'; 
    }
    return number; 
}
