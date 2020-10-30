// https://stackoverflow.com/a/26417914/43846
function calculate(today, birthDate, name) {

	var bMonth = birthDate.getMonth() + 1;
	var bYear = birthDate.getFullYear();
	var bDay = birthDate.getDate() + 1;

	var eYear = today.getFullYear();
	var eMonth = today.getMonth() + 1;
	var eDay = today.getDate() + 1;

	debugger;

	var weeks = ((today - birthDate) / 604800000).toFixed(0);
	
	if ((eMonth == 0) || (eMonth == 2) || (eMonth == 4) || (eMonth == 6)
		|| (eMonth == 7) || (eMonth == 9) || (eMonth == 11)) {
		var eDays = 31;
	}

	if ((eMonth == 3) || (eMonth == 5) || (eMonth == 8) || (eMonth == 10)) {
		var eDays = 30;
	}

	if (eMonth == 1 && ((eYear % 4 == 0) && (eYear % 100 != 0)) || (eYear % 400 == 0)) {
		var eDays = 29;
	}

	if (eMonth == 1 && ((eYear % 4 != 0) || (eYear % 100 == 0))) {
		var eDays = 28;
	}

	if ((bMonth == 0) || (bMonth == 2) || (bMonth == 4) || (bMonth == 6) || (bMonth == 7) || (bMonth == 9) || (bMonth == 11)) {
		var bDays = 31;
	}

	if ((bMonth == 3) || (bMonth == 5) || (bMonth == 8) || (bMonth == 10)) {
		var bDays = 30;
	}

	if (bMonth == 1 && ((bYear % 4 == 0) && (bYear % 100 != 0)) || (bYear % 400 == 0)) {
		var bDays = 29;
	}

	if (bMonth == 1 && ((bYear % 4 != 0) || (bYear % 100 == 0))) {
		var bDays = 28;
	}

	var FirstMonthDiff = bDays - bDay + 1;

	if (eDay - bDay < 0) {

		eMonth = eMonth - 1;
		eDay = eDay + eDays;

	}

	var daysDiff = eDay - bDay;

	if (eMonth - bMonth < 0) {
		eYear = eYear - 1;
		eMonth = eMonth + 12;
	}

	var monthDiff = eMonth - bMonth;

	var yearDiff = eYear - bYear;

	if (daysDiff == eDays) {
		daysDiff = 0;
		monthDiff = monthDiff + 1;

		if (monthDiff == 12) {
			monthDiff = 0;
			yearDiff = yearDiff + 1;
		}

	}

	if ((FirstMonthDiff != bDays) && (eDay - 1 == eDays)) {
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