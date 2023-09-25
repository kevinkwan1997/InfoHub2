import { WeatherIndication } from "src/app/enum/weather";

export interface Weather {
    base: string;
    clouds: {
        all: string;
    };
    cod: number;
    coord: {
        lon: number;
        lat: number;
    };
    dt: number;
    id: number;
    main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_max: number;
        temp_min: number;
    };
    name: string;
    sys: {
        country: string;
        id: number;
        sunrise: number;
        sunset: number;
        type: number;
    };
    timezone: number;
    visibility: number;
    weather: WeatherInfo[];
    wind: {
        deg: number;
        speed: number;
    }
}

export interface WeatherInfo {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface CoordinateData {
    latitude: number;
    longitude: number;
}

export interface WeatherIconResponse {
    body: Blob;
    headers: Object;
    ok: boolean;
    status: number;
    statusText: string;
    type: number;
    url: string;
}

export interface WeatherHourlyResponse {
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: WeatherInfo[];
    icon?: any;
}

export interface WeatherIcon {
    id: WeatherIndication;
    image: any;
}