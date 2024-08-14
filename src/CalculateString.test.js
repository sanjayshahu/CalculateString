import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CalculateString from './CalculateString';

describe('String Calculator', () => {

    test('renders the input box and button', () => {
        render(<CalculateString />);
        expect(screen.getByPlaceholderText(/input/i)).toBeInTheDocument();
        expect(screen.getByText(/calculatestring/i)).toBeInTheDocument();
    });

    test('returns 0 for an empty  string', () => {
        render(<CalculateString />);
        fireEvent.change(screen.getByPlaceholderText(/input/i), { target: { value: '' } });
        fireEvent.click(screen.getByText(/calculatestring/i));
        expect(screen.getByText(/output: 0/i)).toBeInTheDocument();
    });

    test('calculates sum for input "2,3,4"', () => {
        render(<CalculateString />);
        fireEvent.change(screen.getByPlaceholderText(/input/i), { target: { value: '2,3,4' } });
        fireEvent.click(screen.getByText(/calculatestring/i));
        expect(screen.getByText(/output: 9/i)).toBeInTheDocument();
    });


});
