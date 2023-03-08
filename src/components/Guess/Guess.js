import React from "react";
import clsx from "clsx";
import { NUM_OF_LETTERS } from "../../constants";
import { range } from "../../utils";

function Guess({ guess }) {
  return (
    <>
      {range(NUM_OF_LETTERS).map((_, index) => (
        <span key={index} className={clsx("cell", guess && guess[index].status)}>
          {guess && guess[index].letter}
        </span>
      ))}
    </>
  );
}

export default Guess;
