export interface NewsObject {
    source: SourceObject,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}

export interface SourceObject {
    id: string,
    name: string,
}