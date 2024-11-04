const selectRandom = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

let pitches = [0,1,2,3,4,5,6,7,8,9,10,11];

// 12! = 479,001,600 combinations not accounting for certain duplicates

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

// ascending m2 M2 m3 M3 P4 A4 P5 m6 M6 m7 M7
//const mapABC = ['=C','_D','=D','_E','=E','=F','^F','=G','_A','=A','_B','=B'];
// descending m2 M2 m3 M6 P4 A4 P5 m6 M6 m7 M7
//const mapABCInverted = ['=c','=B','_B','=A','_A','=G','_G','=F','=E','_E','=D','_D'];

// C5 centered
// ascending G4 to F♯5
const mapABC = ['=G','_A','=A','_B','=B','=c','_d','=d','_e','=e','=f','^f'];
// descending F5 to G♭4
const mapABCInverted = ['=f','=e','_e','=d','_d','=c','=B','_B','=A','_A','=G','_G'];


const expressABCInverted = function(row) {
	return row.map((n) => mapABCInverted[n]).join(' ');
};

const expressABC = function(row) {
	return row.map((n) => mapABC[n]).join(' ');
};

const invertRow = function(row) {
	return row.map((n) => Math.abs(n-11));
}

const buildRow = function() {
	let row = [];
	//row.push(selectRandom(pitches));
	//row.push(0)
	row.push(5)
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
