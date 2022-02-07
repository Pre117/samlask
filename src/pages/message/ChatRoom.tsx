import { useCallback, useEffect, useMemo, useState } from 'react'
import MessageItem from '../../component/MessageItem'
import { IMessage, IMessageItem } from '../../model/message'
import { IUserInfo } from '../../model/user'
import { fetchRecordList, modifyRecordList } from '../../network/message'
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
    const userId = localStorage.getItem('userId') as string

    const onChangeMessage = (event: any) => setMessage(event.target.value)

    const onSendMessage = async () => {
        const messageInfo = {
            userId: userId,
            message,
            date: '2022/2/6',
        }

        setRecordList([
            ...recordList,
            {
                avatar: avatarA,
                messageInfo
            },
        ])
        setMessage('')
        socket.emit('private message', userId, contactUserId, messageInfo)

        const code = await modifyRecordList(userId, contactUserId, messageInfo)

        console.log(code === 0 ? '修改成功' : '修改失败')
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
            const userInfoA = await fetchUserInfo(userId)
            const userInfoB = await fetchUserInfo(contactUserId)
            setUserInfo(userInfoB)

            setAvatarA(userInfoA.avatar)
            setAvatarB(userInfoB.avatar)
        }
    }, [contactUserId])

    // 获取两个用户的聊天纪录
    const getRecordList = useCallback(async () => {
        if (contactUserId && avatarA && avatarB) {
            const result = await fetchRecordList(userId, contactUserId)

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

    // 获取输入框的高度
    const getTextRow = useMemo(() => {
        const row = Math.ceil((message.length + 1) / 25) + (message.match(/\n/g)?.length || 0)
        return row < 5 ? row : 5
    }, [message])

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
    }, [recordList])

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
            <div id="chatMessageList" className="w-full h-chatRoom bg-gray-100 overflow-x-hidden overflow-y-scroll">
                {recordList.map((item: any, index: number) => (
                    <MessageItem key={index} {...item} />
                ))}
            </div>
            <div className="h-14"></div>
            <div
                className={`fixed bottom-0 w-full min-h-14 px-4 py-2 flex justify-around bg-white shadow`}
            >
                <textarea
                    placeholder="请输入消息..."
                    maxLength={120}
                    rows={getTextRow}
                    className='w-4/5 p-2 mr-4 resize-none border rounded'
                    value={message}
                    onChange={onChangeMessage}
                />
                <button onClick={onSendMessage} className="w-1/5 h-10 mb-px self-end border rounded text-sm text-white bg-green-500">
                    发送
                </button>
            </div>
        </div>
    )
}

export default ChatRoom
