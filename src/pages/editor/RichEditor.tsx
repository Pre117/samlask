import isHotkey from 'is-hotkey'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import { AllElement, AllLeaf, BlockButton, HOTKEYS, MarkButton, toggleMark } from './editorFunc'
import { FILE_MAX_SIZE, sliceLargeFile } from './filesFunc'

const RichEditor = () => {
    const [smallFileList, setSmallFileList] = useState<FormData>(new FormData())
    const [largeFileList, setLargeFileList] = useState<FormData[]>([new FormData()])

    const editor = useMemo(() => withReact(createEditor()), [])
    const renderElement = useCallback((props) => <AllElement {...props} />, [])
    const renderLeaf = useCallback((props) => <AllLeaf {...props} />, [])
    const initialValue: Descendant[] = useMemo(
        () =>
            JSON.parse(localStorage.getItem('content') as string) || [
                {
                    type: 'paragraph',
                    children: [{ text: '' }],
                },
            ],
        []
    )

    // 将文件保存进FormData中
    const resolveFiles = (files: FileList) => {
        console.log(files)
        const sfList = smallFileList
        const lfList = largeFileList
        for (let file of files) {
            const fileType = file.type
            if (/^image/.test(fileType)) {
                // 如果是图片类型
            } else if (/^video/.test(fileType) && fileType !== 'video/vnd.dlna.mpeg-tts') {
                // 如果是视频类型且不是ts文件
            }

            if (file.size <= FILE_MAX_SIZE) {
                sfList.append('resource', file)
            } else {
                if (lfList.length === 1) lfList.pop()
                const chunkList = sliceLargeFile(file)
                chunkList
                    .map((value: Blob, index: number) => ({
                        chunk: value,
                        hash: file.name + '-' + index,
                    }))
                    .forEach((value: { chunk: Blob; hash: string }) => {
                        const newFile = new File([value.chunk], value.hash)
                        const formItem = new FormData()
                        formItem.append(`${file.name}`, newFile)
                        lfList.push(formItem)
                    })
            }
        }

        setSmallFileList(sfList)
        setLargeFileList(lfList)
    }

    // 监听input文件输入框change事件
    useEffect(() => {
        const inputFile = document.querySelector('#file-upload')

        inputFile?.addEventListener('change', ({ target: { files } }: any) => {
            if (files.length !== 0) {
                resolveFiles(files)
            }
        })
    }, [])

    // 监听drop事件
    useEffect(() => {
        const richEditor = document.querySelector('#rich-editor')

        richEditor?.addEventListener('drop', (event: any) => {
            event.preventDefault()

            const files = event.dataTransfer?.files
            if (files.length !== 0) {
                resolveFiles(files)
            }
        })
    }, [])

    // 监听paste事件
    useEffect(() => {
        const richEditor = document.querySelector('#rich-editor')

        richEditor?.addEventListener('paste', ({ clipboardData: { files } }: any) => {
            if (files.length !== 0) {
                resolveFiles(files)
            }
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
        <Slate
            editor={editor}
            value={initialValue}
            onChange={(value) => {
                const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type)
                if (isAstChange) {
                    const content = JSON.stringify(value)
                    localStorage.setItem('content', content)
                }
            }}
        >
            <div className="hidden xl:block h-auto border-b">
                <MarkButton format="bold" icon="bold" />
                <MarkButton format="italic" icon="italic" />
                <MarkButton format="underline" icon="underline" />
                <MarkButton format="code" icon="code" />
                <BlockButton format="heading-one" icon="heading-one" />
                <BlockButton format="heading-two" icon="heading-two" />
                <BlockButton format="block-quote" icon="block-quote" />
                <BlockButton format="numbered-list" icon="numbered-list" />
                <BlockButton format="bulleted-list" icon="bulleted-list" />
                <BlockButton format="left" icon="left" />
                <BlockButton format="center" icon="center" />
                <BlockButton format="right" icon="right" />
                <BlockButton format="justify" icon="justify" />
                <input type="file" id="file-upload" multiple className="hidden" />
                <label className="border rounded bg-green-400" htmlFor="file-upload">
                    文件
                </label>
            </div>
            <Editable
                id="rich-editor"
                style={{ position: 'static' }}
                className="p-2 flex-grow prose sm:w-full sm:max-w-none dark:prose-invert"
                placeholder="分享你的知识..."
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault()
                            const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS]
                            toggleMark(editor, mark)
                        }
                    }
                }}
            />
        </Slate>
    )
}

export default RichEditor
