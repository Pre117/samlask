// 文章详情
export interface IArticleInfo {
    userId: string,
    title: string,
    content: string,
    date: string,
    views?: number,
    likes?: string[],
    commentIds?: string[],
    collectors?: string[],
    tags?: string[]
}