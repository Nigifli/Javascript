// 1. 
const getOtosLotteryNumbers = () => {
  let numbers = [];
  while (numbers.length < 5) {
    let number = Math.floor(Math.random() * 90) + 1;
    if (!numbers.includes(number)) {
      numbers.push(number);
    }
  }
  return numbers;
};

// 2. 
const getSortedtLotteryNumbers = (numbers) => {
  return numbers.sort((a, b) => a - b);
};

// 3. 
const getNumberOfHits = (lotteryNumbers, tips) => {
  let hits = 0;
  tips.forEach((tip) => {
    if (lotteryNumbers.includes(tip)) {
      hits++;
    }
  });
  return hits;
};

// 4. 
const getMonthlyLotteryArrayNumbers = () => {
  let monthlyLotteryNumbers = [];
  for (let i = 0; i < 4; i++) {
    monthlyLotteryNumbers.push(getOtosLotteryNumbers());
  }
  return monthlyLotteryNumbers;
};

// 5. 
const getMonthlyLotteryNumbers = (monthlyLotteryNumbers) => {
  let numbers = [];
  monthlyLotteryNumbers.forEach((week) => {
    week.forEach((number) => {
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    });
  });
  return numbers;
};

// 6. 

const monthlyStatistics = (monthlyLotteryNumbers) => {
  let numbers = getMonthlyLotteryNumbers(monthlyLotteryNumbers);
  let statistics = [];
  numbers.forEach((number) => {
    let count = 0;
    monthlyLotteryNumbers.forEach((week) => {
      if (week.includes(number)) {
        count++;
      }
    });
    statistics.push([number, count]);
  });
  return statistics;
};
