import { useCallback, useState } from 'react'
import { useHistory } from 'react-router-dom'
import '../iconfont/NavButtonIcon.css'
import { bodyOverflowHidden, bodyOverflowVisible, goToPage } from '../utils/common'
import Pop from './Pop'
import DropDownMenu from './DropDownMenu'

const Header = () => {
    const [showPop, setShowPop] = useState(false)
    const [showDropMenu, setShowDropMenu] = useState(false)
    const [isLogin, setIsLogin] = useState(localStorage.getItem('token') ? true : false)
    const [scrollTop, setScrollTop] = useState(0)
    const history = useHistory()

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
                {isLogin && (
                    <div
                        onClick={() => goToPage('/message', history)}
                        className="iconfont icon-xiaoxi mr-6"
                    />
                )}
                {isLogin && (
                    <div
                        onClick={() => setShowDropMenu(showDropMenu ? false : true)}
                        className="iconfont icon-wode mr-4 w-8 h-8 border rounded-full text-center bg-gray-300"
                    />
                )}
                {!isLogin && (
                    <div
                        onClick={onPop}
                        className="w-16 h-8 mr-5 bg-green-500 text-white text-sm text-center leading-8 rounded"
                    >
                        登录
                    </div>
                )}
                <DropDownMenu showDropMenu={showDropMenu} />
            </div>
            <div className="h-14"></div>
            <Pop isShow={showPop} scrollTop={scrollTop} onCancel={onCancel} setLogin={setLogin} />
        </div>
    )
}

export default Header
