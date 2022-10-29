tags = document.querySelector('.tags');
tag = tags.querySelectorAll('.tag');

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

const test = [
	[{ id: 0, name: "Ben", age: 1 }, { id: 1, name: "Den", age: 2 }]
]

function create() {
	//const pic = [[{ id, val, con }]];
	const pic = [[]];
	tag.forEach((element, index) => {
		let ox = Math.floor(index / picX);
		let oy = index % picY;

		let obj = {}
		obj.id = index;
		if (ox == 0 && oy == 0) {
			obj.val = 0;
			obj.con = 'white';
		} else {
			obj.val = 1;
			obj.con = Math.floor(Math.random() * (4 + 1));
		}
		pic.push(obj);
	});
}
create();

function update() {
	tag.forEach((element, index) => {
		let ox = Math.floor(index / picX);
		let oy = index % picY;

		// element.style.backgroundColor = pic[ox][oy].con;
		let urlimg = 'url(./img/' + pic[ox][oy].con + '.png) center';

		element.style.background = urlimg;
	});
}
update();

function swap(oxo, oyo, ox, oy) {
	// console.log('swap');

	let swp = pic[oxo][oyo].val;
	pic[oxo][oyo].val = pic[ox][oy].val;
	pic[ox][oy].val = swp;

	let swpcon = pic[oxo][oyo].con;
	pic[oxo][oyo].con = pic[ox][oy].con;
	pic[ox][oy].con = swpcon;
	// console.log(tag[pic[oxo][oyo].id]);
	// tag[pic[oxo][oyo].id].style.backgroundColor = pic[oxo][oyo].con;
	// tag[pic[ox][oy].id].style.backgroundColor = pic[ox][oy].con;
	tag[pic[oxo][oyo].id].style.background = 'url(./img/' + pic[oxo][oyo].con + '.png) center';
	tag[pic[ox][oy].id].style.background = 'url(./img/' + pic[ox][oy].con + '.png) center';
}

function bgChange(e) {
	// console.log('123: ', e.target.className);
	// console.log('321: ', tag[0]);
	// console.log(e);

	if (e.target.classList.contains('tag')) {
		//console.log(pic[Math.floor(e.target.id / 4)][e.target.id % 4].id, '=', e.target.id);

		let ox = Math.floor(e.target.id / picX);
		let oy = e.target.id % picY;

		// console.log('нажата:', ox, 'x', oy)

		if ((ox - 1) >= 0) {
			// console.log((ox - 1), 'x', oy, ':', pic[ox - 1][oy].val)
			if (pic[ox - 1][oy].val == 0) {
				swap(ox, oy, ox - 1, oy);
			}
		}

		if ((ox + 1) / picX < 1) {
			// console.log((ox + 1), 'x', oy, ':', pic[ox + 1][oy].val)
			if (pic[ox + 1][oy].val == 0) {
				swap(ox, oy, ox + 1, oy);
			}
		}

		if ((oy - 1) >= 0) {
			// console.log(ox, 'x', (oy - 1), ':', pic[ox][oy - 1].val)
			if (pic[ox][oy - 1].val == 0) {
				swap(ox, oy, ox, oy - 1);
			}
		}

		if ((oy + 1) / picY < 1) {
			// console.log(ox, 'x', (oy + 1), ':', pic[ox][oy + 1].val)
			if (pic[ox][oy + 1].val == 0) {
				swap(ox, oy, ox, oy + 1);
			}
		}

	};

	//console.log(e.target.id % 16);
	//if e.target.id % 4


	tag.forEach((element, index) => {
		// console.log(element, index);
		if (e.target == element) {
			//console.log(index);
		};
	});
};

tags.addEventListener('click', bgChange);
