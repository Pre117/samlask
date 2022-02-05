import { useMemo } from 'react'
import { IMessage } from '../model/message'

const MessageItem = (props: {
    messageInfo: IMessage,
    avatar: string
}) => {
    const { messageInfo, avatar } = props

    const isOwner = useMemo(() => {
        if (messageInfo) {
            return messageInfo.userId === localStorage.getItem('userId')
        } else {
            return false
        }
    }, [messageInfo])

    return (
        <div className={`my-5 flex ${isOwner ? 'flex-row-reverse' : 'flex-row'} items-center`}>
            <div className="ml-4 mr-2 flex justify-center items-center">
                <img className="w-12 h-12 rounded-full" src={avatar} />
            </div>
            <div
                className={`w-1/2 p-2 border ${
                    isOwner ? 'rounded-l-xl rounded-br-xl' : 'rounded-r-xl rounded-bl-xl'
                } shadow-md bg-white`}
            >
                {messageInfo && messageInfo.message}
            </div>
        </div>
    )
}

export default MessageItem
