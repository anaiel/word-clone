import React from "react";

function EndBanner({ endType, nbGuesses, answer }) {
  switch (endType) {
    case "win":
      return (
        <div className="happy banner">
          <p>
            <strong>Congratulations!</strong> Got it in{" "}
            <strong>{nbGuesses} guess{nbGuesses > 1 ? "es" : ""}</strong>.
          </p>
        </div>
      );
    case "lose":
      return <div className="sad banner">
        <p>
          Sorry, the correct answer is <strong>{answer}</strong>.
        </p>
      </div>;
    default:
      return null;
  }
}

export default EndBanner;
