import { useCallback, useEffect, useState } from 'react'
import Header from '../../component/Header'
import { nAxios } from '../../network'
import { IUserInfo } from '../../model/user'

const initUserInfo: IUserInfo = {
    userId: '',
    username: '',
    avatar: '',
    points: '',
}

const Profile = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo>(initUserInfo)

    const getUserInfo = useCallback(async () => {
        const userId = localStorage.getItem('userId')
        const {
            data: { result },
        } = await nAxios.post('/user-info/find', { userId })
        setUserInfo({
            userId: result.userId,
            username: result.username,
            avatar: result.avatar,
            points: result.points,
        })
        console.log(result)
    }, [])

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div>
            <Header />
            我是个人主页
            <div>用户名：{userInfo.username}</div>
            <div>积分：{userInfo.points}</div>
        </div>
    )
}

export default Profile
