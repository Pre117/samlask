import moment from 'moment'
import { useCallback, useEffect, useState } from 'react'
import MessageItem from '../../component/MessageItem'
import socket from '../../network/socket'
import { debounce } from '../../utils/common'
import avatar1 from './avatar1.webp'
import avatar2 from './avatar2.webp'

const BOTTOM_SCROLL_TOP = 1000000

const recordList = [
    {
        userId: '123',
        avatar: avatar1,
        message: '还请多多关注支持！！',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '222',
        avatar: avatar2,
        message: '还请多多关注支持，这是一个悲伤的事情，哈哈哈哈溜了溜了',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '123',
        avatar: avatar1,
        message: '还请多多关注支持！！',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '222',
        avatar: avatar2,
        message: '还请多多关注支持，这是一个悲伤的事情，哈哈哈哈溜了溜了',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '123',
        avatar: avatar1,
        message: '还请多多关注支持！！',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '222',
        avatar: avatar2,
        message: '还请多多关注支持！！',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '123',
        avatar: avatar1,
        message: '还请多多关注支持！！',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '222',
        avatar: avatar2,
        message: '还请多多关注支持！！',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '123',
        avatar: avatar1,
        message: '还请多多关注支持！！',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '222',
        avatar: avatar2,
        message: '还请多多关注支持！！',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '123',
        avatar: avatar1,
        message: '还请多多关注支持！！',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '222',
        avatar: avatar2,
        message: '还请多多关注支持，这是一个悲伤的事情，哈哈哈哈溜了溜了',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '123',
        avatar: avatar1,
        message: '还请多多关注支持！！',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
    {
        userId: '222',
        avatar: avatar2,
        message: '还请多多关注支持，这是一个悲伤的事情，哈哈哈哈溜了溜了',
        date: moment().format('YYYY-MMM-Do h:mm'),
    },
]

const ChatRoom = (props: { isShow: boolean; onCancelChatRoom: () => void }) => {
    const { isShow, onCancelChatRoom } = props
    const [message, setMessage] = useState('')
    const [chatList, setChatList] = useState(recordList)
    console.log('我被执行了')

    const onChangeMessage = (event: any) => setMessage(event.target.value)

    const onSendMessage = () => {
        console.log('message: ', message)
        const tempList = chatList
        tempList.push({
            userId: '222',
            avatar: avatar2,
            message,
            date: moment().format(),
        })
        setChatList(tempList)
        console.log(chatList)
        socket.emit('chat message', message)
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

    const onListener = () => {
        socket.on('chat message', (msg: any) => {
            console.log('transport message: ', msg)
        })
    }

    useEffect(() => {
        backToBottom()
    }, [])

    useEffect(() => {
        onListener()
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
                <div className="w-20">猫不理饺子</div>
                <div className="w-16">设置</div>
            </div>
            <div className="h-14"></div>
            <div id="chatMessageList" className="w-full h-chatRoom bg-gray-100 overflow-scroll">
                {chatList.map((item: any, index: number) => (
                    <MessageItem key={index} {...item} />
                ))}
            </div>
            <div className="h-14"></div>
            <div className={`w-full min-h-14 h-${message.length} py-2 pl-3 bg-white fixed bottom-0 text-sm shadow`}>
                <textarea
                    placeholder="请输入消息..."
                    className="w-3/4 h-10 mr-2 rounded p-2 bg-gray-50"
                    // value={message}
                    // onChange={onChangeMessage}
                />
                <button onClick={onSendMessage} className="w-1/5 h-10 text-gray-400">
                    发送
                </button>
            </div>
        </div>
    )
}

export default ChatRoom
