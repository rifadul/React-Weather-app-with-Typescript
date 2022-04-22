import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Container } from '@material-ui/core';
import TextField from '@mui/material/TextField';

export const Home: React.FC = () => {
    const [countryName, setCountryName] = useState('');
    const navigate = useNavigate();

    const getCuntryName = async (e: FormEvent) => {
        e.preventDefault();
        navigate(`/details/${countryName}`);
    };

    return (
        <Container maxWidth="md">
            <div className="my-3">
                <h1 className="text-center">Weather App</h1>
                <TextField
                    id="outlined-basic"
                    fullWidth
                    value={countryName}
                    label="Enter country Name"
                    variant="outlined"
                    data-testid="inputbox-test-id"
                    onChange={(e) => setCountryName(e.target.value)}
                />
            </div>
            <Button size="medium" variant="contained" data-testid="button-testid" disabled={countryName===''} onClick={getCuntryName}>
                Submit
            </Button>
        </Container>
    );
};
