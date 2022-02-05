import { useCallback, useEffect, useState } from 'react'
import ChatItem from '../../component/ChatItem'
import Header from '../../component/Header'
import { fetchContactList } from '../../network/message'
import { bodyOverflowHidden, bodyOverflowVisible } from '../../utils/common'
import ChatRoom from './ChatRoom'

const initContactList = [
    {
        userId: '',
        lastMessageInfo: {
            userId: '',
            message: '',
            date: '',
        },
    },
]

const Message = () => {
    const [isShow, setIsShow] = useState(false)
    const [contactList, setContactList] = useState(initContactList)
    const [contactUserId, setContactUserId] = useState('')
    const userId = localStorage.getItem('userId')

    const onShowChatRoom = (userId: string) => {
        setIsShow(true)
        setContactUserId(userId)
        bodyOverflowHidden()
    }

    const onCancelChatRoom = () => {
        setIsShow(false)
        bodyOverflowVisible()
    }

    const getContactList = useCallback(async () => {
        const result = await fetchContactList(userId as string)
        setContactList(result)
    }, [])

    useEffect(() => {
        getContactList()
    }, [])

    return (
        <div className="bg-gray-100">
            <Header />
            <div className="w-full h-20 flex justify-around items-center mb-2 bg-white">
                <div>通知</div>
                <div>赞</div>
                <div>回复</div>
                <div>关注</div>
            </div>
            <div className="bg-white">
                {contactList.map((item: any, index: number) => (
                    <ChatItem
                        key={index}
                        userId={item.userId}
                        lastMessageInfo={item.lastMessageInfo}
                        onOpenChatRoom={onShowChatRoom}
                    />
                ))}
            </div>
            <ChatRoom isShow={isShow} contactUserId={contactUserId} onCancelChatRoom={onCancelChatRoom} />
        </div>
    )
}

export default Message
