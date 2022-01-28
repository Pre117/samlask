import { useState } from 'react'
import ChatItem from '../../component/ChatItem'
import Header from '../../component/Header'
import avatar from './getAvatar.jpg'

const chatProps = {
    username: '猫不理饺子',
    imgUrl: avatar,
    lastMessage: '这是最后！！欧打首付款，金阿奎龙卷风撒放假啦阿拉斯加疯狂拉师傅金坷垃',
    date: '01-12'
}

const arr = new Array(20).fill(chatProps)

const Message = () => {
    const [message, setMessage] = useState('')


    // const socket = io('http://localhost:9000/')

    // const onSubmit = () => {
    //     console.log('message: ', message)
    //     socket.emit('chat message', message)
    // }

    // socket.on('chat message', (msg: any) => {
    //     console.log('transport message: ', msg)
    // })

    return (
        <div className="bg-gray-100">
            <Header />
            <div className="w-full h-20 flex justify-around items-center mb-2 bg-white">
                <div>通知</div>
                <div>赞</div>
                <div>回复</div>
                <div>关注</div>
            </div>
            <div className='bg-white'>
                {
                    arr.map((item: any, index: number) => (
                        <ChatItem key={index} {...item} />
                    ))
                }
                {/* <input
                    type="text"
                    placeholder="请输入消息..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button onClick={onSubmit}>提交</button> */}
            </div>
        </div>
    )
}

export default Message
