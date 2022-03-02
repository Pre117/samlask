import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'
import { goToPage } from '../../utils/common'

const PostEditor = () => {
    const history = useHistory()
    const calcRows = useMemo(() => Math.floor((window.screen.height - 16 * 6.5) / 24) - 2, [])

    return (
        <div id="editor">
            <div className="w-full h-14 flex justify-between items-center text-center shadow">
                <div className="w-16" onClick={() => goToPage('/', history)}>
                    返回
                </div>
                <div>发布帖子</div>
                <div className="w-16">下一步</div>
            </div>
            <div>
                <div className="h-12 border-b border-gray-300 flex items-center">
                    <input
                        type="text"
                        placeholder="一句话说明你遇到的问题或想分享的经验"
                        className="w-full p-2 outline-none"
                    />
                </div>
                <div>
                    <textarea
                        placeholder="写下你的想法"
                        rows={calcRows}
                        className="w-full p-2 outline-none resize-none"
                    />
                </div>
                <div className="flex">
                    <div>图片</div>
                    <div>表情</div>
                    <div>链接</div>
                </div>
            </div>
        </div>
    )
}

export default PostEditor
