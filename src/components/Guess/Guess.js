import React from "react";
import { NUM_OF_LETTERS } from "../../constants";
import { range } from "../../utils";

function Guess({ guess }) {
  return (
    <>
      {range(NUM_OF_LETTERS).map((_, letterIndex) => (
        <span key={letterIndex} className="cell">
          {guess && guess.charAt(letterIndex)}
        </span>
      ))}
    </>
  );
}

export default Guess;
