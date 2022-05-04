// 用户信息
export interface IUserInfo {
    userId?: string,
    username?: string,
    avatar?: string,
    points?: string,
    following?: string[],
    followers?: string[]
}

export interface IUserMetaInfo {
    userId: string,
    token: string
}