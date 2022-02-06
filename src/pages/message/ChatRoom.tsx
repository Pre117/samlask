import { useCallback, useEffect, useState } from 'react'
import MessageItem from '../../component/MessageItem'
import { IMessage, IMessageItem } from '../../model/message'
import { IUserInfo } from '../../model/user'
import { fetchRecordList } from '../../network/message'
import socket from '../../network/socket'
import { fetchUserInfo } from '../../network/user'

const BOTTOM_SCROLL_TOP = 1000000

const initReceiveMessage: IMessage = {
    userId: '',
    message: '',
    date: ''
}

const initMessageRecord: IMessageItem[] = [
    {
        avatar: '',
        messageInfo: {
            userId: '',
            message: '',
            date: '',
        },
    },
]

const initUserInfo: IUserInfo = {
    userId: '',
    username: '',
    avatar: '',
    points: '',
}

const ChatRoom = (props: {
    isShow: boolean
    contactUserId: string
    onCancelChatRoom: () => void
}) => {
    const { isShow, contactUserId, onCancelChatRoom } = props
    const [message, setMessage] = useState('')
    const [receiveMessage, setReceiveMessage] = useState<IMessage>(initReceiveMessage)
    const [recordList, setRecordList] = useState<IMessageItem[]>(initMessageRecord)
    const [userInfo, setUserInfo] = useState<IUserInfo>(initUserInfo)
    const [avatarA, setAvatarA] = useState('')
    const [avatarB, setAvatarB] = useState('')
    const userId = localStorage.getItem('userId')

    const onChangeMessage = (event: any) => setMessage(event.target.value)

    const onSendMessage = () => {
        setRecordList([
            ...recordList,
            {
                avatar: avatarA,
                messageInfo: {
                    userId: userId as string,
                    message,
                    date: '2022/2/6',
                },
            },
        ])
        setMessage('')
        // socket.emit(`origin: ${userId}, destination: ${contactUserId}`, {
        //     userId: userId as string,
        //     message,
        //     date: '2022/2/6',
        // })
        socket.emit('private message', userId, contactUserId, {
            userId: userId as string,
            message,
            date: '2022/2/6',
        })
        backToBottom()
    }

    // 滚动到底部
    const backToBottom = () =>
        document.querySelector('#chatMessageList')?.scrollTo(0, BOTTOM_SCROLL_TOP)

    const onReturn = () => {
        setTimeout(() => {
            backToBottom()
        }, 1000)
        onCancelChatRoom()
    }

    // 监听另一个用户发来的消息
    const onListener = () => {
        if (contactUserId !== '') {
            // socket.on(`origin: ${contactUserId}, destination: ${userId}`, (msg: any) => {
            //     console.log(`transport ${contactUserId} message: `, msg)
            //     if (userId !== msg.userId) {
            //         setReceiveMessage(msg)
            //     }
            // })
            socket.on('chat message', (msg: any) => {
                console.log(`transport ${contactUserId} message: `, msg)
                if (userId !== msg.userId) {
                    setReceiveMessage(msg)
                }
            })
        }
    }

    // 获取两个用户的头像、另一个用户的信息
    const getAvatar = useCallback(async () => {
        if (contactUserId !== '') {
            const userInfoA = await fetchUserInfo(userId as string)
            const userInfoB = await fetchUserInfo(contactUserId)
            setUserInfo(userInfoB)

            setAvatarA(userInfoA.avatar)
            setAvatarB(userInfoB.avatar)
        }
    }, [contactUserId])

    // 获取两个用户的聊天纪录
    const getRecordList = useCallback(async () => {
        if (contactUserId && avatarA && avatarB) {
            const result = await fetchRecordList(userId as string, contactUserId)

            const newList = result.messageRecord.map((item: any) => {
                if (item.userId === userId) {
                    return {
                        avatar: avatarA,
                        messageInfo: item,
                    }
                } else if (item.userId === contactUserId) {
                    return {
                        avatar: avatarB,
                        messageInfo: item,
                    }
                }
            })
            setRecordList(newList)
        }
    }, [contactUserId, avatarA, avatarB])

    useEffect(() => {
        getAvatar()
    }, [contactUserId])

    useEffect(() => {
        getRecordList()
    }, [contactUserId, avatarA, avatarB])

    useEffect(() => {
        setRecordList([
            ...recordList,
            {
                avatar: avatarB,
                messageInfo: receiveMessage
            }
        ])
    }, [receiveMessage])

    useEffect(() => {
        backToBottom()
    }, [])

    useEffect(() => {
        onListener()
    }, [contactUserId])

    useEffect(() => {
        socket.emit('new user enter', userId)
    }, [])

    return (
        <div
            style={{ right: isShow ? 0 : '-100%' }}
            className="w-full h-full fixed top-0 overflow-hidden transition-right ease-in-out duration-500"
        >
            <div className="w-full h-14 fixed top-0 bg-white flex justify-between items-center text-center shadow">
                <div className="w-16" onClick={onReturn}>
                    返回
                </div>
                <div className="w-20">{userInfo.username}</div>
                <div className="w-16">设置</div>
            </div>
            <div className="h-14"></div>
            <div id="chatMessageList" className="w-full h-chatRoom bg-gray-100 overflow-scroll">
                {recordList.map((item: any, index: number) => (
                    <MessageItem key={index} {...item} />
                ))}
            </div>
            <div className="h-14"></div>
            <div
                className={`w-full min-h-14 h-${message.length} py-2 pl-3 bg-white fixed bottom-0 text-sm shadow`}
            >
                <textarea
                    placeholder="请输入消息..."
                    className="w-3/4 h-10 mr-2 rounded p-2 bg-gray-50"
                    value={message}
                    onChange={onChangeMessage}
                />
                <button onClick={onSendMessage} className="w-1/5 h-10 text-gray-400">
                    发送
                </button>
            </div>
        </div>
    )
}

export default ChatRoom
