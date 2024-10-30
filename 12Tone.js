const selectRandom = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

let pitches = [0,1,2,3,4,5,6,7,8,9,10,11];

// 12! = 479,001,600

const existingTone = function(row, tone) {
	let existingTone = false;
	if ( row.includes(tone) ) {
		existingTone = true;
	}
	return existingTone;
}

const outlinesTonal = function(row, tone) {
	let bool = false;
	let triad = [];
	if ( row.length >= 2 ) {
		triad = row.slice(-2);
		triad.push(tone);
		triad.sort((a,b)=>a-b);
		let span = Math.abs(triad[0] - triad[2]);
		let diff = triad[1] - triad[0];
		//console.log('span: ' + span + ', diff:' + diff + ', tone: ' + tone + ', triad: ' + triad.join(','));
		// major/minor triad and inversions
		if ( span === 7 && ( diff === 3 || diff === 4 ) ) {
			//bool = true;
		}
		if ( span === 8 && ( diff === 3 || diff === 5 ) ) {
			//bool = true;
		}
		if ( span === 9 && ( diff === 4 || diff === 5 ) ) {
			//bool = true;
		}
		// tonal pitches P1, P4, P5 and inversions
		if ( span === 10 && diff === 5 ) {
			//bool = true;
		}
		if ( span === 7 && ( diff === 2 || diff === 5 ) ) {
			//bool = true;
		}
		// implied seventh chords and inversions
		if ( span === 10 && ( diff === 7 || diff === 4 || diff === 3 ) ) {
			//bool = true;
		}
	}
	return bool;
}

// two P4 spans C-F & F♯-B
const mapABC = ['=C','_D','=D','_E','=E','=F','^F','=G','^G','=A','^A','=B'];

const expressABC = function(row) {
	return row.map((n) => mapABC[n]).join(' ');
};

const invertRow = function(row) {
	return row.map((n) => Math.abs(n-11));
}

const buildRow = function() {
	let row = [];
	row.push(selectRandom(pitches))
	let c = 1;
	let next = selectRandom(pitches);
	while ( row.length < 12 || c < 1000 ) {
		if ( ! existingTone(row, next) && ! outlinesTonal(row, next) ) {
			row.push(next);
		} else {
			next = selectRandom(pitches);
		}
		c++;
	}
	return row;
}
