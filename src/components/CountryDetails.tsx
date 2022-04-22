import React, { FormEvent, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Container, Alert } from '@mui/material';

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
    const [countryApiError, setCountryApiError] = useState<Boolean>(false);
    const [weatherApiError, setWeatherApiError] = useState<Boolean>(false);
    const [loading, setLoading] = useState<Boolean>(false);
    const navigate = useNavigate();

    const getCountryData = useCallback(async () => {
        try {
            const response = await axios.get(
                `https://restcountries.com/v3.1/name/${name}`
            );
            const data = response.data;
            setCountryInfo(data[0]);
            setCapitalName(data[0].capital[0]);
        } catch (error) {
            setCountryApiError(true);
        }
    }, [name]);

    useEffect(() => {
        getCountryData();
    }, [getCountryData]);

    const getWeatherDetails = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.get(
                `http://api.weatherstack.com/current?access_key=60774ad1b455f3cff7d3f8a273f488f5&query=${capitalName}`
            );
            const data = response.data;
            setWeatherInfo(data.current);
            setLoading(false);
        } catch (error) {
            setWeatherApiError(true);
        }
    };

    const getBackToHome = (e: FormEvent) => {
        e.preventDefault();
        navigate('/');
    };

    return (
        <Container maxWidth="md">
            <div>
                <h1>Country Details</h1>

                {countryInfo ? (
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

                        <br />
                        <br />
                        <Button
                            size="medium"
                            variant="contained"
                            onClick={getWeatherDetails}>
                            Capital Weather
                        </Button>
                    </div>
                ) : (
                    <div>
                        {' '}
                        {countryApiError ? (
                            <>
                                <Alert severity="warning" sx={{ m: 2 }}>
                                    Country info not found!
                                </Alert>
                                <Button
                                    size="medium"
                                    variant="contained"
                                    onClick={getBackToHome}>
                                    Please try aging
                                </Button>
                            </>
                        ) : (
                            'Loading...'
                        )}
                    </div>
                )}

                {weatherInfo ? (
                    <div
                        className="weather-content"
                        data-testid="weather-details">
                        <br />
                        <h3>Weather Info</h3>
                        <br />
                        <img
                            src={weatherInfo.weather_icons[0]}
                            alt="Weather Icon"
                        />
                        <p>
                            Temperature: {weatherInfo.temperature}
                            <sup>o</sup>
                        </p>
                        <p>Wind Speed: {weatherInfo.wind_speed}</p>
                        <p>Precip: {weatherInfo.precip}</p>
                    </div>
                ) : (
                    <div>
                        {weatherApiError ? (
                            <Alert severity="warning">
                                Weather info not found. Please try again!
                            </Alert>
                        ) : (
                            <p>{loading ? 'Loading...' : ''}</p>
                        )}
                    </div>
                )}
            </div>
        </Container>
    );
};
