const squares = document.querySelectorAll('.square');
const colorDisplay = document.getElementById('colorDisplay');
const messageDisplay = document.querySelector('#message');
const h1 = document.querySelector('h1');
const resetButton = document.querySelector('#reset');
let modeButtons = document.querySelectorAll('.mode');

let numSquares = 6;
let colors = [];
let pickedColor;
let pickedRgbValues;

//Tillhörande kod för cirkeldiagrammet i chart.js
let ctx = document.getElementById('pie-chart').getContext('2d');

let pieChart = new Chart(ctx, {
	type: 'pie',
	data: {
		fill: true,
		datasets: [{
			data: [0, 0, 0],
			backgroundColor: ['red', 'green', 'blue'],
			borderColor: 'white',
			borderWidth: 2
		}],
	},
	options: {
		responsive: true,
		tooltips: {
			enabled: false
		}
	}
});

// Kör de nödvändiga funktionerna för att spelet ska gå att spela när sidan laddas
init();

function init() {
	setupModeButtons();
	setupSquares();
	reset();
}

// Svårighetsgraderna
function setupModeButtons() {
	for (let i = 0; i < modeButtons.length; i++) {
		//Lägg till klassen "selected" på den valda svårighetsgraden
		modeButtons[i].addEventListener('click', function () {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			modeButtons[2].classList.remove('selected');
			this.classList.add('selected');
			this.textContent === 'Easy' ? numSquares = 3 : numSquares = 6;
			reset();
		});
	}
}

// Gissa färg knapparna
function setupSquares() {
	for (let i = 0; i < squares.length; i++) {
		//Click listeners på varje fyrkant
		squares[i].addEventListener('click', function () {
			//Hämta bakgrundsfärgen på den klickade fyrkanten
			let clickedColor = this.style.background;
			//Jämnför med den färgen som spelet frågar efter
			if (clickedColor === pickedColor) {
				messageDisplay.textContent = 'Correct!';
				resetButton.textContent = 'Play Again?'
				changeColors(clickedColor);
				h1.style.background = clickedColor;
			} else {
				this.style.background = '#232323';
				messageDisplay.textContent = 'Try Again'
			}
		});
	}
}

function reset() {
	colors = generateRandomColors(numSquares);
	//Välj nya färger
	pickedColor = pickColor();
	//Separera varje värde av rgb strängen
	pickedRgbValues = pickedColor.replace(/[^\d,]/g, '').split(',');
	//Tilldela och uppdatera den nya datan
	pieChart.config.data.datasets[0].data[0] = pickedRgbValues[0];
	pieChart.config.data.datasets[0].data[1] = pickedRgbValues[1];
	pieChart.config.data.datasets[0].data[2] = pickedRgbValues[2];
	pieChart.update();
	//Byt colorDisplay så den matchar Color
	if (modeButtons[2].classList.contains('selected')) {
		colorDisplay.textContent = "RGB";
	}
	else {
		colorDisplay.textContent = pickedColor;
	}
	resetButton.textContent = 'New Colors'
	messageDisplay.textContent = '';
	//Byt färg på alla fyrkanter
	for (let i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = 'block'
			squares[i].style.background = colors[i];
		} else {
			squares[i].style.display = 'none';
		}
	}
	h1.style.background = 'steelblue';
}

resetButton.addEventListener('click', function () {
	reset();
})

function changeColors(color) {
	//Loopa igenom alla fyrkanter
	for (let i = 0; i < squares.length; i++) {
		//Byt färg på varje fyrkant
		squares[i].style.background = color;
	}
}

function pickColor() {
	let random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	let arr = []

	for (let i = 0; i < num; i++) {
		//Hämta slumpmässiga nummer och lägg till i array
		arr.push(randomColor())
	}

	return arr;
}

function randomColor() {
	//Välj en röd färg mellan 0 - 255
	let r = Math.floor(Math.random() * 256);
	//Välj en grön färg mellan 0 - 255
	let g = Math.floor(Math.random() * 256);
	//Välj en blå färg mellan 0 - 255
	let b = Math.floor(Math.random() * 256);

	return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}