import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './components/Home';
import { CountryDetails } from './components/CountryDetails';

function App() {
    return (
        <div className="App" data-testid="app-component-test-id">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:name" element={<CountryDetails />} />
                <Route path="*" element={<p>404 Page Not Found</p>} />
            </Routes>
        </div>
    );
}

export default App;
