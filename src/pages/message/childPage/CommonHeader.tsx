import { useHistory } from "react-router-dom"
import { goToPage } from "../../../utils/common"


const CommonHeader = ({ title }: { title: string }) => {
    const history = useHistory()

    return (
        <div className="w-full h-14 grid grid-cols-3 shadow bg-white dark:bg-dark-head dark:text-gray-300">
            <div onClick={() => goToPage('/message', history)} className="w-16 self-center text-center">
                返回
            </div>
            <div className="place-self-center">
                {title}
            </div>
            <div></div>
        </div>
    )
}

export default CommonHeader