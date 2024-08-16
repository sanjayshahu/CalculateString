import React, { useState } from "react";

const CalculateString = () => {
  const [inputString, setInput] = useState("");
  const [output, setOutput] = useState(0);

  const addNumbers = (numbers) => {
    if (numbers.trim() === "") {
      return 0;
    }

    let delimiter = ",";
    let numbersSection = numbers.replace(/\\n/g, "\n");

    // Handle custom delimiter syntax
    if (numbersSection.startsWith("//")) {
      let delimiterEndIndex = numbersSection.indexOf("\n");

      // Check for Windows-style newlines
      if (delimiterEndIndex === -1) {
        delimiterEndIndex = numbers.indexOf("\r\n");
      }

      if (delimiterEndIndex !== -1) {
        delimiter = numbers.substring(2, delimiterEndIndex);
      } else {
        throw new Error(
          "Invalid input format: newline after delimiter definition is missing.",
        );
      }
    }

    const sanitizedNumbers = numbersSection.replace(
      new RegExp(`[${delimiter}\n\r]`, "g"),
      delimiter,
    );

    const numArray = sanitizedNumbers.split(delimiter);

    const negatives = numArray.filter((num) => parseInt(num.trim(), 10) < 0);
    if (negatives.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negatives.join(", ")}`);
    }

    return numArray.reduce((acc, curr) => {
      const parsedValue = parseInt(curr.trim(), 10);
      if (!isNaN(parsedValue) && Number.isInteger(parsedValue)) {
        return acc + parsedValue;
      }
      return acc;
    }, 0);
  };

  const stringCalculator = () => {
    try {
      const sum = addNumbers(inputString);
      setOutput(sum);
    } catch (error) {
      setOutput(error.message);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "300px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h2>String Calculator</h2>
      <input
        type="text"
        value={inputString}
        onChange={(e) => setInput(e.target.value)}
        placeholder="InputString"
        style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
      />
      <button
        onClick={stringCalculator}
        style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
      >
        CalculateString
      </button>
      <h3>output: {output}</h3>
    </div>
  );
};

export default CalculateString;
