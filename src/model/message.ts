// 消息
export interface IMessage {
    userId: string,
    message: string,
    date: string
}

export interface IMessageItem {
    avatar: string,
    messageInfo: IMessage
}