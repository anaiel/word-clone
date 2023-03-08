import clsx from "clsx";
import React from "react";
import { letterStatus } from "../../game-helpers";

const LETTERS = [
  ["A", "Z", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["Q", "S", "D", "G", "H", "J", "K", "L", "M"],
  ["W", "X", "C", "V", "B", "N"],
];

function Keyboard({ guesses, onClick, disabled }) {
  return (
    <div className="keyboard">
      {LETTERS.map((row, index) => (
        <div key={index} className="keyboard-row">
          {row.map((letter) => (
            <button
              key={letter}
              disabled={disabled}
              onClick={() => onClick(letter)}
              className={clsx("key", letterStatus(letter, guesses))}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Keyboard;
