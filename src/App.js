import './App.css';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
	const alredyUsed = {
		A: {
			press: false,
			inWord: null,
		},
		B: {
			press: false,
			inWord: null,
		},
		C: {
			press: false,
			inWord: null,
		},
		D: {
			press: false,
			inWord: null,
		},
		E: {
			press: false,
			inWord: null,
		},
		F: {
			press: false,
			inWord: null,
		},
		G: {
			press: false,
			inWord: null,
		},
		H: {
			press: false,
			inWord: null,
		},
		I: {
			press: false,
			inWord: null,
		},
		J: {
			press: false,
			inWord: null,
		},
		K: {
			press: false,
			inWord: null,
		},
		L: {
			press: false,
			inWord: null,
		},
		M: {
			press: false,
			inWord: null,
		},
		N: {
			press: false,
			inWord: null,
		},
		Ñ: {
			press: false,
			inWord: null,
		},
		O: {
			press: false,
			inWord: null,
		},
		P: {
			press: false,
			inWord: null,
		},
		Q: {
			press: false,
			inWord: null,
		},
		R: {
			press: false,
			inWord: null,
		},
		S: {
			press: false,
			inWord: null,
		},
		T: {
			press: false,
			inWord: null,
		},
		U: {
			press: false,
			inWord: null,
		},
		V: {
			press: false,
			inWord: null,
		},
		W: {
			press: false,
			inWord: null,
		},
		X: {
			press: false,
			inWord: null,
		},
		Y: {
			press: false,
			inWord: null,
		},
		Z: {
			press: false,
			inWord: null,
		},
	};

	const alphabet = [
		'Q',
		'W',
		'E',
		'R',
		'T',
		'Y',
		'U',
		'I',
		'O',
		'P',
		'NL',
		'A',
		'S',
		'D',
		'F',
		'G',
		'H',
		'J',
		'K',
		'L',
		'Ñ',
		'NL',
		'Z',
		'X',
		'C',
		'V',
		'B',
		'N',
		'M',
	];

	const [game, setGame] = useState(false); //Is game active?
	const [word, setWord] = useState(''); // Word guide
	const [used, setUsed] = useState(alredyUsed);
	const [fails, setFails] = useState(0); //Fails
	const [end, setEnd] = useState(false); //end of the game (by win or lose)

	console.log('fallas: ' + fails)

	let selectedWord = 'Mermelada';


	if (fails > 5 && !end) {
		toast.error('¡Has fallado!');
		setEnd(true);
		stopKeyboard();
	}

	if (game && word.indexOf('-') < 0 && !end) {
		toast.success('¡GANASTE!');
		setEnd(true);
		stopKeyboard();
	}





	//#region conditional rendering
	const instr = game
		? 'Adivina la palabra, ' + selectedWord.length + ' letras'
		: 'Adivina la palabra';

	const success = (index, item) => (
		<button className="keyOk" key={index} disabled>
			{item}
		</button>
	);

	const error = (index, item) => (
		<button className="keyError" key={index} disabled>
			{item}
		</button>
	);

	const btnStartGame = !game ? (
		<button
			className="start"
			onClick={() => {
				setGame(true);
				showLines();
			}}
		>
			Iniciar Juego
		</button>
	) : null;

	const nextGame =
		game && end ? (
			<button
				className="start"
				onClick={() => {
					nextGamefun();
					console.log('pizza');
				}}
			>
				Siguiente palabra
			</button>
		) : null;

	const btnEndGame = game ? (
		<button
			className="end"
			onClick={() => {
				endGame();
			}}
		>
			Terminar Juego
		</button>
	) : null;

	//#endregion

	//#region functions
	function showLines() {
		let guide = '-'.repeat(selectedWord.length);
		setWord(guide);
	}

const imgPath = 'img/' + fails + '.png'


	//Evals status of game (win or lose)
function stopKeyboard(){
	let stopKeyboard = used;

	for(let i of alphabet){
		if(i !== 'NL'){
			stopKeyboard[i].press = true;
		}
	}

	setUsed(stopKeyboard)

	//console.log(stopKeyboard)
	//setUsed(stopKeyboard)
}


	function createNewGuide(newLetter) {
		//Checks the diference bettweem the guide and the string with the new letter
		let newGuide = '';

		for (let i = 0; i < word.length; i++) {
			if (word[i] !== '-') {
				newGuide += word[i];
			} else if (newLetter[i] !== '-') {
				newGuide += newLetter[i];
			} else {
				newGuide += '-';
			}
		}
		setWord(newGuide);
	}

	const searchCharacter = (item) => {
		let result = '';
		let success = 0;

		for (let i = 0; i < selectedWord.length; i++) {
			//when the letter exist in the word
			if (selectedWord[i].toUpperCase() === item) {
				result += selectedWord[i];
				success++;
			} else {
				//If the letter doesn't exist
				result += '-';
			}
		}

		//eval if the letter is error or success
		let res = success > 0;

		//Update useState of used letters to disable buttons
		let newState = {
			...used,
		};

		newState[item].press = true;
		newState[item].inWord = res;

		setUsed(newState);
		
		//add a fail
		if (success <= 0){
			setFails(fails + 1);
		}
		createNewGuide(result);
	};

	const createKeyboard = (item, index) => {
		if (item !== 'NL') {
			//Disabled?
			if (used[item].press === true) {
				// Color of buttons in case of success or error
				if (used[item].inWord) {
					return success(index, item);
				} else {
					return error(index, item);
				}
			} else {
				//Enabled
				return (
					<button className="key" key={index} onClick={() => searchCharacter(item)}>
						{item}
					</button>
				);
			}
		} else {
			return <br key={index}></br>;
		}
	};

	const allKeyboard = alphabet.map((item, index) => {
		return createKeyboard(item, index);
	});

	function endGame() {
		setGame(false);
		setFails(0);
		setUsed(alredyUsed);
	}

	function nextGamefun() {
		setFails(0);
		setUsed(alredyUsed);
		setEnd(false);
	}

	//#endregion

	return (
		<div className="mainContainer">
			<div>
				<Toaster />
			</div>
			<h1 className="title">Hangman</h1>

			<div className="board">
				<h4 className="instructions">{instr}</h4>
				<br></br>
				<img className="img" alt="hangman" src={imgPath}></img>
				{game && <p className="hideWord"> {word}</p>}
			</div>

			<div className="btnsPanel">
				{game && <div className="keySection">{allKeyboard}</div>}
				{btnStartGame}
				{nextGame}
				{btnEndGame}
			</div>
		</div>
	);
}

export default App;
