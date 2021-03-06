import { useEffect, useMemo, useState } from 'react'
import { useAppSelector } from '../hooks'
import { ILike } from '../model/article'
import { modifyArticle } from '../network/article'
import { fetchUserLike, modifyUserLike } from '../network/user'
import { userSelector } from '../redux/reducers/userSlice'

const ThumbsUpButton = ({ likes, articleId, isHomePage = true }: any) => {
    const { userId } = useAppSelector(userSelector)
    const hasThumbsUp = useMemo(() => {
        if (likes.find((item: ILike) => item.userId === userId)) {
            return true
        } else {
            return false
        }
    }, [likes])

    const [likeCount, setLikeCount] = useState(likes.length)
    const [isThumbsUp, setIsThumbsUp] = useState(hasThumbsUp)

    const onThumbsUp = async (event: any) => {
        event.stopPropagation()
        const { result } = await fetchUserLike(userId)

        console.log(articleId)
        console.log(result.articleList)

        // 判断该用户是否已经点过赞
        if (isThumbsUp) {
            const code1 = await modifyArticle(articleId, {
                likes: [...likes.filter((item: ILike) => item.userId !== userId)],
            })

            const code2 = await modifyUserLike(
                result._id,
                result.articleList.filter((item: any) => item.articleId !== articleId)
            )

            if (code1 === 0 && code2 === 0) {
                setLikeCount(likeCount - 1)
                setIsThumbsUp(false)
            }
        } else {
            const date = new Date().toLocaleString().replace(/\//g, '-')

            const code1 = await modifyArticle(articleId, {
                likes: [{ userId, date }],
            })

            const code2 = await modifyUserLike(result._id, [...result.articleList, { articleId, date }])

            if (code1 === 0 && code2 === 0) {
                setLikeCount(likeCount + 1)
                setIsThumbsUp(true)
            }
        }
    }

    useEffect(() => {
        setIsThumbsUp(hasThumbsUp)
    }, [hasThumbsUp])

    return (
        <div>
            {isHomePage ? (
                <div className="flex" onClick={onThumbsUp}>
                    <div
                        className={`iconfont ${isThumbsUp ? 'icon-dianzan1' : 'icon-dianzan'} mr-1`}
                    ></div>
                    <div className="text-gray-500">{likeCount}</div>
                </div>
            ) : (
                <div
                    className={`iconfont ${isThumbsUp ? 'icon-dianzan1' : 'icon-dianzan'}`}
                    onClick={onThumbsUp}
                ></div>
            )}
        </div>
    )
}

export default ThumbsUpButton
