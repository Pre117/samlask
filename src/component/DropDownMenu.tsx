import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { goToPage } from '../utils/common';

const DropDownMenu = (props: { showDropMenu: boolean; closeDropMenu: () => void }) => {
    const { showDropMenu, closeDropMenu } = props
    const [theme, setTheme] = useState(localStorage.getItem('theme') as string)
    const history = useHistory()

    const onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        goToPage('/', history)
    }

    const closeAndGo = (url: string) => {
        closeDropMenu()
        goToPage(url, history)
    }

    const isDark = useMemo(() => theme === 'dark', [theme])

    const onChangeTheme = () => {
        setTheme(isDark ? 'light' : 'dark')
    }

    useEffect(() => {
        localStorage.setItem('theme', theme)
        if (isDark) {
            document.documentElement.classList.add('dark')
        } else {
            document.documentElement.classList.remove('dark')
        }
    }, [theme])

    return (
        <div
            style={{ display: showDropMenu ? 'flex' : 'none' }}
            className="w-24 absolute top-14 right-0 border-y border-l rounded-l shadow bg-white dark:bg-dark-head dark:text-dark-text dark:border-dark-icon flex-col items-center text-sm text-center text-gray-500"
        >
            <div
                className="w-full h-10 leading-10 hover:bg-gray-200"
                onClick={() => closeAndGo('/profile')}
            >
                我的主页
            </div>
            <div
                className="w-full h-10 leading-10 hover:bg-gray-200"
                onClick={() => closeAndGo('/article-editor')}
            >
                写文章
            </div>
            <div
                className="w-full h-10 leading-10 hover:bg-gray-200"
                onClick={() => closeAndGo('/post-editor')}
            >
                发帖子
            </div>
            <div className="w-full h-10 leading-10" onClick={onChangeTheme}>
                {isDark ? '日间模式' : '夜间模式'}
            </div>
            <div className="w-full h-10 leading-10 border-t dark:border-dark-icon" onClick={onLogout}>
                退出
            </div>
        </div>
    )
}

export default DropDownMenu
