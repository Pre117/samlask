import { useState } from 'react'
import ChatItem from '../../component/ChatItem'
import Header from '../../component/Header'
import { bodyOverflowHidden, bodyOverflowVisible } from '../../utils/common'
import ChatRoom from './ChatRoom'
import avatar from './getAvatar.jpg'

const Message = () => {
    const [isShow, setIsShow] = useState(false)
    const [scrollTop, setScrollTop] = useState(0)

    const onShowChatRoom = () => {
        setIsShow(true)
        // console.log(document.documentElement.scrollTop)
        setScrollTop(document.documentElement.scrollTop)
        // bodyOverflowHidden()
    }

    const onCancelChatRoom = () => {
        setIsShow(false)
        document.documentElement.scrollTop = scrollTop
        console.log(document.documentElement.scrollTop)
        // bodyOverflowVisible()
    }

    const chatProps = {
        username: '猫不理饺子',
        imgUrl: avatar,
        lastMessage: '这是最后！！欧打首付款，金阿奎龙卷风撒放假啦阿拉斯加疯狂拉师傅金坷垃',
        date: '01-12',
        onOpenChatRoom: onShowChatRoom,
    }

    const arr = new Array(20).fill(chatProps)

    return (
        <div
            style={{
                height: isShow ? '100vh' : 'auto',
            }}
            className="w-full bg-gray-100 overflow-hidden"
        >
            <Header />
            <div className="w-full h-20 flex justify-around items-center mb-2 bg-white">
                <div>通知</div>
                <div>赞</div>
                <div>回复</div>
                <div>关注</div>
            </div>
            <div className="bg-white">
                {arr.map((item: any, index: number) => (
                    <ChatItem key={index} {...item} />
                ))}
            </div>
            <ChatRoom isShow={isShow} onReturn={onCancelChatRoom} />
        </div>
    )
}

export default Message
