import { render, screen } from '@testing-library/react';
import App from '../App';
import { MemoryRouter } from 'react-router-dom';

describe('Test App Router', () => {
    test('should Render Home component with path "/"', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText('Weather App')).toBeInTheDocument();
    });

    test('should render CountryDetails component with path "/details/:name"', () => {
        render(
            <MemoryRouter initialEntries={['/details/BD']}>
                <App />
            </MemoryRouter>
        );
        expect(screen.getByText('Country details')).toBeInTheDocument();
    });
});
