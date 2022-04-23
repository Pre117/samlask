import { useEffect, useRef, useState } from 'react'
import EditorHeader from './editorHeader'
import RichEditor from './RichEditor'

const CHUNK_SIZE = 10 * 1024 * 1024

const PostEditor = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [fileList, setFileList] = useState<FormData>(new FormData())
    const [formDataList, setFormDataList] = useState<FormData[]>([new FormData()])
    const editorRef = useRef<HTMLDivElement>(null)

    const onShowRef = () => {
        console.log('show Ref: ', editorRef.current?.innerHTML)
        console.log(window.getSelection())
    }

    const onShowForm = () => {
        for (let value of fileList.entries()) {
            console.log(value)
        }
    }

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

    // 将文件保存进FormData中
    const resolveFiles = (files: FileList) => {
        const form = fileList
        const formList = formDataList
        const textEditor = document.querySelector<HTMLDivElement>('#text-editor')
        for (let file of files) {
            const fileType = file.type
            // 如果是图片类型
            if (/^image/.test(fileType)) {
                const image = document.createElement('img')
                image.src = URL.createObjectURL(file)
                image.className = 'm-auto'
                image.draggable = true
                textEditor?.appendChild(image)
            } else if (/^video/.test(fileType) && fileType !== 'video/vnd.dlna.mpeg-tts') {
                // 如果是视频类型且不是ts文件
                const video = document.createElement('video')
                video.src = URL.createObjectURL(file)
                video.className = 'w-9/10'
                video.controls = true
                textEditor?.appendChild(video)
            }

            if (file.size <= CHUNK_SIZE) {
                form.append('resource', file)
            } else {
                if (formList.length === 1) formList.pop()
                const fileChunkList = sliceLargeFile(file)
                fileChunkList
                    .map((value: Blob, index: number) => ({
                        chunk: value,
                        hash: file.name + '-' + index,
                    }))
                    .forEach((value: { chunk: Blob; hash: string }) => {
                        const newFile = new File([value.chunk], value.hash)
                        const formItem = new FormData()
                        formItem.append(`${file.name}`, newFile)
                        formList.push(formItem)
                    })
            }
        }

        setFileList(form)
        setFormDataList(formList)
    }

    // 对大文件进行分片切割
    const sliceLargeFile = (file: File, size = CHUNK_SIZE) => {
        const fileChunkList = []
        let cur = 0
        while (cur < file.size) {
            fileChunkList.push(file.slice(cur, cur + size))
            cur += size
        }

        return fileChunkList
    }

    // keyup事件处理函数
    const keyupToSave = (e: any) => {
        setContent(editorRef.current?.innerHTML as string)
        console.log(content)
        // console.log(title)
    }

    // 监听keyup事件
    useEffect(() => {
        const textEditor = document.querySelector<HTMLDivElement>('#text-editor')
        textEditor?.addEventListener('keyup', keyupToSave)

        return () => textEditor?.removeEventListener('keyup', keyupToSave)
    }, [content])

    // 监听input文件输入框change事件
    useEffect(() => {
        const inputFile = document.querySelector<HTMLInputElement>('#file-upload')

        inputFile?.addEventListener('change', (e: any) => {
            const files = e.target.files
            if (files.length === 0) {
                return
            }

            resolveFiles(files)
        })
    }, [])

    // 监听drop事件
    useEffect(() => {
        const textEditor = document.querySelector<HTMLDivElement>('#text-editor')

        textEditor?.addEventListener('drop', (e: any) => {
            e.preventDefault()
            const files = e.dataTransfer?.files
            if (files.length === 0) {
                return
            }

            resolveFiles(files)
        })
    }, [])

    // 监听paste事件
    useEffect(() => {
        const textEditor = document.querySelector<HTMLDivElement>('#text-editor')

        textEditor?.addEventListener('paste', (e: any) => {
            const files = e.clipboardData.files
            if (files.length === 0) {
                return
            }

            resolveFiles(files)
        })
    }, [])

    // useEffect(() => {
    //     const worker = new Worker('/hash.js')
    //     console.log(worker)
    //     worker.postMessage('foo')
    //     worker.postMessage('bar')

    //     return () => {
    //         worker.terminate()
    //     }
    // }, [])

    return (
        <div id="editor" className="h-screen flex flex-col">
            <EditorHeader title="发布帖子" />
            <div className="flex-grow grid sm:grid-cols-2 divide-x">
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
                    <div className="flex-grow">
                        {/* <div
                            ref={editorRef}
                            id="text-editor"
                            className="w-full h-full p-2 outline-none"
                            contentEditable={true}
                        ></div> */}
                        <RichEditor />
                    </div>
                    <div className="w-full h-12 flex-shrink-0 border divide-x grid grid-cols-4 text-center items-center">
                        <input type="file" id="file-upload" multiple className="hidden" />
                        <label className="" htmlFor="file-upload">
                            文件
                        </label>
                        <div className="">代码</div>
                        <div className="" onClick={onShowRef}>
                            链接
                        </div>
                        <div className="" onClick={onShowForm}>
                            预览
                        </div>
                    </div>
                </div>
                <div className="hidden sm:block p-3">
                    <div className='m-2 text-xl font-black'>{title}</div>
                    <div dangerouslySetInnerHTML={{__html: content}}></div>
                </div>
            </div>
        </div>
    )
}

export default PostEditor
