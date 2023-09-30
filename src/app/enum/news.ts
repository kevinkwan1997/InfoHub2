export enum NewsUrlInfo {
    API_KEY = '3688e3a78f7a45e1b978b3f6304d5442',
    BASE_URL = 'https://newsapi.org/v2/',
}

export enum NewsQueryParams {
    HEADLINES = 'top-headlines?',
    COUNTRY = 'country={{country}}&',
    KEY = 'apiKey=' + NewsUrlInfo.API_KEY,
}