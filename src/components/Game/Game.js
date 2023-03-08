import React from "react";
import GuessInput from "../GuessInput/GuessInput";
import GuessResults from "../GuessResults/GuessResults";
import { NUM_OF_LETTERS } from "../../constants";
import EndBanner from "../EndBanner/EndBanner";
import Keyboard from "../Keyboard/Keyboard";
import RestartButton from "../RestartButton/RestartButton";
import { gameReducer, initGame } from "../../game-helpers";

function Game() {
  const [{ answer, guess, end, previousGuesses }, dispatch] = React.useReducer(
    gameReducer,
    initGame()
  );

  React.useEffect(() => {
    console.info({ answer });
  }, [answer]);

  const handleChange = (value) =>
    dispatch({ type: "UPDATE_GUESS", guess: value });
  const handleSubmit = () => {
    console.log({ guess });
    dispatch({ type: "SUBMIT_GUESS" });
  };
  const handleClick = (letter) => {
    if (guess.length >= NUM_OF_LETTERS) return;
    dispatch({ type: "UPDATE_GUESS", guess: guess + letter });
  };

  const handleRestartClick = () => {
    dispatch({type: "RESET"});
  };

  return (
    <>
      {!!end && <RestartButton onClick={handleRestartClick} />}
      <GuessResults guesses={previousGuesses} />
      <GuessInput
        value={guess}
        onChange={handleChange}
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
