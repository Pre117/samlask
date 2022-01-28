import { useState } from 'react'
import { io } from 'socket.io-client'
import Header from '../../component/Header'

const Message = () => {
    const [message, setMessage] = useState('')

    const socket = io('http://localhost:9000/')

    const onSubmit = () => {
        console.log('message: ', message)
        socket.emit('chat message', message)
    }

    socket.on('chat message', (msg: any) => {
        console.log('transport message: ', msg)
    })

    return (
        <div>
            <Header />
            我是消息页面
            <input
                type="text"
                placeholder="请输入消息..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={onSubmit}>提交</button>
        </div>
    )
}

export default Message
