import React from "react";
import GuessInput from "../GuessInput/GuessInput";
import GuessResults from "../GuessResults/GuessResults";
import { checkGuess } from "../../game-helpers";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED, NUM_OF_LETTERS } from "../../constants";
import EndBanner from "../EndBanner/EndBanner";
import Keyboard from "../Keyboard/Keyboard";
import RestartButton from "../RestartButton/RestartButton";

function Game() {
  const [answer, setAnswer] = React.useState(sample(WORDS));
  const [guess, setGuess] = React.useState("");
  const [previousGuesses, setPreviousGuesses] = React.useState([]);
  const [end, setEnd] = React.useState(undefined);

  React.useEffect(() => {
    console.info({ answer });
  }, [answer]);

  const handleSubmit = () => {
    console.log({ guess });

    const guessInfo = checkGuess(guess, answer);
    if (guessInfo.every((letter) => letter.status === "correct")) setEnd("win");
    else if (previousGuesses.length + 1 === NUM_OF_GUESSES_ALLOWED)
      setEnd("lose");

    setPreviousGuesses((curr) => [...curr, guessInfo]);
    setGuess("");
  };
  const handleClick = (letter) => {
    if (guess.length >= NUM_OF_LETTERS) return;
    setGuess((curr) => curr + letter);
  };

  const handleRestartClick = () => {
    setAnswer(sample(WORDS));
    setEnd(undefined);
    setGuess("");
    setPreviousGuesses([]);
  };

  return (
    <>
      {!!end && <RestartButton onClick={handleRestartClick} />}
      <GuessResults guesses={previousGuesses} />
      <GuessInput
        value={guess}
        onChange={(value) => setGuess(value)}
        onSubmit={handleSubmit}
        disabled={!!end}
      />
      <Keyboard
        onClick={handleClick}
        guesses={previousGuesses}
        disabled={!!end}
      />
      {!!end && (
        <EndBanner
          endType={end}
          nbGuesses={previousGuesses.length}
          answer={answer}
        />
      )}
    </>
  );
}

export default Game;
