import React, { useState } from 'react';

const CalculateString= () => {
    const [inputString, setInput] = useState('');
    const [output, setOutput] = useState(0);

    const addNumbers = (numbers) => {
        if (numbers.trim() === "") {
            return 0;
        }

        const numArray = numbers.split(",");

      

        return numArray.reduce((acc, curr) => {
            return acc + parseInt(curr.trim(), 10);
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
        <div style={{ padding: '30px', maxWidth: '300px', margin: 'auto', textAlign: 'center' }}>
            <h2>String Calculator</h2>
            <input
                type="text"
                value={inputString}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Input"
                style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
            />
            <button onClick={stringCalculator} style={{ padding: '10px', width: '100%', marginBottom: '10px'}}>
                CalculateString
            </button>
            <h3>output: {output}</h3>
        </div>
    );
};

export default CalculateString;
