import { useHistory } from 'react-router-dom'
import { goToPage } from '../../../utils/common'

const CommonHeader = ({ title }: { title: string }) => {
    const history = useHistory()

    return (
        <div>
            <div className="fixed top-0 w-full h-14 grid grid-cols-3 shadow border-b bg-white dark:bg-dark-head dark:text-gray-300">
                <div
                    onClick={() => goToPage('/message', history)}
                    className="w-16 self-center text-center"
                >
                    返回
                </div>
                <div className="place-self-center">{title}</div>
                <div></div>
            </div>
            <div className="h-14"></div>
        </div>
    )
}

export default CommonHeader
