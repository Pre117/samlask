// 点赞
export interface ILike {
    userId: string,
    date: string
}


// 文章详情
export interface IArticleInfo {
    classification?: number,
    tags?: string[],
    abstract?: string,
    title?: string,
    content?: string,
    date?: string,
    views?: number,
    likes?: ILike[],
    commentIds?: string[],
    collectors?: string[],
}
// 文章元信息
export interface IArticleMetaInfo {
    userId: string,
    classification: string,
    tag: string[],
    abstract: string,
    title: string,
    content: string
}
// 文章列表项信息
export interface IArticleListItemInfo {
    articleId: string
    username: string
    date: string
    tags: string[]
    title: string
    abstract: string,
    views: number,
    likes: ILike[],
    commentCount: number,
    collectorCount: number
}