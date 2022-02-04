import { useHistory } from 'react-router-dom'
import { goToPage } from '../utils/common'

const DropDownMenu = (props: { showDropMenu: boolean }) => {
    const { showDropMenu } = props
    const history = useHistory()

    const onLogout = () => {
        localStorage.removeItem('token')
        goToPage('/', history)
    }

    return (
        <div
            style={{ display: showDropMenu ? 'block' : 'none' }}
            className="w-24 h-24 absolute top-14 border bg-white flex flex-col justify-between divide-y text-sm text-gray-500"
        >
            <div onClick={() => goToPage('/profile', history)}>我的主页</div>
            <div onClick={onLogout}>退出</div>
        </div>
    )
}

export default DropDownMenu
