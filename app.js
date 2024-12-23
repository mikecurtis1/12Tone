function load() {
	let row = buildRow();
	let prime = expressABC(row) + "\n";
	let inversion = expressABCInverted(row) + "\n";
	let retrograde = expressABC(row.toReversed()) + "\n";
	let retrogradeinversion = expressABCInverted(row.toReversed()) + "\n";
	let abc = '';
	abc += '%%MIDI program 49' + "\n";
	abc += 'V: 1 clef=treble' + "\n";
	abc += 'M: none' + "\n";	
	abc += 'L:1' + "\n";
	abc += 'K:C' + "\n";
	abc += prime + inversion + retrograde + retrogradeinversion;
	let domain = 'https://editor.drawthedots.com/?t=';
	let url = domain + encodeURIComponent(abc);
	ABCJS.renderAbc("paper", abc);
	divABC.innerHTML = '';
	divABC.insertAdjacentHTML("beforeend", abc);
	drawthedots.href = url;
};
const buildButton = document.getElementById('build');
const divABC = document.getElementById('abc');
const drawthedots = document.getElementById('drawthedots');
buildButton.addEventListener('click', load);