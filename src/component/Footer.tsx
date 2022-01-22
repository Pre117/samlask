import { useHistory } from 'react-router-dom'
import NavButton from './NavButton'

const Footer = () => {
    const history = useHistory()

    const goToPage = (path: string) => {
        if (location.pathname !== path) history.push(path)
    }

    return (
        <div className="fixed bottom-0 w-full h-14 bg-white shadow">
            <div className="h-14 grid grid-cols-4">
                <NavButton text="首页" icon="icon-zhuye" onClick={() => goToPage('/')} />
                <NavButton text="编辑" icon="icon-bianji" onClick={() => goToPage('/reach-editor')} />
                <NavButton text="消息" icon="icon-xiaoxi" onClick={() => goToPage('/message')} />
                <NavButton text="我的" icon="icon-wode" onClick={() => goToPage('/profile')} />
            </div>
        </div>
    )
}

export default Footer
