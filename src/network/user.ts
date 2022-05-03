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
 * @param articleList: 用户点赞过的文章Id列表
 * @returns 修改结果状态码
 */
export const modifyUserLike = async (likeId: string, articleList: string[]) => {
    const {
        data: { code },
    } = await nAxios.post('/like/update', { likeId, articleList })

    return code
}
/**
 * 查询用户收藏集
 * @param userId 用户Id
 * @returns 用户收藏集
 */
export const fetchUserCollector = async (userId: string) => {
    const { data } = await nAxios.get(`/collector/find/userId=${userId}`)

    return data
}
/**
 * 收藏或取消收藏
 * @param collectorId 收藏集Id
 * @param articleList 收藏文章Id列表
 * @returns 修改结果状态码
 */
 export const modifyUserCollector = async (collectorId: string, articleList: string[]) => {
    const { data: { code } } = await nAxios.post('/collector/update', { collectorId, articleList })

    return code
}
