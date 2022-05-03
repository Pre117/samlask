import { useCallback, useEffect, useMemo, useState } from 'react'
import { createEditor, Descendant, Element } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import CommentItem from '../../component/CommentItem'
import Header from '../../component/Header'
import ThumbsUpButton from '../../component/ThumbsUpButtom'
import { useAppSelector } from '../../hooks'
import '../../iconfont/interaction.css'
import { fetchSingleArticle } from '../../network/article'
import { fetchUserInfo } from '../../network/user'
import { userSelector } from '../../redux/reducers/userSlice'
import { AllElement, AllLeaf } from '../editor/editorFunc'
import avatar from './EarthSpirit.jpg'

const Article = () => {
    const editor = useMemo(() => withReact(createEditor()), [])
    const commentEditor = useMemo(() => withReact(createEditor()), [])

    const { userId } = useAppSelector(userSelector)
    const [articleInfo, setArticleInfo] = useState(initialArticleInfo)
    const [userInfo, setUserInfo] = useState(initialUserInfo)
    const [comment, setComment] = useState(initialCommentValue)

    const renderElement = useCallback((props) => <AllElement {...props} />, [])
    const renderLeaf = useCallback((props) => <AllLeaf {...props} />, [])

    const initialValue: Descendant[] = useMemo(() => {
        // return JSON.parse(localStorage.getItem('content') as string)
        return [
            {
                type: 'paragraph',
                children: [{ text: '' }],
            },
        ]
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

    const onSendComment = async () => {
        if (comment.every(item => Element.isElement(item) && item.children[0].text === '')) {
            console.log('内容为空')
            return
        }

        console.log(JSON.stringify(comment))
        // console.log(new Date().toLocaleString())

        // const { code, result } = await pushComment(
        //     userId,
        //     articleInfo.articleId,
        //     JSON.stringify(comment),
        //     new Date().toLocaleString()
        // )

        // if (code === 0) {
        //     const res = await modifyArticle(articleInfo.articleId, {
        //         commentIds: [...articleInfo.commentIds, result.commentId],
        //     })

        //     console.log(res)
        // }
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
                    <div className="w-12 h-12 mr-2">
                        <img src={userInfo.avatar} className="rounded-full" />
                    </div>
                    <div className="flex-grow flex flex-col">
                        <div className="text-gray-600">{articleInfo.username}大哥</div>
                        <div className="font-sans text-xs text-gray-400">
                            {articleInfo.date} · 阅读 {articleInfo.views}
                        </div>
                    </div>
                    <div className="w-20 h-10 bg-green-100 border border-green-500 rounded text-sm text-green-500 flex justify-center items-center">
                        关注
                    </div>
                </div>
                <div>
                    <Slate editor={editor} value={initialValue}>
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
            <div className="mt-8 px-8 py-6 bg-white flex flex-col items-center">
                <div className="mb-4 self-start text-lg font-bold">评论</div>
                <Slate
                    editor={commentEditor}
                    value={comment}
                    onChange={(value) => {
                        console.log(JSON.stringify(value))
                        setComment(value)
                    }}
                >
                    <Editable placeholder='输入评论' className="w-full min-h-comment my-2 px-4 py-2 rounded outline-none bg-gray-100 focus:bg-white focus:border focus:border-blue-400" />
                </Slate>
                <div
                    className="w-24 h-10 self-end bg-blue-300 border rounded text-white text-sm flex justify-center items-center"
                    onClick={onSendComment}
                >
                    发表评论
                </div>
                <div>
                    {new Array(10)
                        .fill({
                            commentValue: [
                                {
                                    type: 'paragraph',
                                    children: [
                                        {
                                            text: '这是一个评论！！！这是一个评论！！！这是一个评论！！！这是一个评论！！！',
                                        },
                                    ],
                                },
                            ],
                        })
                        .map((item, index) => (
                            <CommentItem key={index} {...item} />
                        ))}
                </div>
            </div>
            <div className="mt-8 mb-16 bg-white">
                <div>相关推荐</div>
            </div>
            <div className="fixed bottom-0 w-full h-12 px-6 bg-white border divide-x divide-gray-300 flex justify-around items-center text-center text-lg">
                <div className="flex-auto flex justify-center">
                    <ThumbsUpButton
                        likes={articleInfo.likes}
                        articleId={articleInfo.articleId}
                        isHomePage={false}
                    />
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

const initialCommentValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: '' }],
    },
]

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
