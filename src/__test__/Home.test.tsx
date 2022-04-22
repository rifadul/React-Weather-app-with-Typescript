import { fireEvent, screen } from '@testing-library/react';
import { Home } from '../components/Home';
import {
    componentRenderByMemoryRouter,
    toBeExpectByTestId,
    toBeExpectByText,
} from '../utils/testUtils';

// function for cheek inputbox tesing
function hasInputValue(
    e: Document | Element | Window | Node,
    inputValue: string
) {
    return screen.getByDisplayValue(inputValue) === e;
}

describe('Test home Componet', () => {
    test('should render Home component with path "/"', async () => {
        componentRenderByMemoryRouter('/', <Home />);
        toBeExpectByText('Submit');
    });

    test('should render input box in home component', () => {
        componentRenderByMemoryRouter('/', <Home />);
        toBeExpectByTestId('inputbox-test-id');
    });

    test('should render button in home component', () => {
        componentRenderByMemoryRouter('/', <Home />);
        toBeExpectByTestId('button-testid');
    });

    test('cheek the button are disable when the inputbox are empty', () => {
        componentRenderByMemoryRouter('/', <Home />);
        const findButton = screen.getByRole('button');
        expect(findButton).toHaveAttribute('disabled');
    });

    test('cheek input box value', () => {
        componentRenderByMemoryRouter('/', <Home />);
        const input = screen.getByLabelText('Enter country Name');
        fireEvent.change(input, { target: { value: 'BD' } });
        expect(hasInputValue(input, 'BD')).toBe(true);
    });
});
