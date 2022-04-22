import { act } from '@testing-library/react';
import App from '../App';
import {
    componentRenderByMemoryRouter,
    toBeExpectByTestId,
    toBeExpectByText,
} from '../utils/testUtils';

describe('Test App Router', () => {
    test('should render app componet', () => {
        componentRenderByMemoryRouter('/', <App />);
        toBeExpectByTestId('app-component-test-id');
    });

    test('should Render Home component with path "/"', () => {
        componentRenderByMemoryRouter('/', <App />);
        toBeExpectByText('Weather App');
    });

    test('should render CountryDetails component with path "/details/:name"', () => {
        // eslint-disable-next-line testing-library/no-unnecessary-act
        act(() => {
            componentRenderByMemoryRouter('/details/BD', <App />);
        });
        toBeExpectByText('Country Details');
    });
    test('should render 404 page', () => {
        componentRenderByMemoryRouter(
            '/details/BD/hjgsdfjghsdjfg',
            <App />
        );
        toBeExpectByText('404 Page Not Found');
    });
});
