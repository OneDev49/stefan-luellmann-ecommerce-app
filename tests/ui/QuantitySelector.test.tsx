import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuantitySelector from '@/components/ui/QuantitySelector';
import { jest } from '@jest/globals';

/* TEST SUITE */
describe('QuantitySelector Component', () => {
  /* Test Case 1: Render */
  it('Should render with the initial quantity', () => {
    const mockOnQuantityChange = jest.fn();

    render(
      <QuantitySelector
        initialQuantity={5}
        onQuantityChange={mockOnQuantityChange}
      />
    );

    const input = screen.getByRole('textbox', { name: /current quantity/i });

    expect(input).toHaveValue('5');
  });

  /* Test Case 2: Increment Quantity */
  it('Should Increment the quantity when the plus button is clicked', () => {
    const mockOnQuantityChange = jest.fn();
    render(<QuantitySelector onQuantityChange={mockOnQuantityChange} />);

    const incrementButton = screen.getByRole('button', {
      name: /increase quantity/i,
    });
    const input = screen.getByRole('textbox');

    fireEvent.click(incrementButton);

    expect(input).toHaveValue('2');

    expect(mockOnQuantityChange).toHaveBeenCalledWith(2);
  });

  /* Test Case 3: Decrement Quantity */
  it('Should Decrement the quantity when the minus button is clicked', () => {
    const mockOnQuantityChange = jest.fn();
    render(
      <QuantitySelector
        initialQuantity={3}
        onQuantityChange={mockOnQuantityChange}
      />
    );

    const decrementButton = screen.getByRole('button', {
      name: /decrease quantity/i,
    });
    const input = screen.getByRole('textbox');

    fireEvent.click(decrementButton);

    expect(input).toHaveValue('2');

    expect(mockOnQuantityChange).toHaveBeenCalledWith(2);
  });

  /* Test Case 4: Not going below minimum quantity */
  it('Should not go below 1 and the button should be disabled', () => {
    const mockOnQuantityChange = jest.fn();
    render(<QuantitySelector onQuantityChange={mockOnQuantityChange} />);

    const decrementButton = screen.getByRole('button', {
      name: /decrease quantity/i,
    });
    const input = screen.getByRole('textbox');

    expect(input).toHaveValue('1');
    expect(decrementButton).toBeDisabled();

    fireEvent.click(decrementButton);

    expect(input).toHaveValue('1');
    expect(mockOnQuantityChange).not.toHaveBeenCalled();
  });

  /* Test Case 5: Not going above maximum quantity */
  it('Should not go above 10 and the button should be disabled', () => {
    const mockOnQuantityChange = jest.fn();
    render(
      <QuantitySelector
        initialQuantity={10}
        maxQuantity={10}
        onQuantityChange={mockOnQuantityChange}
      />
    );

    const incrementButton = screen.getByRole('button', {
      name: /increase quantity/i,
    });
    expect(incrementButton).toBeDisabled();
  });

  /* Test Case 6: Handle direct text input */
  it('Should update the quantity when a user types a valid number in the input', () => {
    const mockOnQuantityChange = jest.fn();
    render(<QuantitySelector onQuantityChange={mockOnQuantityChange} />);

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: '3' } });
    fireEvent.blur(input);

    expect(input).toHaveValue('3');
    expect(mockOnQuantityChange).toHaveBeenCalledWith(3);
  });

  /* Test Case 7: Handle invalid text input */
  it('Should revert to the last valid quantity if a user types invalid text', () => {
    const mockOnQuantityChange = jest.fn();
    render(
      <QuantitySelector
        initialQuantity={2}
        onQuantityChange={mockOnQuantityChange}
      />
    );

    const input = screen.getByRole('textbox');

    fireEvent.change(input, { target: { value: 'abc' } });
    fireEvent.blur(input);

    expect(input).toHaveValue('2');
    expect(mockOnQuantityChange).not.toHaveBeenCalled();
  });
});
