import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

const arr = new Array(50).fill('test')

const ChatRoom = (props: { isShow: boolean; onReturn: () => void }) => {
    const { isShow, onReturn } = props

    const [message, setMessage] = useState('')

    // const socket = io('http://localhost:9000/')

    // const onSubmit = () => {
    //     console.log('message: ', message)
    //     socket.emit('chat message', message)
    // }

    // socket.on('chat message', (msg: any) => {
    //     console.log('transport message: ', msg)
    // })

    const onSendMessage = () => {
        console.log(document.documentElement.scrollTop)
    }

    useEffect(() => {
        const sheight = document.documentElement.scrollTop
        // const cheight = screen.availHeight
        console.log(sheight)
        // console.log(cheight)
        if (isShow) {
            window.scrollTo(0, 468)
            console.log(sheight)
        }
    }, [isShow])

    return (
        <div
            style={{ width: isShow ? '100%' : 0 }}
            className="min-h-full absolute top-0 right-0 overflow-hidden transition-width ease-in-out duration-500"
        >
            <div className="w-full h-14 fixed top-0 bg-white flex justify-between items-center text-center shadow">
                <div className="w-16" onClick={onReturn}>
                    返回
                </div>
                <div className="w-20">猫不理饺子</div>
                <div className="w-16">设置</div>
            </div>
            <div className="w-full h-14">上面没有了...</div>
            <div id='chatMessageList' className="w-full bg-gray-100">
                {arr.map((item: any, index: number) => (
                    <li key={index}>{item}</li>
                ))}
            </div>
            <div className="w-full h-14">下面没有了...</div>
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
