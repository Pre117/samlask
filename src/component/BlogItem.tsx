import { useMemo, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import '../iconfont/interaction.css'
import { IArticleListItemInfo } from '../model/article'
import { modifyArticle } from '../network/article'
import { userSelector } from '../redux/reducers/userSlice'
import { goToPage } from '../utils/common'

const BlogItem = ({
    articleId,
    username,
    title,
    date,
    tags,
    abstract,
    views,
    likes,
    commentCount,
}: IArticleListItemInfo) => {
    const { userId } = useAppSelector(userSelector)
    const hasThumbsUp = useMemo(() => {
        if (likes.find((item) => item.userId === userId)) {
            return true
        } else {
            return false
        }
    }, [likes])

    console.log(hasThumbsUp)

    const [likeCount, setLikeCount] = useState(likes.length)
    const [isThumbsUp, setIsThumbsUp] = useState(hasThumbsUp)

    const history = useHistory()

    const onThumbsUp = async (event: any) => {
        event.stopPropagation()

        // 判断该用户是否已经点过赞
        if (isThumbsUp) {
            const code = await modifyArticle(articleId, {
                likes: [...likes.filter((item) => item.userId !== userId)],
            })

            if (code === 0) {
                setLikeCount(likeCount - 1)
                setIsThumbsUp(false)
            }
        } else {
            const code = await modifyArticle(articleId, {
                likes: [{ userId, date: JSON.stringify(new Date()) }],
            })

            if (code === 0) {
                setLikeCount(likeCount + 1)
                setIsThumbsUp(true)
            }
        }
    }

    return (
        <div
            className="w-full py-3 px-5 mb-2 grid grid-rows-blogItem shadow bg-white dark:bg-dark-item"
            onClick={() => goToPage(`/article/${articleId}`, history)}
        >
            <div className="flex justify-start text-sm divide-x divide-gray-400 dark:divide-dark-icon divide-solid">
                <div className="text-gray-700 pr-2 dark:text-dark-text">{username}</div>
                <div className="text-gray-500 px-3 dark:text-dark-text">{date.split(' ')[4]}</div>
                <div className="flex">
                    {tags.map((tag, index) => (
                        <div key={index} className="text-gray-500 dark:text-dark-text px-2">
                            {tag}
                        </div>
                    ))}
                </div>
            </div>
            <div className="my-3 font-bold truncate dark:text-white">{title}</div>
            <div className="pb-3 border-gray-200 text-sm text-gray-500 dark:text-dark-text truncate">
                {abstract}
            </div>
            <div className="w-2/5 flex justify-between text-sm">
                <div className="flex">
                    <div className="iconfont icon-yanjing mr-1" />
                    <div className="text-gray-500">{views}</div>
                </div>
                <div className="flex" onClick={onThumbsUp}>
                    <div className={`iconfont ${isThumbsUp ? 'icon-dianzan1' : 'icon-dianzan' } mr-1`}></div>
                    <div className="text-gray-500">{likeCount}</div>
                </div>
                <div className="flex">
                    <div className="iconfont icon-pinglun mr-1"></div>
                    <div className="text-gray-500">{commentCount}</div>
                </div>
            </div>
        </div>
    )
}

export default BlogItem
