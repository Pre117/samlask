import { useMemo } from 'react'

const MessageItem = (props: { userId: string; avatar: string; message: string; date: string }) => {
    const { userId, avatar, message, date } = props

    const isOwner = useMemo(() => userId === '222', [userId])

    return (
        <div className={`my-5 flex justify-${isOwner ? 'end' : 'start'} items-center`}>
            {!isOwner && (
                <div className="ml-2 mr-4 flex justify-center items-center">
                    <img className="w-12 h-12 rounded-full" src={avatar} />
                </div>
            )}
            {!isOwner && (
                <div className={`w-1/2 p-2 border rounded-r-xl rounded-bl-xl shadow-md bg-white`}>
                    {message}
                </div>
            )}
            {isOwner && (
                <div className={`w-1/2 p-2 border rounded-l-xl rounded-br-xl shadow-md bg-white`}>
                    {message}
                </div>
            )}
            {isOwner && (
                <div className="ml-4 mr-2 flex justify-center items-center">
                    <img className="w-12 h-12 rounded-full" src={avatar} />
                </div>
            )}
        </div>
    )
}

export default MessageItem
