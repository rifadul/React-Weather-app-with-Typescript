import { act, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CountryDetails } from '../components/CountryDetails';
import axios from 'axios';
import userEvent from '@testing-library/user-event';

describe('Test CountryDetails Componet', () => {
    beforeEach(async () => {
        jest.spyOn(axios, 'get').mockResolvedValue({
            data: [
                    {
                        capital: 'Dhaka',
                        population: 164689383,
                        latlng: [24.0, 90.0],
                        flags: {
                            png: 'https://flagcdn.com/w320/bd.png',
                            svg: 'https://flagcdn.com/bd.svg',
                        },
                    },
                ],
            
        });
    });


    
    test('should render CountryDetails component with path "/details/BD"', async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/details/BD']}>
                    <CountryDetails />
                </MemoryRouter>
            );
        });
        
        expect(screen.getByText('Country details')).toBeInTheDocument();
    });


    test('should render country info', async () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        await act(async () => {
            render(
                <MemoryRouter>
                    <CountryDetails />
                </MemoryRouter>
            );
        });
        await expect(screen.getByTestId('country-info')).toBeInTheDocument();
    });


    test('should render weather data when click the Capital Weather button', async () => {
        render(
            <MemoryRouter initialEntries={['/details/BD']}>
                <CountryDetails />
            </MemoryRouter>
        );
        userEvent.click(screen.getByText('Capital Weather'));
        expect(await screen.findByTestId('country-info')).toBeInTheDocument();
    });
});
