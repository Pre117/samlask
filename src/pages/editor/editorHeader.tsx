import { useCallback, useState } from "react"
import { useHistory } from "react-router-dom"
import PublishPop from "../../component/Pop/PublishPop"
import { goToPage } from "../../utils/common"

const EditorHeader = (props: {
    title: string,
}) => {
    const { title } = props
    const [isShowPop, setIsShowPop] = useState(false)
    const history = useHistory()

    const onNextStep = () => {
        setIsShowPop(true)
        console.log('next step')
    }

    const closePop = useCallback(() => {
        setIsShowPop(false)
    }, [])

    return (
        <div className="w-full h-14 flex justify-between items-center text-center shadow flex-shrink-0">
            <div className="w-16" onClick={() => goToPage('/', history)}>
                返回
            </div>
            <div>{title}</div>
            <div className="w-16" onClick={onNextStep}>
                下一步
            </div>
            <PublishPop isShow={isShowPop} onCancel={closePop} />
        </div>
    )
}

export default EditorHeader
