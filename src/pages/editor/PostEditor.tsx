import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { goToPage } from '../../utils/common'

const PostEditor = () => {
    // const [content, setContent] = useState('')
    const [fileList, setFileList] = useState<FormData>(new FormData())
    const editorRef = useRef<HTMLDivElement>(null)

    const history = useHistory()
    // const calcRows = useMemo(() => Math.floor((window.screen.height - 16 * 6.5) / 24) - 2, [])

    const onShowRef = () => {
        console.log('show Ref: ', editorRef.current?.innerHTML)
    }

    const onShowForm = () => {
        console.log('show form: ', fileList)
    }

    const onNextStep = () => {
        const file = document.querySelector<HTMLInputElement>('#file-upload')
        console.log(file?.files)
    }

    const dropFileToUpload = (e: any) => {
        e.preventDefault()
        const file = e.dataTransfer?.files[0]
        console.log(file)
        if (!file) {
            return
        }

        const form = new FormData()
        form.append('chopsticks', file)

        setFileList({
            ...fileList,
            ...form
        })
    }

    useEffect(() => {
        window.addEventListener('drop', dropFileToUpload)

        return () => {
            window.removeEventListener('drop', dropFileToUpload)
        }
    }, [])

    return (
        <div id="editor" className="h-screen flex flex-col">
            <div className="w-full h-14 flex justify-between items-center text-center shadow flex-shrink-0">
                <div className="w-16" onClick={() => goToPage('/', history)}>
                    返回
                </div>
                <div>发布帖子</div>
                <div className="w-16" onClick={onNextStep}>
                    下一步
                </div>
            </div>
            <div className="flex-grow flex flex-col overflow-scroll">
                <div className="h-12 border-b border-gray-300 flex items-center flex-shrink-0">
                    <input
                        type="text"
                        placeholder="一句话说明你遇到的问题"
                        className="w-full p-2 outline-none"
                    />
                </div>
                <div className="flex-grow overflow-scroll">
                    {/* <textarea
                        placeholder="写下你的想法"
                        rows={calcRows}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="w-full p-2 outline-none resize-none"
                    /> */}
                    <div
                        ref={editorRef}
                        className="w-full h-full p-2 outline-none"
                        contentEditable
                    ></div>
                </div>
                <div className="w-full h-12 flex-shrink-0 border divide-x grid grid-cols-4 text-center items-center">
                    <input type="file" id="file-upload" multiple className="hidden" />
                    <label className="" htmlFor="file-upload">
                        图片
                    </label>
                    <div className="">代码</div>
                    <div className="" onClick={onShowRef}>
                        链接
                    </div>
                    <div className="" onClick={onShowForm}>预览</div>
                </div>
            </div>
        </div>
    )
}

export default PostEditor
