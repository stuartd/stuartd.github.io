// https://stackoverflow.com/a/26417914/43846
function calculate(today, birthDate, name) {

	// Make things easier by getting the actual month
	var birthMonth = birthDate.getMonth() + 1;
	var birthYear = birthDate.getFullYear();
	var birthDay = birthDate.getDate();

	var currentYear = today.getFullYear();
	var currentMonth = today.getMonth() + 1;
	var currentDay = today.getDate();

	var rawWeeks = ((today - birthDate) / 604800000);
	var weeks = rawWeeks.toFixed(0);
	
	// TODO - 1) actually write down the algorithm for this
	// Decide whether to use the raw value for month, or the 'correct' value
	// 2) Create a daysInMonth(month) function
	// 3) Calculate weeks and days ("30 weeks and 6 days")
	// 4) Fix the names. Ugh.

	if ((currentMonth == 1) || (currentMonth == 3) || (currentMonth == 5) || (currentMonth == 7)
		|| (currentMonth == 8) || (currentMonth == 10) || (currentMonth == 12)) {
		var daysInCurrentMonth = 31;
	}

	if ((currentMonth == 4) || (currentMonth == 6) || (currentMonth == 9) || (currentMonth == 11)) {
		var daysInCurrentMonth = 30;
	}

	if (currentMonth == 2 && ((currentYear % 4 == 0) && (currentYear % 100 != 0)) || (currentYear % 400 == 0)) {
		var daysInCurrentMonth = 29;
	}

	if (currentMonth == 2 && ((currentYear % 4 != 0) || (currentYear % 100 == 0))) {
		var daysInCurrentMonth = 28;
	}

	if ((birthMonth == 1) || (birthMonth == 3) || (birthMonth == 5) || (birthMonth == 7) || (birthMonth == 8) || (birthMonth == 10) || (birthMonth == 12)) {
		var daysInBirthMonth = 31;
	}

	if ((birthMonth == 4) || (birthMonth == 6) || (birthMonth == 9) || (birthMonth == 11)) {
		var daysInBirthMonth = 30;
	}

	if (birthMonth == 2 && ((birthYear % 4 == 0) && (birthYear % 100 != 0)) || (birthYear % 400 == 0)) {
		var daysInBirthMonth = 29;
	}

	if (birthMonth == 2 && ((birthYear % 4 != 0) || (birthYear % 100 == 0))) {
		var daysInBirthMonth = 28;
	}

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
		yearText = "one year "
	} else if (yearDiff > 1) {
		yearText = yearDiff + " years "
	}

	var monthText;
	if (monthDiff == 0) {
		monthText = " "
	}
	else if (monthDiff == 1) {
		monthText = "one month "
	} else if (monthDiff > 1) {
		monthText = monthDiff + " months "
	}

	var dayText;
	if (daysDiff == 0) {
		dayText = " "
	}
	if (daysDiff == 1) {
		dayText = "one day "
	} else if (daysDiff > 1) {
		dayText = daysDiff + " days "
	}

	let resultText = getResultText(daysDiff, monthDiff, yearDiff, dayText, monthText, yearText);
	let weeksText = weeks < 52 ? weeks + " weeks" : null;

	var result = `${name} is ${resultText} old (${weeksText})`

	return result;
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

	return `${yearText}, ${monthText} and ${monthText}`

}