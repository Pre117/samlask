import { nAxios } from './index'

export const userLogin = async (phoneNumber: string, password: string) => {
    const { data } = await nAxios.post('/user/login', { phoneNumber, password })

    return data
}

/**
 * 获取用户信息
 * @param userId 用户Id
 * @returns 用户信息
 */
export const fetchUserInfo = async (userId: string) => {
    const {
        data: { result },
    } = await nAxios.post('/user-info/find', { userId })

    return result
}
/**
 * 获取用户点赞信息
 * @param userId 用户Id
 * @returns 用户点赞信息
 */
export const fetchUserLike = async (userId: string) => {
    const { data } = await nAxios.get(`/like/find/userId=${userId}`)

    return data
}
/**
 * 修改用户点赞记录
 * @param likeId 用户点赞记录Id
 * @param articleLikeList: 
 * @returns 修改结果状态码
 */
export const modifyUserLike = async (likeId: string, articleLikeList: []) => {
    const {
        data: { code },
    } = await nAxios.post('/like/update', { likeId, articleLikeList })

    return code
}
