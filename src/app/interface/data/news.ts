import { SafeUrl } from "@angular/platform-browser";

export interface NewsResponse {
    status: string;
    totalResults: number;
    articles: Article[]
}

export interface Article {
    source: {
        id: string;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ArticleConfig {
    id: string;
    article: Article;
    imageUrl?: SafeUrl;
}

export interface ArticlesByCategory {
    articles: Article[],
    category: string;
}