import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ChatItem from '../../component/ChatItem'
import Header from '../../component/Header'
import { useAppSelector } from '../../hooks'
import { fetchContactList } from '../../network/message'
import { userSelector } from '../../redux/reducers/userSlice'
import { bodyOverflowHidden, bodyOverflowVisible, goToPage } from '../../utils/common'
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
    const { userId } = useAppSelector(userSelector)
    const history = useHistory()


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
        const result = await fetchContactList(userId)
        setContactList(result)
    }, [])

    useEffect(() => {
        getContactList()
    }, [])

    return (
        <div className="bg-gray-100">
            <Header />
            <div className="w-full h-20 flex justify-around items-center mb-2 bg-white">
                <div onClick={() => goToPage('/notification', history)}>通知</div>
                <div onClick={() => goToPage('/thumbsup-record', history)}>赞</div>
                <div onClick={() => goToPage('/reply-record', history)}>回复</div>
                <div onClick={() => goToPage('/follow-record', history)}>关注</div>
            </div>
            <div className="bg-white">
                { contactList.length !== 0 ? contactList.map((item: any, index: number) => (
                    <ChatItem
                        key={index}
                        userId={item.userId}
                        lastMessageInfo={item.lastMessageInfo}
                        onOpenChatRoom={onShowChatRoom}
                    />
                )) : (<div className='pt-10 text-center'>暂无联系人</div>)}
            </div>
            <ChatRoom isShow={isShow} contactUserId={contactUserId} onCancelChatRoom={onCancelChatRoom} />
        </div>
    )
}

export default Message
