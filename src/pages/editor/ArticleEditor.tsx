import { useEffect, useState } from 'react'
import EditorHeader from './editorHeader'
import RichEditor from './RichEditor'

const ArticleEditor = () => {
    const [title, setTitle] = useState(localStorage.getItem('title') || '')

    const onNextStep = async () => {
        // // 单文件上传
        // if (fileList.has('resource')) {
        //     const result = await uploadFiles(fileList)
        //     console.log(result)
        // }
        // // 大文件上传
        // if (formDataList.length > 1) {
        //     const uploadRequestList = formDataList.map(
        //         async (formData: FormData) => await uploadFiles(formData)
        //     )
        //     // 上传文件分片
        //     await Promise.all(uploadRequestList)
        //     // 获取文件名称列表
        //     const filenameList = formDataList.map((formList) => {
        //         for (let key of formList.keys()) {
        //             return key
        //         }
        //     })
        //     console.log([...new Set(filenameList)])
        //     const mergeRequestList = [...new Set(filenameList)].map(
        //         async (value) => await mergeFiles(value as string, CHUNK_SIZE)
        //     )
        //     // 发送合并文件分片请求
        //     await Promise.all(mergeRequestList).then((value) => console.log(value))
        // }
    }


    useEffect(() => {
        localStorage.setItem('title', title)
    }, [title])

    return (
        <div id="editor" className="min-h-screen flex flex-col bg-blue-50">
            <EditorHeader title="发布文章" />
            <div className="xl:w-3/5 xl:mx-auto xl:my-10 xl:border-x xl:shadow bg-white flex-grow">
                <div className="flex flex-col">
                    <div className="h-12 border-y border-gray-300 flex items-center flex-shrink-0">
                        <input
                            type="text"
                            placeholder="一句话说明你遇到的问题"
                            className="w-full p-2 outline-none"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex-grow flex flex-col">
                        <RichEditor />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ArticleEditor
