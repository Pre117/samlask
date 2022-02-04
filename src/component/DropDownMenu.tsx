import { useHistory } from 'react-router-dom'
import { goToPage } from '../utils/common'

const DropDownMenu = (props: { showDropMenu: boolean }) => {
    const { showDropMenu } = props
    const history = useHistory()

    const onLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        goToPage('/', history)
    }

    return (
        <div
            style={{ display: showDropMenu ? 'flex' : 'none' }}
            className="w-24 h-24 absolute top-14 border-y border-l rounded-l shadow bg-white flex-col items-center text-sm text-center text-gray-500"
        >
            <div className='w-full h-10 leading-10' onClick={() => goToPage('/profile', history)}>我的主页</div>
            <div className='w-full h-10 border-t' onClick={onLogout}>退出</div>
        </div>
    )
}

export default DropDownMenu
