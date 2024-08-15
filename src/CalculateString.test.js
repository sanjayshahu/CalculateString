import React from 'react';
import { render, screen,fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CalculateString from './CalculateString';

describe('String Calculator', () => {

    test('renders the input box and button', () => {
        render(<CalculateString />);
        expect(screen.getByPlaceholderText(/inputString/i)).toBeInTheDocument();
        expect(screen.getByText(/calculatestring/i)).toBeInTheDocument();
    });

    test('returns 0 for an empty  string', () => {
        render(<CalculateString />);
        userEvent.type(screen.getByPlaceholderText(/inputString/i), { target: { value: '' } });
        userEvent.click(screen.getByText(/calculatestring/i));
        expect(screen.getByText(/output: 0/i)).toBeInTheDocument();
    });

    test('calculates sum for input "2,3,4"', async () => {
        userEvent.setup()
        render(<CalculateString />);
        const inputElement = screen.getByPlaceholderText(/inputString/i);
    
        await userEvent.type(inputElement, '2,3,4');
        userEvent.click(screen.getByText(/calculatestring/i));
    
        // Find the output element once it appears in the DOM
        const outputElement = await screen.findByText(/output: 9/i);
        expect(outputElement).toBeInTheDocument();
    });
    test('handles newline as a delimiter', async () => {
        userEvent.setup()
        render(<CalculateString />);
        const inputElement = screen.getByPlaceholderText(/inputString/i);
    
        await userEvent.type(inputElement, '1\n2\n3');
        userEvent.click(screen.getByText(/calculatestring/i));
    
        // Find the output element once it appears in the DOM
        const headingElement = await screen.findByRole('heading', { level: 3 });
        expect(headingElement).toHaveTextContent(/output: 6/i)
    });
    
    test('supports custom delimiter', async () => {
        userEvent.setup()
        render(<CalculateString />);
        const inputElement = screen.getByPlaceholderText(/inputString/i);
        await userEvent.type(inputElement, '//;\n1;2');        
        userEvent.click(screen.getByText(/calculatestring/i));
    
        // Find the output element once it appears in the DOM
        const headingElement = await screen.findByRole('heading', { level: 3 });
        expect(headingElement).toHaveTextContent(/output: 3/i)
      
    });
    
    test('throws an error for negative numbers', async () => {
        render(<CalculateString />);
        const input = screen.getByPlaceholderText(/inputString/i);
        const button = screen.getByText(/calculatestring/i);

        await userEvent.type(input, '1,-2,3');
        await userEvent.click(button);

        expect(screen.getByText(/negative numbers not allowed: -2/i)).toBeInTheDocument();
    });

    test('throws an error for multiple negative numbers', async () => {
        render(<CalculateString />);
        const input = screen.getByPlaceholderText(/inputString/i);
        const button = screen.getByText(/calculatestring/i);

        await userEvent.type(input, '1,-2,-3');
        await userEvent.click(button);

        expect(screen.getByText(/negative numbers not allowed: -2, -3/i)).toBeInTheDocument();
    });


});
