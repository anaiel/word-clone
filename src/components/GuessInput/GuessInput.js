import React from "react";

function GuessInput({ value, onChange, onSubmit }) {
  const handleChange = (e) => {
    onChange(e.target.value.toUpperCase().slice(0, 5));
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
        pattern="[A-Z]{5}"
        value={value}
        onChange={handleChange}
      />
    </form>
  );
}

export default GuessInput;
