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
    main: WeatherIndication;
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

// export interface WeatherHourlyResponse {
//     dt: number;
//     temp: number;
//     feels_like: number;
//     pressure: number;
//     humidity: number;
//     dew_point: number;
//     uvi: number;
//     clouds: number;
//     visibility: number;
//     wind_speed: number;
//     wind_deg: number;
//     wind_gust: number;
//     weather: WeatherInfo[];
//     icon?: any;
// }

export interface WeatherIcon {
    id: WeatherIndication;
    image: any;
}

export interface WeatherHourlyResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: Current;
    minutely: Minutely[];
    hourly: Hourly[];
    daily: Daily[];
  }
  
  export interface WeatherHourlyResponse {
    dt: number;
    sunrise: number;
    sunset: number;
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
    weather: Weather[];
    icon?: any;
  }
  
  export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface Minutely {
    dt: number
    precipitation: number
  }
  
  export interface Hourly {
    dt: number
    temp: number
    feels_like: number
    pressure: number
    humidity: number
    dew_point: number
    uvi: number
    clouds: number
    visibility: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Weather2[]
    pop: number
  }
  
  export interface Weather2 {
    id: number
    main: string
    description: string
    icon: string
  }
  
  export interface Daily {
    dt: number
    sunrise: number
    sunset: number
    moonrise: number
    moonset: number
    moon_phase: number
    summary: string
    temp: Temp
    feels_like: FeelsLike
    pressure: number
    humidity: number
    dew_point: number
    wind_speed: number
    wind_deg: number
    wind_gust: number
    weather: Weather3[]
    clouds: number
    pop: number
    uvi: number
  }
  
  export interface Temp {
    day: number
    min: number
    max: number
    night: number
    eve: number
    morn: number
  }
  
  export interface FeelsLike {
    day: number
    night: number
    eve: number
    morn: number
  }
  
  export interface Weather3 {
    id: number
    main: string
    description: string
    icon: string
  }
  