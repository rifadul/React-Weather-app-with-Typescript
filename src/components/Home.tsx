import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@mui/material';
import { Container } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import axios from 'axios';

export const Home = () => {
    const [countryName, setCountryName] = useState('');
    const navigate = useNavigate();

    // add newly
    const [wrongInfo, setWrongInfo] = useState(false);

    const getCountryData = async () => {
        try {
            const response = await axios.get(
                `https://restcountries.com/v3.1/name/${countryName}`
            );

            const data = response.data;
            setWrongInfo(false);
            navigate(`/details/${countryName}`,{state:data});
            // console.log('data',data[0]);
            
        } catch (error) {
            setWrongInfo(true);
            setCountryName('')
        }
    }

    // old code
    // const getCuntryName = async (e: FormEvent) => {
    //     e.preventDefault();
    //     navigate(`/details/${countryName}`);
    // };


    return (
        <Container maxWidth="md">
            <div className="my-3">
                <h1 className="text-center">Weather App</h1>
                <p>{wrongInfo?'Please Enter valid country name' : ''} </p>
                <TextField
                    id="outlined-basic"
                    fullWidth
                    value={countryName}
                    label="Enter country"
                    variant="outlined"
                    data-testid="inputbox-test-id"
                    onChange={(e) => setCountryName(e.target.value)}
                />
            </div>
            <Button size="medium" variant="contained" data-testid="button-testid" disabled={countryName===''} onClick={getCountryData}>
                Submit
            </Button>
        </Container>
    );
};
