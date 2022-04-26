
// 文章详情
export interface IArticleInfo {
    userId: string,
    username: string,
    classification: number,
    tags: string[],
    abstract: string,
    title: string,
    content: string,
    date: string,
    views?: number,
    likes?: string[],
    commentIds?: string[],
    collectors?: string[],
}

export interface IArticleMetaInfo {
    userId: string,
    classification: string,
    tag: string[],
    abstract: string,
    title: string,
    content: string
}