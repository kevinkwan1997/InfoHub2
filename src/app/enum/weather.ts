export enum WeatherUrlInfo {
    API_KEY = 'b22fdf832ac62d03d6cece72af4faa5f',
    URL_BASE = 'https://api.openweathermap.org/data/2.5/',
    IMG_URL_BASE = 'http://openweathermap.org/img/wn/'
}

export enum WeatherDataTypes {
    CURRENT_WEATHER = 'weather?',
    FORECAST_HOURLY= 'onecall?'
}

export enum WeatherQueryParams {
    APP_ID = 'appid=',
    ZIP_US = 'zip={{zipCode}},us&',
    LAT = 'lat={{latitude}}&',
    LON = 'lon={{longitude}}&',
    EXCLUDE_CURRENT = 'exclude=current&',
    METRIC_UNIT = 'units=metric&',
    IMPERIAL_UNIT = 'units=imperial&'
}

export enum WeatherIndication {
    CLOUDS = 'Clouds',
    CLEAR = 'Clear',
    SNOW = 'Snow',
    RAIN = 'Rain',
    DRIZZLE = 'Drizzle',
    THUNDERSTORM = 'Thunderstorm',
    FOG = 'Fog',
}