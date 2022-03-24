import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Home } from '../components/Home';

describe('Test home Componet', () => {
    test('should render Home component with path "/"', async () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Home />
            </MemoryRouter>
        );
        expect(screen.getByText('Search')).toBeInTheDocument();
    });
});
