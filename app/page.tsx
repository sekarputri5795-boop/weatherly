'use client';

import { useState } from "react";
import { WeatherData } from "@/types/weather";
import { WeatherSearch } from "@/action";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Form, Card } from "react-bootstrap"; 

export default function Home() {

  const [error, setError] = useState<string>("");
  const [weather, setWeatherData] = useState<WeatherData | null>(null);

  const WeatherSearchData = async (formData: FormData) => {
    setError("");
    const city = formData.get("city")?.toString() || "";
    console.log("Weather search initiated");
    const {data, error: weatherError } = await WeatherSearch(city);

    if (weatherError) {
      setError(weatherError);
      setWeatherData(null);
    } if (data) {
      setWeatherData(data);
    }
  }

  return (
   <Container fluid className="d-flex flex-column align-items-center justify-content-center min-vh-100" style={{
    backgroundColor: "#4d91f0" }}>

    {/* Form */}
    <Form action={WeatherSearchData} className="d-flex flex-column align-items-center p-4 rounded" style={
      { backgroundColor: "white", width: "300px" }}
    >
      <Form.Group className="mb-3 text-center">
        <Form.Label>Input City Name</Form.Label>
        <Form.Control type="text" placeholder="Enter city name" className="mb-3" name="city"/>
      </Form.Group>

      <Button type="submit" variant="primary" className="w-100"> Get Weather </Button>
    </Form>

    {error && (
            <p className="text-danger mt-3">
                {error}
            </p>
        )}

      {weather && (
          <Card className="mt-4" style={{ width: "18rem" }}>
            <Card.Body>
              <Card.Title>{weather.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                        {weather.weather[0].main}
              </Card.Subtitle>
                    <Card.Text>
                        Temperature: {weather.main.temp}°C<br />
                        Feels Like: {weather.main.feels_like}°C<br />
                        Humidity: {weather.main.humidity}%<br />
                        Wind Speed: {weather.wind.speed} m/s<br />
                        Description: {weather.weather[0].description}<br />

                        <img 
                          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                          alt="Weather Icon"
                        />
                    </Card.Text>
                </Card.Body>
            </Card>
        )}

  </Container>
);
}