import React from 'react';
import { render, screen,fireEvent} from '@testing-library/react';
import CalculateString from './CalculateString';

describe("CalculateString", () => {
        test("renders the component correctly", () => {
          render(<CalculateString />);
          expect(screen.getByText("String Calculator")).toBeInTheDocument();
          expect(screen.getByPlaceholderText("InputString")).toBeInTheDocument();
          expect(screen.getByText("CalculateString")).toBeInTheDocument();
        });
        test("handles empty input", () => {
          render(<CalculateString />);
          const input = screen.getByPlaceholderText("InputString");
          const calculateButton = screen.getByText("CalculateString");
    
          fireEvent.change(input, { target: { value: "" } });
          fireEvent.click(calculateButton);
    
          expect(screen.getByText(/output: 0/i)).toBeInTheDocument();
        });
    
        test('calculates sum for input "2,3,4"', () => {
          render(<CalculateString />);
          const input = screen.getByPlaceholderText("InputString");
          const calculateButton = screen.getByText("CalculateString");
    
          fireEvent.change(input, { target: { value: "2,3,4" } });
          fireEvent.click(calculateButton);
    
          expect(screen.getByText(/output: 9/i)).toBeInTheDocument();
        });
    
        
        test('handles newline as a delimiter', async () => {
          
          render(<CalculateString />);
          const input = screen.getByPlaceholderText("InputString");
          const calculateButton = screen.getByText("CalculateString");
      
       
          fireEvent.change(input, { target: { value: '1\\n2\\n3' } });
          fireEvent.click(calculateButton);
      
          expect(screen.getByText(/output: 6/i)).toBeInTheDocument();
      });
        test("handles custom delimiters", () => {
          render(<CalculateString />);
          const input = screen.getByPlaceholderText("InputString");
          const calculateButton = screen.getByText("CalculateString");
    
          fireEvent.change(input, { target: { value: '//;\\n1;2' } });
          fireEvent.click(calculateButton);
    
          expect(screen.getByText(/output: 3/i)).toBeInTheDocument();
        });
        test("throws an error for negative numbers", () => {
          render(<CalculateString />);
          const input = screen.getByPlaceholderText("InputString");
          const calculateButton = screen.getByText("CalculateString");
    
          fireEvent.change(input, { target: { value: "1,-2,3" } });
          fireEvent.click(calculateButton);
    
          expect(screen.getByText(/negative numbers not allowed: -2/i)).toBeInTheDocument();
        });
        test("throws an error for multiple negative numbers", () => {
          render(<CalculateString />);
          const input = screen.getByPlaceholderText("InputString");
          const calculateButton = screen.getByText("CalculateString");
    
          fireEvent.change(input, { target: { value: '1,-2,-3' } });
          fireEvent.click(calculateButton);
    
          expect(screen.getByText(/negative numbers not allowed: -2, -3/i)).toBeInTheDocument();
        });
    
        
      });
