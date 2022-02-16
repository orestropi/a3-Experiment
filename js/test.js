const trialsPerTest = 10

let q = document.getElementById('message');
let input = document.getElementById('INPUT'); 
let submitButton = document.getElementById('SUBMIT');
let errorP = document.getElementById('error');
let actual = null;
let form = document.getElementById('fs-frm');
let qnum = document.getElementById('questionNum');

let values = [];
let testver = 0;
let trial = 0

function getRandomArray(n) {
	let arr = [];
	for (let i = 0; i < n; i++) { 
		arr.push(Math.random());
	}
	return arr;
}

let tests = [
	[() => generatePieChart(), 'What percentage of size is slice one of slice two?<br>(e.g. enter 50 if the smaller slice is half the size of the larger slice)', 'Piechart'],
	[() => generateBoxPlot(), 'What percentage of size is the smaller dotted boxplot of the larger dotted boxplot (including the tails)?<br>(e.g. enter 50 if the smaller boxplot is half the size of the larger boxplot)', 'Boxplot'],
	[() => create_barchart(), 'What percentage of size is the smaller dotted bar of the larger dotted bar?<br>(e.g. enter 50 if the smaller bar is half the size of the larger bar)', 'Barchart'],
]

function stringify(matr) {
	let str = '';
	matr.forEach(row => {
		row.forEach(val => { str += val + "," });
		str += '\n';
	});
	return str;
}


function nextTrial(test, message) {
	document.getElementById('plot').innerHTML = ''; // clear plots in case one is already there
	actual = test();
	q.innerHTML = message;
	qnum.innerHTML = 'Question '+(testver*trialsPerTest+trial+1)+'/'+trialsPerTest*tests.length+''
}

function submit() {
	sendData('test', 1, 'test3', 2, 3);
	if (input.value <= 0 || input.value >= 100) {
		errorP.innerHTML = "Invalid input. Answer must be a decimal between 0 and 1";
		input.value = '';
	} else {
		errorP.innerHTML = '';
		values.push([tests[testver][2], input.value, actual.max, actual.min]);
		document.getElementById('plot').innerHTML = '';
		input.value = '';
		
		if (++trial >= trialsPerTest) { //increment trial count, if above trials per test, increment test count
			trial = 0;
			testver++;
		}
		if (testver >= tests.length) { //if testcount above available tests, finish survey
			input.remove();
			submitButton.remove();
			errorP.remove();
			qnum.innerHTML = 'Test Completed';
			q.innerHTML = 'Please click \"Finish Survey\" to submit.';
			form.style = '';
			document.getElementById('testdata').innerHTML = stringify(values);
		} else {
			nextTrial(tests[testver][0], tests[testver][1]) //next trial
		}
	}
}


function startTest() {
	document.getElementById('START').style = 'display:none';
	document.getElementById('explanation').style = 'display:none';
	document.getElementById('SUBMIT').style = '';
	document.getElementById('INPUT').style = '';
	nextTrial(tests[testver][0], tests[testver][1]);
}

function sendData(participantID, trialN, chartType, actualPercent, enteredPercent) {
	json = { participantID: participantID, trialN: trialN, chartType: chartType, actualPercent: actualPercent, enteredPercent: enteredPercent},
	body = JSON.stringify(json);
fetch('/newData', {
	   method: 'POST',
	   headers: {
			   'Accept': 'application/json, text/plain, */*',
			   'Content-Type': 'application/json'
			 },
	   body: body
	 })
	 .then(res => res) // parse the JSON from the server
	 .then(data => {
	   });
}


function finish() {
	qnum.innerHTML = "Thank you for participating!"
	form.style = 'display:none'
	q.innerHTML = '';
}
