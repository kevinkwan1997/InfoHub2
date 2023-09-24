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