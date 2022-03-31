import { useCallback, useEffect, useState } from 'react'
import Header from '../../component/Header'
import { nAxios } from '../../network'
import { IUserInfo } from '../../model/user'
import { fetchUserInfo } from '../../network/user'

const initUserInfo: IUserInfo = {
    userId: '',
    username: '',
    avatar: '',
    points: '',
}

const Profile = () => {
    const [userInfo, setUserInfo] = useState<IUserInfo>(initUserInfo)

    const getUserInfo = useCallback(async () => {
        const userId = localStorage.getItem('userId') as string
        const result = await fetchUserInfo(userId)
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
        <div className="bg-gray-100">
            <Header />
            <div className="mt-8 p-6 bg-white flex flex-col items-center">
                <div className="w-24 h-24">
                    <img src={userInfo.avatar} className="rounded-full" />
                </div>
                <div className='text-lg my-4'>{userInfo.username}</div>
                <div className='w-full flex justify-around'>
                    <div>
                        <div>0</div>
                        <div className='text-sm text-gray-400'>关注</div>
                    </div>
                    <div>
                        <div>0</div>
                        <div className='text-sm text-gray-400'>关注者</div>
                    </div>
                    <div>
                        <div>{userInfo.points}</div>
                        <div className='text-sm text-gray-400'>积分</div>
                    </div>
                    <div className='w-20 h-8 border text-center'>设置</div>
                </div>
            </div>
            我是个人主页
            <div>用户名：{userInfo.username}</div>
            <div>积分：{userInfo.points}</div>
        </div>
    )
}

export default Profile
