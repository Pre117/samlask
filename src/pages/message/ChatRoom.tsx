import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const BOTTOM_SCROLL_TOP = 1000000

const arr = new Array(100).fill('test')

const ChatRoom = (props: { isShow: boolean; onCancelChatRoom: () => void }) => {
    const { isShow, onCancelChatRoom } = props
    const [message, setMessage] = useState('')

    // const socket = io('http://localhost:9000/')

    // const onSubmit = () => {
    //     console.log('message: ', message)
    //     socket.emit('chat message', message)
    // }

    // socket.on('chat message', (msg: any) => {
    //     console.log('transport message: ', msg)
    // })

    const onReturn = () => {
        // 退回到滚动条底部
        document.querySelector('#chatMessageList')?.scrollTo(0, BOTTOM_SCROLL_TOP)
        onCancelChatRoom()
    }

    const onSendMessage = () => {}

    return (
        <div
            style={{ width: isShow ? '100%' : 0 }}
            className="h-full fixed right-0 top-0 overflow-hidden transition-width ease-in-out duration-500"
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
                {arr.map((item: any, index: number) => (
                    <div key={index} className="h-8 border text-center">
                        {item}, {index}
                    </div>
                ))}
            </div>
            <div className="h-14"></div>
            <div className="w-full h-14 py-2 pl-3 bg-white fixed bottom-0 text-sm shadow">
                <input
                    type="text"
                    placeholder="请输入消息..."
                    className="w-3/4 h-10 mr-2 rounded p-2 bg-gray-50"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={onSendMessage} className="w-1/5 h-10 text-gray-400">
                    发送
                </button>
            </div>
        </div>
    )
}

export default ChatRoom
