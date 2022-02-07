import { nAxios } from "."
import { IMessage } from "../model/message"

/**
 * 获取联系人列表
 * @param userId 用户Id
 * @returns 联系人列表
 */
export const fetchContactList = async (userId: string) => {
    const { data: { result } } = await nAxios.get(`/chat-record/find/userId=${userId}`)

    return result
}

/**
 * 添加聊天记录
 * @param userAId 用户Id
 * @param userBId 另一个用户Id
 * @param messageInfo 消息信息
 * @returns 修改结果状态码
 */
export const modifyRecordList = async (userAId: string, userBId: string, messageInfo: IMessage) => {
    const { data: { code } } = await nAxios.post('/chat-record/add', { userAId, userBId, messageInfo })

    return code
}

/**
 * 获取用户聊天记录
 * @param userAId 第一个用户Id
 * @param userBId 第二个用户Id
 * @returns 两个用户之间的聊天记录
 */
export const fetchRecordList = async (userAId: string, userBId: string) => {
    const { data: { result } } = await nAxios.post('/chat-record/find', { userAId, userBId})

    return result
}