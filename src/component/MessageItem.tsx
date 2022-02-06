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
        <div className={`my-8 flex ${isOwner ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`${isOwner ? 'ml-4 mr-2' : 'ml-2 mr-4'} -translate-y-3 flex justify-center items-start`}>
                <img className="w-12 h-12 rounded-full" src={avatar} />
            </div>
            <div
                className={`max-w-3/5 p-3 ${
                    isOwner ? 'rounded-l-xl rounded-br-xl' : 'rounded-r-xl rounded-bl-xl'
                } shadow-md bg-white break-all`}
            >
                {messageInfo && messageInfo.message}
            </div>
        </div>
    )
}

export default MessageItem
