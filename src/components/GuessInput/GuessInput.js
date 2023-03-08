import React from "react";
import { NUM_OF_LETTERS } from "../../constants";

function GuessInput({ value, onChange, onSubmit, disabled }) {
  const handleChange = (e) => {
    onChange(e.target.value.toUpperCase().slice(0, NUM_OF_LETTERS));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form className="guess-input-wrapper" onSubmit={handleSubmit}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        type="text"
        id="guess-input"
        pattern={`[A-Z]{${NUM_OF_LETTERS}}`}
        value={value}
        onChange={handleChange}
        disabled={disabled}
      />
    </form>
  );
}

export default GuessInput;
