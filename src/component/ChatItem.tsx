const ChatItem = (props: {
    username: string
    imgUrl: string
    lastMessage: string
    date: string
    onOpenChatRoom: () => void
}) => {
    const { username, imgUrl, lastMessage, date, onOpenChatRoom } = props

    return (
        <div onClick={onOpenChatRoom} className="w-full h-16 flex">
            <div className="pl-2 flex justify-center items-center">
                <img className="w-12 h-12 mr-1 rounded-full" src={imgUrl} />
            </div>
            <div className="w-5/6 p-2 flex flex-col justify-between border-b">
                <div className="flex justify-between tracking-wide">
                    <div>{username}</div>
                    <div className="text-sm text-gray-600">{date}</div>
                </div>
                <div className="text-sm text-gray-600  truncate">{lastMessage}</div>
            </div>
        </div>
    )
}

export default ChatItem
