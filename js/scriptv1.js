const bg = document.querySelector('.tags__bg'),
	tags = document.querySelector('.tags__body'),
	tag = tags.querySelectorAll('.tags__item'),
	btnNewGame = document.querySelector('.btn-newgame'),
	btnVol = document.querySelector('.volume'),
	audioEl = btnVol.querySelector('audio');

import soundWin from '../audio/are-ya-winning-son.mp3'

const picX = 4;
const picY = 4;
var hole;

var arr = new Array;
function generator() {
	var rsh = 1;
	var max = picX * picY - 1
	arr = new Array;

	while (rsh % 2) {
		for (var j = 0; j < max; j++) arr[j] = j + 1;
		arr.sort(new Function('x', 'y', 'return Math.random () - Math.random ()'));
		for (var rsh = j = 0; j < max - 1; rsh += s, j++)
			for (var s = 0, k = j + 1; k < max; k++) if (arr[k] < arr[j]) s++;
	}

	arr[picX * picY - 1] = 0;

	console.log(arr);
}
generator();

function cell(id) {
	let ox = id % picX;
	let oy = Math.floor(id / picY);
	let cell = {}

	cell = {
		id: id,
		ox: ox,
		oy: oy,
		val: arr[id],
		isTruePlace: id + 1 == arr[id],
		isHole: arr[id] == 0,
	}

	if (cell.isHole) {
		hole = cell;
	}

	return cell;
}
// arr.forEach((element, index) => {
// 	let cellVak = JSON.parse(JSON.stringify(cell(index)));

// 	if (element != 0) {
// 		console.log(index, ':', cellVak);
// 	} else {
// 		console.log('пустая ячейка:', cellVak);
// 	}
// });

var pic = new Array;
function create() {
	tag.forEach((element, index) => {
		cellObj = cell(index);
		// console.log(cellObj.isHole);

		if (cellObj.isHole) {
			let urlimg = 'url(./img/white.png) no-repeat center/100%';

			element.style.background = urlimg;
			element.dataset.num = '';
		} else {
			let urlimg = 'url(./img/' + cellObj.val + '.png) no-repeat center/100%';
			// console.log(urlimg);

			element.style.background = urlimg;
			element.dataset.num = arr[index];
		}
	});

	// console.log(pic);
}
create();

function deletePic() {
	tag.forEach((element, index) => {
		pic.pop();
	});

	// console.log(pic);
}

function swap(newVal, oldVal) {
	[arr[oldVal], arr[newVal]] = [arr[newVal], arr[oldVal]];
	hole = cell(newVal);
}

function idfromCoor(ox, oy) {
	return id = oy * picY + ox;
}

function bgChange(e) {

	if (e.target.classList.contains('tags__item')) {
		let cellPush = cell(e.target.id);
		// console.log(e.target.id, "=", idfromCoor(cellPush.ox, cellPush.oy));
		// console.log('нажата:', cellPush.ox, 'x', cellPush.oy);
		// console.log('дырка:', hole.ox, 'x', hole.oy);

		if (cellPush.ox == hole.ox) {
			if (cellPush.oy < hole.oy) {
				while (cellPush.oy < hole.oy) {
					// console.log("swap", cellPush.ox, 'x', (hole.oy - 1));
					swap(idfromCoor(cellPush.ox, (hole.oy - 1)), hole.id);
					create();
				};
			};

			if (cellPush.oy > hole.oy) {
				while (cellPush.oy > hole.oy) {
					// console.log("swap", cellPush.ox, 'x', (hole.oy + 1));
					swap(idfromCoor(cellPush.ox, (hole.oy + 1)), hole.id);
					create();
				};
			};
		}

		if (cellPush.oy == hole.oy) {
			// console.log("поменять по оси x");

			if (cellPush.ox < hole.ox) {
				while (cellPush.ox < hole.ox) {
					// console.log("swap", (hole.ox - 1), 'x', cellPush.oy);
					swap(idfromCoor((hole.ox - 1), cellPush.oy), hole.id);
					create();
				};
			};

			if (cellPush.ox > hole.ox) {
				while (cellPush.ox > hole.ox) {
					// console.log("swap", (hole.ox + 1), 'x', cellPush.oy);
					swap(idfromCoor((hole.ox + 1), cellPush.oy), hole.id);
					create();
				};
			};
		}

	};

	// check();
};

function check() {
	finish = true;

	tag.forEach((element, index) => {
		cellObj = cell(index);
		//console.log(cellObj);


		//console.log(cellObj.isTruePlace);
		if (!cellObj.isHole) {
			finish = finish && cellObj.isTruePlace;
			//console.log(finish);
		}
	});

	if (finish) {
		console.log('Победа!');
		// alert('Победа!');
		tags.style.display = "none";
		bg.style.display = "block";

		clearInterval(interval);


		const audioWinEl = new Audio(soundWin);
		audioWinEl.play();
	}
}

let once = true,
	interval,
	volume = true;

btnVol.addEventListener('click', () => {
	btnVol.classList.toggle("novolume");
	volume = !volume;
});

tags.addEventListener('click', (e) => {
	if (once) {
		clearInterval(interval);
		interval = setInterval(startTimer, 1000);
		once = false;
	}

	if (volume) {
		audioEl.play();
	}

	bgChange(e);
	check();
});

btnNewGame.addEventListener('click', () => {
	tags.style.display = '';
	bg.style.display = "";

	clearInterval(interval);
	clearFields();
	once = true;

	generator();
	deletePic();
	create();
});
