import { useCallback, useEffect, useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import Header from '../../component/Header'
import ThumbsUpButton from '../../component/ThumbsUpButtom'
import '../../iconfont/interaction.css'
import { fetchSingleArticle } from '../../network/article'
import { fetchUserInfo } from '../../network/user'
import { AllElement, AllLeaf } from '../editor/editorFunc'
import avatar from './EarthSpirit.jpg'

const Article = () => {
    const editor = useMemo(() => withReact(createEditor()), [])
    const [articleInfo, setArticleInfo] = useState(initialArticleInfo)
    const [userInfo, setUserInfo] = useState(initialUserInfo)

    const renderElement = useCallback((props) => <AllElement {...props} />, [])
    const renderLeaf = useCallback((props) => <AllLeaf {...props} />, [])

    const initialValue: Descendant[] = useMemo(() => {
        return JSON.parse(localStorage.getItem('content') as string)
    }, [articleInfo])

    const getArticleInfo = async () => {
        const articleId = location.pathname.split('/')[2]
        const { code, result } = await fetchSingleArticle(articleId)

        setArticleInfo({
            ...result,
            articleId: result._id,
            content: JSON.parse(result.content),
        })
    }

    const getUserInfo = async () => {
        const res = await fetchUserInfo(articleInfo.userId)
        res && setUserInfo(res)
    }

    useEffect(() => {
        getArticleInfo()
    }, [])

    useEffect(() => {
        getUserInfo()
    }, [articleInfo])

    return (
        <div className="bg-gray-100">
            <Header />
            <div className="mt-8 px-6 py-8 bg-white">
                <h1 className="mb-6 text-3xl font-bold">{articleInfo.title}</h1>
                <div className="h-12 mb-6 flex justify-between items-center">
                    <div className="w-12 h-12">
                        <img src={userInfo.avatar} className="rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-gray-600">{articleInfo.username}</div>
                        <div className="font-sans text-sm text-gray-400">
                            {articleInfo.date.split(' ')[4]} · 阅读 {articleInfo.views}
                        </div>
                    </div>
                    <div className="w-20 h-10 bg-green-500 border rounded text-center text-sm text-white leading-10">
                        关注
                    </div>
                </div>
                <div>
                    <Slate
                        editor={editor}
                        value={initialValue}
                        onChange={(value) => {
                            const isAstChange = editor.operations.some(
                                (op) => 'set_selection' !== op.type
                            )
                            if (isAstChange) {
                                const content = JSON.stringify(value)
                            }
                        }}
                    >
                        <Editable
                            id="rich-editor"
                            style={{ position: 'static' }}
                            className="p-2 flex-grow prose sm:w-full sm:max-w-none dark:prose-invert"
                            renderElement={renderElement}
                            renderLeaf={renderLeaf}
                            readOnly={true}
                        />
                    </Slate>
                </div>
                <div className="flex flex-col">
                    <ClassifyLabel title="分类" valueArr={['阅读']} />
                    <ClassifyLabel title="标签" valueArr={['前端', '后端', '全栈']} />
                </div>
            </div>
            <div className="mt-8 bg-white">
                <div>评论</div>
                <div></div>
            </div>
            <div className="mt-8 mb-16 bg-white">
                <div>相关推荐</div>
            </div>
            <div className="fixed bottom-0 w-full h-12 px-6 bg-white border divide-x divide-gray-300 flex justify-around items-center text-center text-lg">
                <div className="flex-auto flex justify-center">
                    <ThumbsUpButton likes={articleInfo.likes} articleId={articleInfo.articleId} isHomePage={false} />
                </div>
                <div className="flex-auto flex justify-center">
                    <div className="iconfont icon-pinglun"></div>
                </div>
                <div className="flex-auto flex justify-center">
                    <div className="iconfont icon-shoucang"></div>
                </div>
            </div>
        </div>
    )
}

const initialArticleInfo = {
    articleId: '',
    userId: '',
    username: '',
    classification: 0,
    tags: [''],
    abstract: '',
    title: '',
    content: [
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ],
    date: '',
    views: 0,
    likes: [
        {
            userId: '',
            date: '',
        },
    ],
    commentIds: [],
    collectors: [],
}

const initialUserInfo = {
    userId: '',
    username: '',
    avatar: avatar,
    points: 0,
}

const ClassifyLabel = (props: { title: string; valueArr: string[] }) => (
    <div className="mt-2 flex items-center">
        <div className="mr-2 text-sm text-gray-700">{props.title}：</div>
        <div className="flex">
            {props.valueArr.map((value, index) => (
                <div
                    className="w-14 h-8 mr-2 rounded bg-blue-50 text-sm text-blue-500 text-center leading-8"
                    key={index}
                >
                    {value}
                </div>
            ))}
        </div>
    </div>
)

export default Article
