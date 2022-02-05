import { useCallback, useEffect, useState } from 'react'
import { fetchUserInfo } from '../network/user'
import { IUserInfo } from '../model/user'
import { IMessage } from '../model/message'

const initUserInfo: IUserInfo = {
    userId: '',
    username: '',
    avatar: '',
    points: '',
}

const ChatItem = (props: {
    userId: string
    lastMessageInfo: IMessage
    onOpenChatRoom: (userId: string) => void
}) => {
    const { userId, lastMessageInfo, onOpenChatRoom } = props
    const [userInfo, setUserInfo] = useState(initUserInfo)

    const getUserInfo = useCallback(async () => {
        // 这里一定要有条件判断，
        // 否则会因userId为空导致的：在组件销毁阶段请求还未结束
        // 当请求结束时要执行setState操作，已无法获取组件信息
        if (userId !== '') {
            const result = await fetchUserInfo(userId)
            setUserInfo(result)
        }
    }, [userId])

    useEffect(() => {
        getUserInfo()
    }, [userId])

    return (
        <div onClick={() => onOpenChatRoom(userId)} className="w-full h-16 flex">
            <div className="pl-2 flex justify-center items-center">
                <img className="w-12 h-12 mr-1 rounded-full" src={userInfo.avatar} />
            </div>
            <div className="w-5/6 p-2 flex flex-col justify-between border-b">
                <div className="flex justify-between tracking-wide">
                    <div>{userInfo.username}</div>
                    <div className="text-sm text-gray-600">{lastMessageInfo.date}</div>
                </div>
                <div className="text-sm text-gray-600  truncate">{lastMessageInfo.message}</div>
            </div>
        </div>
    )
}

export default ChatItem
