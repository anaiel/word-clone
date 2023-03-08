import React from "react";
import GuessInput from "../GuessInput/GuessInput";
import GuessResults from "../GuessResults/GuessResults";
import { checkGuess } from "../../game-helpers";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import EndBanner from "../EndBanner/EndBanner";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guess, setGuess] = React.useState("");
  const [previousGuesses, setPreviousGuesses] = React.useState([]);
  const [end, setEnd] = React.useState(undefined);

  const handleSubmit = () => {
    console.log({ guess });
    const guessInfo = checkGuess(guess, answer);
    if (guessInfo.every((letter) => letter.status === "correct")) setEnd("win");
    else if (previousGuesses.length + 1 === NUM_OF_GUESSES_ALLOWED)
      setEnd("lose");
    setPreviousGuesses((curr) => [...curr, guessInfo]);
    setGuess("");
  };

  return (
    <>
      <GuessResults guesses={previousGuesses} />
      <GuessInput
        value={guess}
        onChange={(value) => setGuess(value)}
        onSubmit={handleSubmit}
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
