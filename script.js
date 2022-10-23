tags = document.querySelector('.tags');
tag = tags.querySelectorAll('.tag');
btn = document.querySelector('button')

const picX = 4;
const picY = 4;
// const pic = [
// 	[{ id: 0, val: 0, con: 'red' }, { id: 1, val: 1, con: 'gray' }, { id: 2, val: 1, con: 'gray' }, { id: 3, val: 1, con: 'gray' }],
// 	[{ id: 4, val: 1, con: 'gray' }, { id: 5, val: 1, con: 'gray' }, { id: 6, val: 1, con: 'gray' }, { id: 7, val: 1, con: 'gray' }],
// 	[{ id: 8, val: 1, con: 'gray' }, { id: 9, val: 1, con: 'gray' }, { id: 10, val: 1, con: 'gray' }, { id: 11, val: 1, con: 'gray' }],
// 	[{ id: 12, val: 1, con: 'gray' }, { id: 13, val: 1, con: 'gray' }, { id: 14, val: 1, con: 'gray' }, { id: 15, val: 1, con: 'gray' }],
// ];
// const pic = [
// 	[{ id: 0, val: 0, con: 'white' }, { id: 1, val: 1, con: 2 }, { id: 2, val: 1, con: 3 }, { id: 3, val: 1, con: 4 }],
// 	[{ id: 4, val: 1, con: 2 }, { id: 5, val: 1, con: 3 }, { id: 6, val: 1, con: 4 }, { id: 7, val: 1, con: 1 }],
// 	[{ id: 8, val: 1, con: 3 }, { id: 9, val: 1, con: 4 }, { id: 10, val: 1, con: 1 }, { id: 11, val: 1, con: 2 }],
// 	[{ id: 12, val: 1, con: 4 }, { id: 13, val: 1, con: 1 }, { id: 14, val: 1, con: 2 }, { id: 15, val: 1, con: 3 }],
// ];

// const arr = [];
// function generator() {
// 	var i = 0,
// 		count = 15,
// 		diff,
// 		curr,
// 		limits = [1, 15];

// 	diff = limits[1] - limits[0];
// 	while (i++ < count && (diff >= (count - 1))) {// В случае, если количество чисел на выходе превышает максимальное количество уникальных
// 		do {
// 			curr = Math.floor(Math.random() * (diff + 1) + limits[0]);
// 		} while ((arr.indexOf(curr) != -1));
// 		arr.push(curr);
// 	}
// 	console.log(arr);
// }
// generator();

var arr = new Array;
function generator() {
	var rsh = 1;
	while (rsh % 2) {
		for (var j = 0; j < 15; j++) arr[j] = j + 1;
		arr.sort(new Function('x', 'y', 'return Math.random () - Math.random ()'));
		for (var rsh = j = 0; j < 14; rsh += s, j++)
			for (var s = 0, k = j + 1; k < 15; k++) if (arr[k] < arr[j]) s++;
	}

	console.log(arr);
}
generator();

var pic = new Array;
function create() {
	tag.forEach((element, index) => {
		let ox = index % picX;
		let oy = Math.floor(index / picY);
		// console.log('index:', index, 'ox:', ox, 'oy:', oy);


		let obj = {}
		obj.id = index;
		if (ox == 3 && oy == 3) {
			obj.val = 0;
			obj.con = 'white';
			element.dataset.num = '';
		} else {
			obj.val = 1;
			//obj.con = Math.floor(Math.random() * (4) + 1);
			obj.con = arr[index];
			//element.innerHTML = '<span>' + arr[index - 1] + '</span>'
			element.dataset.num = arr[index];
		}
		pic.push(obj);
	});

	// console.log(pic);
}
create();

function update() {
	tag.forEach((element, index) => {
		let urlimg = 'url(./img/' + pic[index].con + '.png) no-repeat center/100%';

		element.style.background = urlimg;
	});
}
update();

function deletePic() {
	tag.forEach((element, index) => {
		pic.pop();
	});

	// console.log(pic);
}

function swap(e, newVal, oldVal) {
	// console.log('swap');

	let swp = pic[newVal].val;
	pic[newVal].val = pic[oldVal].val;
	pic[oldVal].val = swp;

	swp = pic[newVal].con;
	pic[newVal].con = pic[oldVal].con;
	pic[oldVal].con = swp;
	tag[pic[newVal].id].style.background = 'url(./img/' + pic[newVal].con + '.png) no-repeat center/100%';
	tag[pic[oldVal].id].style.background = 'url(./img/' + pic[oldVal].con + '.png) no-repeat center/100%';

	swp = tag[newVal].dataset.num;
	tag[newVal].dataset.num = tag[oldVal].dataset.num;
	tag[oldVal].dataset.num = swp;
}

function bgChange(e) {

	if (e.target.classList.contains('tag')) {
		let ox = e.target.id % picX;
		let oy = Math.floor(e.target.id / picY);

		// console.log('нажата:', ox, 'x', oy)

		if ((ox - 1) >= 0) {
			let newVal = oy * picY + ox - 1;
			// console.log((ox - 1), 'x', oy, ':', pic[newVal].val)
			if (pic[newVal].val == 0) {
				swap(e, newVal, e.target.id);
			}
		}

		if ((ox + 1) / picX < 1) {
			// console.log((ox + 1), 'x', oy, ':', pic[newVal].val)
			let newVal = oy * picY + ox + 1;
			if (pic[newVal].val == 0) {
				swap(e, newVal, e.target.id);
			}
		}

		if ((oy - 1) >= 0) {
			// console.log(ox, 'x', (oy - 1), ':', pic[newVal].val)
			let newVal = (oy - 1) * picY + ox;
			if (pic[newVal].val == 0) {
				swap(e, newVal, e.target.id);
			}
		}

		if ((oy + 1) / picY < 1) {
			// console.log(ox, 'x', (oy + 1), ':', pic[newVal].val)
			let newVal = (oy + 1) * picY + ox;
			if (pic[newVal].val == 0) {
				swap(e, newVal, e.target.id);
			}
		}

	};
};

tags.addEventListener('click', bgChange);
btn.addEventListener('click', () => {
	generator();
	deletePic();
	create();
	update();
});
