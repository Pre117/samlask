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
        <div className="h-full bg-gray-100">
            <Header />
            <div className="mt-8 mb-6 p-6 bg-white flex flex-col items-center">
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
                    <div className='w-20 h-8 leading-8 border border-green-400 rounded text-green-500 text-center text-sm self-center'>设置</div>
                </div>
            </div>
            <div className='bg-white'>
                <div className='h-8'>

                </div>
                <div></div>
            </div>
        </div>
    )
}

export default Profile
