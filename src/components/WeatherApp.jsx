import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherApp = () => {

    const [data, setData] = useState({})

    const [degrees, setDegrees] = useState(true)

    useEffect(() => {

        const success = pos => {

            const crd = pos.coords

            const lat = crd.latitude

            const lon = crd.longitude

            const key = 'ec193efaac6ead0112a94c0f6c940255'

            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`)
                .then(res => setData(res.data))
        }

        navigator.geolocation.getCurrentPosition(success)
    }, [])

    console.log(data)

    const city = data.name

    const country = data.sys?.country

    const icon = `http://openweathermap.org/img/wn/${data.weather?.[0].icon}@2x.png`

    const description = data.weather?.[0].description

    const windSpeed = String(Math.round(data.wind?.speed * 3.6))

    const cloud = data.clouds?.all

    const pressure = data.main?.pressure

    const humidity = data.main?.humidity

    const degreeCelcius = String(Math.round(data.main?.temp - 273.15))
    const degreeFahrenheit = String(Math.round(((data.main?.temp - 273.15) * 9 / 5) + 32))

    const click = () => {
        setDegrees(!degrees)
    }

    console.log(typeof (windSpeed))

    return (
        <div className='App__card'>
            <div className='weather__title'>
                <h3>Current Weather In</h3>
                <h2>{city}, {country}</h2>

            </div>
            <div className='weather__icon'>
                <h4>{description}</h4>
                <img src={icon} alt="weather icon" />
                <h3>{degrees ? degreeCelcius : degreeFahrenheit}</h3>
                <span className='weather__icon__deegre'>{degrees ? 'ºC' : 'ºF'}</span>
                <button className='weather__icon__button' onClick={click}>{degrees ? 'To ºF' : 'To ºC'}</button>
            </div>
            <section className='weather__details'>

                <div >
                    <i className='bx bxl-tailwind-css'></i>
                    <h3>{windSpeed}</h3>
                    <span>Km/h</span>
                </div>
                <div>
                    <i className='bx bxs-cloud'></i>
                    <h3>{cloud}</h3>
                    <span>%</span>
                </div>
                <div>
                    <i className='bx bxs-thermometer' ></i>
                    <h3>{pressure}</h3>
                    <span>hPa</span>
                </div>
                <div>
                    <i className='bx bxs-droplet-half'></i>
                    <h3>{humidity}</h3>
                    <span>%</span>
                </div>
            </section>
        </div>
    );
};

export default WeatherApp;