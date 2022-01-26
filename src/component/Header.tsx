import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../iconfont/NavButtonIcon.css'
import { goToPage } from '../utils/common'
import Pop from './Pop'

const Header = () => {
    const [showPop, setShowPop] = useState(false)

    const onPop = () => {
        setShowPop(true)
    }

    const onCancel = () => {
        setShowPop(false)
    }

    const history = useHistory()

    return (
        <div>
            <div className="fixed top-0 w-full h-14 flex justify-end items-center shadow bg-white">
                <div onClick={() => goToPage('/', history)} className="mr-4">
                    首页
                </div>
                <input
                    type="text"
                    placeholder="探索"
                    className="w-24 h-8 ml-20 pl-3 py-1 text-sm bg-gray-100 rounded-l"
                />
                <div className="iconfont icon-sousuo w-8 h-8 mr-5 text-sm text-center leading-8 bg-gray-100 rounded-r" />
                {/* <div
                    onClick={() => goToPage('/message', history)}
                    className="iconfont icon-xiaoxi mr-6"
                />
                <div
                    onClick={() => goToPage('/profile', history)}
                    className="iconfont icon-wode mr-4 w-8 h-8 border rounded-full text-center bg-gray-300"
                /> */}
                <div 
                    onClick={onPop}
                    className="w-16 h-8 mr-5 bg-green-500 text-white text-sm text-center leading-8 rounded"
                >
                    登录
                </div>
            </div>
            <div className="h-14"></div>
            <Pop isShow={showPop} onCancel={onCancel} />
        </div>
    )
}

export default Header
