const picCountX = 4,
	picCountY = 4;
let tagBody = document.querySelector('.tag__body'),
	tagWin = document.querySelector('.tag__win'),
	btnNewGame = document.querySelector('.ui-tag__btn'),
	btnVol = document.querySelector('.ui-tag__vol');

const audioWinEl = new Audio('./audio/are-ya-winning-son.mp3');

var hole = {};

// let arr = new Array(),
let count = picCountX * picCountY;

let volume = true;

arr = generatorTags(count);

console.log(arr);

let Cell = new Array;
arr.forEach((el, id) => {
	Cell[id] = fillCell(id);
});
console.log(Cell[1]);


// Генерируем пустые ячейки
function generateField(length) {
	for (let index = 0; index < length; index++) {
		let field = document.createElement('canvas');
		field.id = index;
		field.className = 'tag__canvas';
		tagBody.appendChild(field);
	}
}
generateField(16)


// Генерирует случайный Array() пятнашек из count + 1 значений; 
// "дырка" имеет номер count и значение count - 1
function generatorTags(count) {
	var rsh = 1,
		arr = new Array();


	while (rsh % 2) {
		for (var j = 0; j < (count - 1); j++) arr[j] = j;
		arr.sort(new Function('x', 'y', 'return Math.random () - Math.random ()'));
		for (var rsh = j = 0; j < (count - 2); rsh += s, j++)
			for (var s = 0, k = j + 1; k < (count - 1); k++) if (arr[k] < arr[j]) s++;
	}

	arr[count - 1] = count - 1;

	return arr;
}

// Создаёт объект значений пятнашек по id
function fillCell(id) {
	let ox = id % picCountX,
		oy = Math.floor(id / picCountY),
		cell = {};

	cell = {
		id: id,
		ox: ox,
		oy: oy,
		val: arr[id],
		isTruePlace: id == arr[id],
		isHole: arr[id] == picCountX * picCountY - 1,
	}

	if (cell.isHole) {
		hole = cell;
	}

	return cell
}



//const imageURL = './img/confused.png';
let imageURL = rndIMG();
let inputImage = new Image();
tagWin.querySelector('img').src = imageURL;
inputImage.onload = function () {
	arr.forEach((el, id) => {
		//console.log(id, '>', el);

		// let ox = el % 4;
		// let oy = Math.floor(el / 4);

		drawImg(id)
	})
};
inputImage.src = imageURL;

// let outputImage = document.createElement('canvas');
// Отрисовывает пазл по заданному id
function drawImg(id) {
	let cellObj = fillCell(arr[id])
	let canvas = document.getElementById(id);
	let ctx = canvas.getContext('2d');

	canvas.width = inputImage.naturalWidth / 4;
	canvas.height = inputImage.naturalWidth / 4;

	if (id == hole.id) {
		ctx.fillStyle = 'white';
		ctx.fillRect(0, 0, canvas.width, canvas.height)

		return
	}


	// console.log(ox, 'x', oy);

	ctx.drawImage(inputImage, canvas.width * (-1) * cellObj.ox, (-1) * canvas.height * cellObj.oy);
	// ctx.drawImage(inputImage, 0, 0);
	// ctx.drawImage(this, 0, 0, this.width, this.height);
	ctx.font = "5em Verdana";
	ctx.fillStyle = "#863a8d";
	ctx.fillText(arr[id] + 1, 10, 60);
}

function deletePic() {
	arr.forEach((element, id) => {
		let canvas = document.getElementById(id);
		canvas.remove();
	});
}


// Поменять элементы местами
function swap(newVal, oldVal) {
	[arr[oldVal], arr[newVal]] = [arr[newVal], arr[oldVal]];
	hole = Cell[newVal];

	window.update = function () {
		drawImg(newVal);
		drawImg(oldVal);
	}
}

// Проверка на победу
function check() {
	let finish = true;

	arr.forEach((el, id) => {
		let cellObj = fillCell(id);

		finish = finish && cellObj.isTruePlace;
	});

	return finish
}


function idfromCoor(ox, oy) {
	return id = oy * picCountY + ox;
}

tagBody.addEventListener('click', (e) => {

	if (once) {
		clearInterval(interval);
		interval = setInterval(startTimer, 1000);
		once = false;
	}

	if (volume) {
		btnVol.querySelector('audio').play();
	}

	if (e.target.classList.contains('tag__canvas')) {
		pushId = e.target.id;
		cellPush = Cell[pushId];
		console.log("нажата", pushId);

		if (cellPush.ox == hole.ox) {
			if (cellPush.oy < hole.oy) {
				while (cellPush.oy < hole.oy) {
					// console.log("swap", cellPush.ox, 'x', (hole.oy - 1));
					swap(idfromCoor(cellPush.ox, (hole.oy - 1)), hole.id);
					update();
				};
			};

			if (cellPush.oy > hole.oy) {
				while (cellPush.oy > hole.oy) {
					// console.log("swap", cellPush.ox, 'x', (hole.oy + 1));
					swap(idfromCoor(cellPush.ox, (hole.oy + 1)), hole.id);
					update();
				};
			};
		}


		if (cellPush.oy == hole.oy) {
			// console.log("поменять по оси x");

			if (cellPush.ox < hole.ox) {
				while (cellPush.ox < hole.ox) {
					// console.log("swap", (hole.ox - 1), 'x', cellPush.oy);
					swap(idfromCoor((hole.ox - 1), cellPush.oy), hole.id);
					update();
				};
			};

			if (cellPush.ox > hole.ox) {
				while (cellPush.ox > hole.ox) {
					// console.log("swap", (hole.ox + 1), 'x', cellPush.oy);
					swap(idfromCoor((hole.ox + 1), cellPush.oy), hole.id);
					update();
				};
			};
		}

		// swap(e.target.id - 1, e.target.id)
		//console.log(arr);


	}

	if (check()) {
		console.log('Победа');

		tagBody.style.display = 'none';
		tagWin.style.display = 'block';

		clearInterval(interval);

		if (volume) {
			audioWinEl.play();
		}
	}
});

btnVol.addEventListener('click', () => {
	btnVol.querySelector('.volume').classList.toggle("novolume");
	volume = !volume;
});

btnNewGame.addEventListener('click', () => {
	tagBody.style.display = '';
	tagWin.style.display = '';

	clearInterval(interval);
	clearFields();
	once = true;

	deletePic();
	generateField(16);

	arr = generatorTags(count);
	console.log(arr);
	imageURL = rndIMG();
	console.log(inputImage);
	tagWin.querySelector('img').src = imageURL;
	inputImage.onload = function () {
		arr.forEach((el, id) => {
			drawImg(id)
		})
	};
	inputImage.src = imageURL;

	let Cell = new Array;
	arr.forEach((el, id) => {
		Cell[id] = fillCell(id);
	});
});

function rndIMG() {
	imgArr = ["123", "confused", "zoi"];

	let rnd = Math.floor(Math.random() * imgArr.length);
	return './img/' + imgArr[rnd] + '.png';
}