import React, { useState } from 'react'
import { useAppDispatch } from '../../hooks'
import { userLogin } from '../../network/user'
import { setUserInfo } from '../../redux/reducers/userSlice'

const LoginPop = (props: {
    isShow: boolean
    scrollTop: number
    onCancel: () => void
    setLogin: () => void
}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const dispatch = useAppDispatch()

    const { isShow, scrollTop, onCancel, setLogin } = props

    const onLogin = async () => {
        console.log(phoneNumber, password)

        try {
            const {token, userId, code, message} = await userLogin(phoneNumber, password)

            if (code === 0) {
                localStorage.setItem('token', token)
                localStorage.setItem('userId', userId)
                // 添加到redux
                dispatch(setUserInfo({ userId, token }))
                setLogin()
            } else if (code === 1 || code === 2) {
                console.log(message)
                return
            }
        } catch (error) {
            console.error(error)
        }

        closePop()
    }

    const closePop = () => {
        setPhoneNumber('')
        setPassword('')
        onCancel()
    }

    return (
        <div
            className="absolute w-full h-full"
            style={{ display: isShow ? 'block' : 'none', top: `${scrollTop}px` }}
        >
            {/* 遮罩 */}
            <div className="w-full h-full bg-black bg-opacity-25" />
            {/* 弹窗 */}
            <div className="absolute top-1/2 left-1/2 w-80 h-72 -ml-40 -mt-36 p-7 bg-white flex flex-col items-center">
                <div className="w-64 mb-8 flex justify-between">
                    <h1 className="font-bold">手机登录</h1>
                    <div className="iconfont icon-guanbi" onClick={closePop} />
                </div>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="手机号"
                    id="phoneNumber"
                    autoComplete='off'
                    className="w-64 h-9 mb-5 p-2 border text-sm outline-none"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="密码"
                    id="password"
                    className="w-64 h-9 mb-5 p-2 border text-sm outline-none"
                />
                <button
                    className="w-64 h-9 bg-green-500 text-center text-white text-sm leading-9"
                    onClick={onLogin}
                >
                    登录
                </button>
            </div>
        </div>
    )
}

export default React.memo(LoginPop)
