import React, { FormEvent } from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@mui/material';
import { Container } from '@material-ui/core';

type InitiProps = {
    name: string;
};

interface InitCountry {
    capital: string[];
    population: number;
    latlng: number[];
    flags: {
        svg: string;
    };
}

interface InitCountryWeatherInfo {
    temperature: number;
    weather_icons: string[];
    wind_speed: number;
    precip: number;
}

export const CountryDetails: React.FC = () => {
    const { name } = useParams<InitiProps>();
    const [countryInfo, setCountryInfo] = useState<InitCountry>();
    const [capitalName, setCapitalName] = useState('');
    const [weatherInfo, setWeatherInfo] = useState<InitCountryWeatherInfo>();

    console.log('name',name);
    console.log('capitalName',capitalName);
    
    useEffect(() => {
        getCountryData();
    }, []);

    const getCountryData = async () => {
        try {
            const response = await axios.get(
                `https://restcountries.com/v3.1/name/${name}`
            );
            
            console.log('response data',response);
            
            const data = response.data;
            // console.log('country data', data[0]);
            setCountryInfo(data[0]);
            setCapitalName(data[0].capital[0]);
        } catch (error) {
            console.log(error);
        }
    };

    const getWeatherDetails = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.get(
                `http://api.weatherstack.com/current?access_key=60774ad1b455f3cff7d3f8a273f488f5&query=${capitalName}`
            );
            const data = response.data;
            // console.log('hh', response.data.current);
            setWeatherInfo(data.current);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container maxWidth="md">
            <div>
                <h1>Country details</h1>

                {countryInfo? (
                    <div data-testid="country-info">
                        <p>Capital: {countryInfo.capital[0]}</p>
                        <p>Population: {countryInfo.population}</p>
                        <p>
                            Latitude: {countryInfo.latlng[0]}
                            <sup>o</sup>
                        </p>
                        <p>
                            Longitude: {countryInfo.latlng[1]}
                            <sup>o</sup>
                        </p>
                        <small>Country Flag : </small>
                        <img src={countryInfo.flags.svg} height="70px" alt="" />
                    </div>
                ) : (
                    <p>Loading...</p>
                )}

                <br />
                <br />
                <Button
                    size="medium"
                    variant="contained"
                    onClick={getWeatherDetails}>
                    Capital Weather
                </Button>

                {weatherInfo ? (
                    <div className="weather-content" data-testid="weather-details">
                        <br />
                        <img src={weatherInfo.weather_icons[0]} alt="_" />
                        <p>
                            Temperature: {weatherInfo.temperature}
                            <sup>o</sup>
                        </p>
                        <p>Wind Speed: {weatherInfo.wind_speed}</p>
                        <p>Precip: {weatherInfo.precip}</p>
                    </div>
                ) : (
                    ''
                )}
            </div>
        </Container>
    );
};
