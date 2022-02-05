import { nAxios } from './index'

/**
 * 获取用户信息
 * @param userId 用户Id
 * @returns 用户信息
 */
export const fetchUserInfo = async (userId: string) => {
    const { data: { result } } = await nAxios.post('/user-info/find', { userId })

    return result
}