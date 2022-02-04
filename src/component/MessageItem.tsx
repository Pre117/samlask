import { useMemo } from 'react'

const MessageItem = (props: { userId: string; avatar: string; message: string; date: string }) => {
    const { userId, avatar, message, date } = props

    const isOwner = useMemo(() => userId === localStorage.getItem('userId'), [userId])

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
                {message}
            </div>
        </div>
    )
}

export default MessageItem
