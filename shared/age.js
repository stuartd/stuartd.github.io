	function calculate(today, birthDate, name) {

	const birthMonth = actualMonth(birthDate);
	const daysInBirthMonth = daysInMonth(birthDate);
	const daysInCurrentMonth = daysInMonth(today);

	const birthYear = birthDate.getFullYear();
	const birthDay = birthDate.getDate();

	let currentYear = today.getFullYear();
	let currentMonth = actualMonth(today);
	let currentDay = today.getDate();

	const rawWeeks = ((today - birthDate) / 604800000);
	const weeks = rawWeeks.toFixed(0);
		
	// TODO - 1) actually write down the algorithm for this
	// Decide whether to use the raw value for month, or the 'correct' value
	// 2) Create a daysInMonth(month) function
	// 3) Calculate weeks and days ("30 weeks and 6 days")
	// 4) Fix the names. Ugh.

	var FirstMonthDiff = daysInBirthMonth - birthDay + 1;

	if (currentDay - birthDay < 0) {
		currentMonth = currentMonth - 1;
		currentDay = currentDay + daysInCurrentMonth;
	}

	var daysDiff = currentDay - birthDay;

	if (currentMonth - birthMonth < 0) {
		currentYear = currentYear - 1;
		currentMonth = currentMonth + 12;
	}

	var monthDiff = currentMonth - birthMonth;

	var yearDiff = currentYear - birthYear;

	if (daysDiff == daysInCurrentMonth) {
		daysDiff = 0;
		monthDiff = monthDiff + 1;

		if (monthDiff == 12) {
			monthDiff = 0;
			yearDiff = yearDiff + 1;
		}

	}

	if ((FirstMonthDiff != daysInBirthMonth) && (currentDay - 1 == daysInCurrentMonth)) {
		daysDiff = FirstMonthDiff;
	}

	var yearText;
	if (yearDiff == 0) {
		yearText = " "
	} else if (yearDiff == 1) {
		yearText = "one year"
	} else if (yearDiff > 1) {
		yearText = yearDiff + " years"
	}

	var monthText;
	if (monthDiff == 0) {
		monthText = " "
	}
	else if (monthDiff == 1) {
		monthText = "one month"
	} else if (monthDiff > 1) {
		monthText = monthDiff + " months"
	}

	var dayText;
	if (daysDiff == 0) {
		dayText = " "
	}
	if (daysDiff == 1) {
		dayText = "one day "
	} else if (daysDiff > 1) {
		dayText = daysDiff + " days"
	}

	let resultText = getResultText(daysDiff, monthDiff, yearDiff, dayText, monthText, yearText);
	let weeksText = weeks < 52 ? `(${weeks} weeks)` : '';	
	
	var result = `${name} is ${resultText} old ${weeksText}`

	return result.trim();
}

function getWeekText() {
   if (weeks < 52) {
	   return null;
   }

   if (days == 0) {
		return `(${weeks})`;
   }

   return  `(${weeks} weeks and ${days})`;
}

function getResultText(daysDiff, monthsDiff, yearsDiff, dayText, monthText, yearText) {
	if (daysDiff === 0 && yearsDiff === 0) {
		return `exactly ${monthText}`
	}

	if (monthsDiff === 0 && daysDiff === 0) {
		return `exactly ${yearText}`
	}

	if (monthsDiff === 0) {
		return `${yearText} and ${dayText}`
	}

	if (yearsDiff === 0 && daysDiff === 0) {
		return `${monthText}`
	}

	if (yearsDiff === 0) {
		return `${monthText} and ${dayText}`
	}

	if (daysDiff === 0) {
		return `${yearText} and ${monthText}`
	}
		
	return `${yearText}, ${monthText} and ${dayText}`
}

function actualMonth(date) {
	// Make things easier by getting the actual month number
	return date.getMonth() + 1;
}

function daysInMonth(rawDate) {

	month = rawDate.getMonth() + 1;
	year = rawDate.getFullYear();

	// "30 days hath september, april, june and november .."
	if ((month == 4) 
		|| (month == 6) 
		|| (month == 9) 
		|| (month == 11)) {
		return 30;
	}

	// "all the rest have 31.."
	if ((month == 1) 
		|| (month == 3) 
		|| (month == 5) 
		|| (month == 7)
		|| (month == 8) 
		|| (month == 10) 
		|| (month == 12)) {
		return 31;
	}

	// "excepting february alone"
	if (month != 2) {
		throw(`logic error in daysInMonth - month should be 2 but it is ${month}`);
	}

	// If anyone's running this code in the year 2100,
	// then the dogs are long dead. And Javascript in 2400? Really?
	// SO not bothering with year % 100 or year % 400
	if (year % 4 == 0) {
		return 29;
	}

	return 28;
}
