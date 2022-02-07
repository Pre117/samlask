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
    const { data: { result } } = await nAxios.post('/user-info/find', { userId })

    return result
}