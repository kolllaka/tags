document.body.insertAdjacentHTML('afterbegin', '<div class="change_theme">change theme</div>');

let btnChangeTheme = document.querySelector('.change_theme');

if (btnChangeTheme) {
	btnChangeTheme.addEventListener('click', () => {
		btnChangeTheme.classList.toggle('dark');
		document.body.classList.toggle('dark');
	});
}