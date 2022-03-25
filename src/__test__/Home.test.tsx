import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../components/Home';



// function for cheek inputbox tesing
type TestElement = Document | Element | Window | Node
function hasInputValue(e: TestElement, inputValue: string) {
    return screen.getByDisplayValue(inputValue) === e;
}


describe('Test home Componet', () => {
    test('should render Home component with path "/"', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByText('Search')).toBeInTheDocument();
    });

    test('should render input box in home component', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByTestId('inputbox-test-id')).toBeInTheDocument();
    });

    test('should render button in home component', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByTestId('button-testid')).toBeInTheDocument();
    });

    test('cheek the button are disable when the inputbox are empty', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Home />
            </MemoryRouter>
        );
        const findButton = screen.getByRole('button');
        expect(findButton).toHaveAttribute('disabled');
    });

    test('cheek input box value', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Home />
            </MemoryRouter>
        );
        const input = screen.getByLabelText('Enter country Name');

        fireEvent.change(input, { target: { value: 'BD' } });
        expect(hasInputValue(input, 'BD')).toBe(true);
    });
});


