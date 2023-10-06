export enum NewsUrlInfo {
    API_KEY = '3688e3a78f7a45e1b978b3f6304d5442',
    BASE_URL = 'https://newsapi.org/v2/',
    EVERYTHING = 'everything?',
    HEADLINES = 'top-headlines?',
}

export enum NewsQueryParams {
    COUNTRY = 'country={{country}}&',
    KEY = 'apiKey=' + NewsUrlInfo.API_KEY,
    QUERY = 'q={{query}}&'
}

export enum NewsBaseCategories {
    SPORTS = 'sports',
    TECH = 'technology',
    ECONOMY = 'economy',
    POLITICS = 'politics',
    SCIENCE = 'science',
    GEOLOGY = 'geology',
}