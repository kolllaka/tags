document.body.insertAdjacentHTML('afterbegin', '<div class="change_theme">change theme</div>');

let btnChangeTheme = document.querySelector('.change_theme');

if (btnChangeTheme) {
	btnChangeTheme.addEventListener('click', () => {
		let wasDarkMode = localStorage.getItem('dark') == 'true';

		localStorage.setItem('dark', !wasDarkMode)
		btnChangeTheme.classList.toggle('dark', !wasDarkMode);
		document.body.classList.toggle('dark', !wasDarkMode);
	});
}

document.addEventListener('DOMContentLoaded', () => {
	document.body.classList.toggle('dark', localStorage.getItem('dark') == 'true')
});