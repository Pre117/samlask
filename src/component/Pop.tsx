import React, { useState } from 'react'
import { nAxios } from '../network/index'

const Pop = (props: {
    isShow: boolean
    scrollTop: number
    onCancel: () => void
    setLogin: () => void
}) => {
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')

    const { isShow, scrollTop, onCancel, setLogin } = props

    const onLogin = async () => {
        console.log(phoneNumber, password)

        try {
            const { data } = await nAxios.post('/user/login', {
                phoneNumber,
                password,
            })

            console.log(data)

            if (data.code === 0) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('userId', data.userId)
                setLogin()
            } else if (data.code === 1 || data.code === 2) {
                console.log(data.message)
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
                    className="w-64 h-9 mb-5 p-2 border text-sm"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="密码"
                    id="password"
                    className="w-64 h-9 mb-5 p-2 border text-sm"
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

export default React.memo(Pop)
