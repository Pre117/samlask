import { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import '../iconfont/NavButtonIcon.css'
import { fetchUserInfo } from '../network/user'
import { userSelector } from '../redux/reducers/userSlice'
import { bodyOverflowHidden, bodyOverflowVisible, goToPage } from '../utils/common'
import DropDownMenu from './DropDownMenu'
import LoginPop from './Pop/LoginPop'

const Header = () => {
    const [showPop, setShowPop] = useState(false)
    const [showDropMenu, setShowDropMenu] = useState(false)
    const [isLogin, setIsLogin] = useState(localStorage.getItem('token') ? true : false)
    const [scrollTop, setScrollTop] = useState(0)
    const [avatar, setAvatar] = useState('')
    const history = useHistory()
    const { userId } = useAppSelector(userSelector)

    // 打开弹窗
    const onPop = () => {
        // 获取当前窗口距文档顶部的距离
        setScrollTop(document.documentElement.scrollTop)
        setShowPop(true)
        // 将溢出内容隐藏来阻止弹窗出行时的页面滚动
        bodyOverflowHidden()
    }

    // 关闭弹窗，传给子组件Pop
    const onCancel = useCallback(() => {
        setShowPop(false)
        // 恢复默认值
        bodyOverflowVisible()
    }, [])

    // 确认登录状态，传给子组件Pop
    const setLogin = useCallback(() => {
        setIsLogin(true)
    }, [])

    const getUserInfo = async () => {
        const { avatar } = await fetchUserInfo(userId)
        
        setAvatar(avatar)
    }

    useEffect(() => {
        getUserInfo()
    }, [])

    return (
        <div>
            <div className="fixed top-0 w-full h-14 border-b shadow bg-white dark:bg-dark-head dark:text-gray-300 dark:border-dark-icon">
                <div className="sm:w-4/5 md:w-4/5 lg:w-3/5 xl:w-2/5 h-full m-auto flex justify-evenly items-center">
                    <div onClick={() => goToPage('/', history)} className="mx-3">
                        首页
                    </div>
                    <div className="flex">
                        <input
                            type="text"
                            placeholder="探索"
                            className="w-24 h-8 ml-20 pl-3 py-1 text-sm bg-gray-100 dark:bg-dark-fill rounded-l outline-none focus:w-36 focus:ml-8 transition-width duration-500 ease-in-out"
                        />
                        <div className="iconfont icon-sousuo w-8 h-8 mr-5 text-sm text-center leading-8 bg-gray-100 dark:bg-dark-fill rounded-r" />
                    </div>

                    <div className="flex">
                        <div
                            style={{ display: isLogin ? 'block' : 'none' }}
                            onClick={() => goToPage('/message', history)}
                            className="iconfont icon-xiaoxi mr-6 self-center"
                        />
                        <div
                            style={{ display: isLogin ? 'block' : 'none' }}
                            onClick={() => setShowDropMenu(showDropMenu ? false : true)}
                            className="mr-4 w-8 h-8 rounded-full"
                        >
                            <img className='rounded-full' src={avatar} />
                        </div>
                        <div
                            style={{ display: isLogin ? 'none' : 'block' }}
                            onClick={onPop}
                            className="w-16 h-8 mr-5 bg-green-500 text-white text-sm text-center leading-8 rounded"
                        >
                            登录
                        </div>
                        <DropDownMenu
                            showDropMenu={showDropMenu}
                            closeDropMenu={() => setShowDropMenu(false)}
                        />
                    </div>
                </div>
            </div>
            <div className="h-14"></div>
            <LoginPop
                isShow={showPop}
                scrollTop={scrollTop}
                onCancel={onCancel}
                setLogin={setLogin}
            />
        </div>
    )
}

export default Header
