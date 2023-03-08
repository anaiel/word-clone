import React from "react";
import GuessInput from "../GuessInput/GuessInput";
import GuessResults from "../GuessResults/GuessResults";
import { checkGuess } from "../../game-helpers";

import { sample } from "../../utils";
import { WORDS } from "../../data";

// Pick a random word on every pageload.
const answer = sample(WORDS);
// To make debugging easier, we'll log the solution in the console.
console.info({ answer });

function Game() {
  const [guess, setGuess] = React.useState("");
  const [previousGuesses, setPreviousGuesses] = React.useState([]);
  const handleSubmit = () => {
    console.log({ guess });
    setPreviousGuesses((curr) => [...curr, checkGuess(guess, answer)]);
    setGuess("");
  };

  return (
    <>
      <GuessResults guesses={previousGuesses} />
      <GuessInput
        value={guess}
        onChange={(value) => setGuess(value)}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default Game;
