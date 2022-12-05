import './App.css';
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

function App() {
	const alredyUsed = {
		A: {
			press: false,
			status: 'key',
		},
		B: {
			press: false,
			status: 'key',
		},
		C: {
			press: false,
			status: 'key',
		},
		D: {
			press: false,
			status: 'key',
		},
		E: {
			press: false,
			status: 'key',
		},
		F: {
			press: false,
			status: 'key',
		},
		G: {
			press: false,
			status: 'key',
		},
		H: {
			press: false,
			status: 'key',
		},
		I: {
			press: false,
			status: 'key',
		},
		J: {
			press: false,
			status: 'key',
		},
		K: {
			press: false,
			status: 'key',
		},
		L: {
			press: false,
			status: 'key',
		},
		M: {
			press: false,
			status: 'key',
		},
		N: {
			press: false,
			status: 'key',
		},
		Ñ: {
			press: false,
			status: 'key',
		},
		O: {
			press: false,
			status: 'key',
		},
		P: {
			press: false,
			status: 'key',
		},
		Q: {
			press: false,
			status: 'key',
		},
		R: {
			press: false,
			status: 'key',
		},
		S: {
			press: false,
			status: 'key',
		},
		T: {
			press: false,
			status: 'key',
		},
		U: {
			press: false,
			status: 'key',
		},
		V: {
			press: false,
			status: 'key',
		},
		W: {
			press: false,
			status: 'key',
		},
		X: {
			press: false,
			status: 'key',
		},
		Y: {
			press: false,
			status: 'key',
		},
		Z: {
			press: false,
			status: 'key',
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
	const [list, setList] = useState({
		category: '',
		number: 0,
		words: ['mermelada', 'quesadilla', 'departamento', 'ciudad', 'automovil'],
	}); //list of words to play

	/* Steps
		1. Select word
		2. Show instructions
		3. Show initial image (imgpath)
		4. Show button btnStartGame
			4.1 CreateEachKey in allKeyboard

	*/

	let selectedWord = list.words[list.number];

	if (fails >= 6 && !end) {
		//toast.error('¡Has fallado!');
		setEnd(true);
		stopKeyboard();
	}

	if (game && word.indexOf('-') < 0 && !end) {
		//toast.success('¡GANASTE!');
		setEnd(true);
		stopKeyboard();
	}

	const instructions = game
		? 'Adivina la palabra, ' + selectedWord.length + ' letras'
		: 'Adivina la palabra';

	const btnStartGame = !game ? (
		<button
			className="start"
			onClick={() => {
				setUsed(alredyUsed);
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

	//#region functions
	function showLines() {
		let guide = '-'.repeat(list.words[list.number].length);
		setWord(guide);
	}

	const imgPath = 'img/' + fails + '.png';

	//Evals status of game (win or lose)
	function stopKeyboard() {
		let stopKeyboard = used;

		for (let i of alphabet) {
			stopKeyboard[i].press = true;
		}
		setUsed(stopKeyboard);
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

		//eval if the letter is error or success: 0 == no exist
		let res = success > 0;

		//Update useState of used letters to disable buttons
		let newState = {
			...used,
		};

		newState[item].press = true;
		newState[item].status = res > 0 ? 'keyOk' : 'keyError';

		setUsed(newState);

		//add a fail
		if (success <= 0) {
			setFails(fails + 1);
		}
		createNewGuide(result);
	};

	const createEachKey = (item, index) => {
		//pressed buttons
		if (used[item].press === true) {
			return (
				<button className={used[item].status} key={index} disabled>
					{item}
				</button>
			);
		} else {
			//unpressed buttons
			return (
				<button className={used[item].status} key={index} onClick={() => searchCharacter(item)}>
					{item}
				</button>
			);
		}
	};

	const allKeyboard = alphabet.map((item, index) => {
		return createEachKey(item, index);
	});

	function nextWord() {
		let configNextGame = list;
		configNextGame.number++;
		setList(configNextGame);
	}

	function endGame() {
		nextWord();
		setGame(false);
		setFails(0);
		setEnd(false);
	}

	function nextGamefun() {
		nextWord();
		setFails(0);
		setEnd(false);
		setUsed(alredyUsed);
		showLines();
	}

	//#endregion

	return (
		<div className="mainContainer">
			<div>
				<Toaster />
			</div>
			<h1 className="title">Hangman</h1>

			<div className="board">
				<h4 className="instructions">{instructions}</h4>
				<br></br>
				<img className="img" alt="hangman" src={imgPath}></img>
				{game && <p className="hideWord"> {word}</p>}
			</div>

			<div className="btnsPanel">
				{game && <div className="keysSection">{allKeyboard}</div>}
				{btnStartGame}
				{nextGame}
				{btnEndGame}
			</div>
		</div>
	);
}

export default App;
