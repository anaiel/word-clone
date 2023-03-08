/**
 * Thanks to Github user dylano for supplying a more-accurate
 * solving algorithm!
 */

import { NUM_OF_GUESSES_ALLOWED } from "./constants";
import { WORDS } from "./data";
import { sample } from "./utils";

export function checkGuess(guess, answer) {
  // This constant is a placeholder that indicates we've successfully
  // dealt with this character (it's correct, or misplaced).
  const SOLVED_CHAR = "✓";

  if (!guess) {
    return null;
  }

  const guessChars = guess.toUpperCase().split("");
  const answerChars = answer.split("");

  const result = [];

  // Step 1: Look for correct letters.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === answerChars[i]) {
      result[i] = {
        letter: guessChars[i],
        status: "correct",
      };
      answerChars[i] = SOLVED_CHAR;
      guessChars[i] = SOLVED_CHAR;
    }
  }

  // Step 2: look for misplaced letters. If it's not misplaced,
  // it must be incorrect.
  for (let i = 0; i < guessChars.length; i++) {
    if (guessChars[i] === SOLVED_CHAR) {
      continue;
    }

    let status = "incorrect";
    const misplacedIndex = answerChars.findIndex(
      (char) => char === guessChars[i]
    );
    if (misplacedIndex >= 0) {
      status = "misplaced";
      answerChars[misplacedIndex] = SOLVED_CHAR;
    }

    result[i] = {
      letter: guessChars[i],
      status,
    };
  }

  return result;
}

export function letterStatus(letter, guesses) {
  if (
    guesses.some((guess) =>
      guess.some((item) => item.letter === letter && item.status === "correct")
    )
  )
    return "correct";
  if (
    guesses.some((guess) =>
      guess.some(
        (item) => item.letter === letter && item.status === "misplaced"
      )
    )
  )
    return "misplaced";
  if (guesses.some((guess) => guess.some((item) => item.letter === letter)))
    return "incorrect";
  return "unused";
}

export function gameReducer(state, action) {
  switch (action.type) {
    case "UPDATE_GUESS":
      return {
        ...state,
        guess: action.guess,
      };
    case "RESET":
      return initGame({ force: true });
    case "SUBMIT_GUESS":
      localStorage.setItem(
        "guesses",
        JSON.stringify([
          ...state.previousGuesses.map((guess) =>
            guess.map((item) => item.letter).join("")
          ),
          state.guess,
        ])
      );
      const guessInfo = checkGuess(state.guess, state.answer);
      let end = undefined;
      if (guessInfo.every((letter) => letter.status === "correct")) end = "win";
      else if (state.previousGuesses.length + 1 === NUM_OF_GUESSES_ALLOWED)
        end = "lose";
      return {
        ...state,
        end,
        previousGuesses: [...state.previousGuesses, guessInfo],
        guess: "",
      };
  }
}

export function initGame({ force } = { force: false }) {
  let storedAnswer = localStorage.getItem("answer");
  const rawStoredGuesses = localStorage.getItem("guesses");
  let storedGuesses = undefined;
  if (rawStoredGuesses) storedGuesses = JSON.parse(rawStoredGuesses);

  if (
    storedAnswer &&
    storedGuesses &&
    (storedGuesses.length >= NUM_OF_GUESSES_ALLOWED ||
      storedGuesses.some((guess) =>
        checkGuess(guess, storedAnswer).every(
          (item) => item.status === "correct"
        )
      ))
  ) {
    localStorage.removeItem("answer");
    localStorage.removeItem("guesses");
    storedAnswer = undefined;
    storedAnswer = undefined;
  }

  if (force || !storedAnswer) {
    const answer = sample(WORDS);
    localStorage.setItem("answer", answer);
    localStorage.setItem("guesses", JSON.stringify([]));
    return {
      end: undefined,
      answer,
      previousGuesses: [],
      guess: "",
    };
  }

  return {
    end: undefined,
    answer: storedAnswer,
    previousGuesses: storedGuesses
      ? storedGuesses.map((guess) => checkGuess(guess, storedAnswer))
      : undefined,
    guess: "",
  };
}
