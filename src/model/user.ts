export interface IFollow {
    userId: string,
    date: string
}

// 用户信息
export interface IUserInfo {
    userId?: string,
    username?: string,
    avatar?: string,
    points?: string,
    following?: IFollow[],
    followers?: IFollow[]
}

export interface IUserMetaInfo {
    userId: string,
    token: string
}