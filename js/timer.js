const timerEl = document.querySelector('.ui__timer'),
	startBtn = document.querySelector('.start');

let minute = 00,
	second = 00,
	minuteInner,
	secondInner;

// Listeners
// startBtn.addEventListener('click', () => {
// 	clearInterval(interval);
// 	interval = setInterval(startTimer, 1000);
// });

// function startTime(interval) {
// }

function startTimer() {
	second++;

	// Seconds
	if (second < 10) {
		secondInner = '0' + second;
	}
	if (second >= 10) {
		secondInner = second;
	}
	if (second > 59) {
		minute++;
		minuteInner = '0' + minute;
		second = 0;
		secondInner = '0' + second;
	}

	// Minutes
	if (minute < 10) {
		minuteInner = '0' + minute;
	}
	if (minute >= 10) {
		minuteInner = minute;
	}
	if (minute > 59) {
		minute = 0;
		minuteInner = '0' + minute;
	}

	timerEl.innerHTML = minuteInner + ':' + secondInner
}

function clearFields() {
	minute = 00;
	second = 00;
	timerEl.innerHTML = '00:00';
}