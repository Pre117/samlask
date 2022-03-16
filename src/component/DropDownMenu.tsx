import { useHistory } from 'react-router-dom';
import { goToPage } from '../utils/common';

const DropDownMenu = (props: { showDropMenu: boolean; closeDropMenu: () => void }) => {
    const { showDropMenu, closeDropMenu } = props
    const history = useHistory()

    const onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        goToPage('/', history)
    }

    const onGoToProfile = () => {
        closeDropMenu()
        goToPage('/profile', history)
    }

    const onGoToArticleEditor = () => {
        closeDropMenu()
        goToPage('/article-editor', history)
    }

    const onGoToPostEditor = () => {
        closeDropMenu()
        goToPage('/post-editor', history)
    }

    return (
        <div
            style={{ display: showDropMenu ? 'flex' : 'none' }}
            className="w-24 absolute top-14 border-y border-l rounded-l shadow bg-white flex-col items-center text-sm text-center text-gray-500"
        >
            <div className="w-full h-10 leading-10 hover:bg-gray-200" onClick={onGoToProfile}>
                我的主页
            </div>
            <div className="w-full h-10 leading-10 hover:bg-gray-200" onClick={onGoToArticleEditor}>
                写文章
            </div>
            <div className="w-full h-10 leading-10 hover:bg-gray-200" onClick={onGoToPostEditor}>
                发帖子
            </div>
            <div className="w-full h-10 leading-10 border-t" onClick={onLogout}>
                退出
            </div>
        </div>
    )
}

export default DropDownMenu
