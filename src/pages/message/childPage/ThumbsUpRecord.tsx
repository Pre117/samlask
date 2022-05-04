import { useEffect, useState } from 'react'
import { useAppSelector } from '../../../hooks'
import { fetchArticleUnderUser } from '../../../network/article'
import { fetchUserInfo } from '../../../network/user'
import { userSelector } from '../../../redux/reducers/userSlice'
import CommonHeader from './CommonHeader'

const ThumbsUpRecord = () => {
    const { userId } = useAppSelector(userSelector)
    const [articleLikesInfo, setArticleLikesInfo] = useState(initialArticleLikesInfo)

    const getArticleLikesInfo = async () => {
        const { code, result } = await fetchArticleUnderUser(userId)

        if (code === 0) {
            const newResult = result
                .filter(
                    (item: any) =>
                        (item.likes.length === 1 && item.likes[0].userId !== userId) ||
                        item.likes.length > 1
                )
                .map((item: any) => {
                    return item.likes.map((like: any) => {
                        return {
                            userId: like.userId,
                            date: like.date,
                            title: item.title,
                            articleId: item._id,
                        }
                    })
                })
                .flat(2)

            // 获取点赞记录的用户Id
            const userIdList = [...new Set(newResult.map((item: any) => item.userId))]
            // 获取用户Id的用户记录
            const userInfoList = userIdList.map(async (item: any) => {
                const { avatar, username } = await fetchUserInfo(item)

                return {
                    userId: item,
                    avatar,
                    username,
                }
            })

            Promise.all(userInfoList).then((value) =>
                setArticleLikesInfo(
                    newResult
                        .map((item: any) => {
                            const target = value.find((v) => v.userId === item.userId)
                            return {
                                ...target,
                                ...item,
                            }
                        })
                        .sort((a: any, b: any) => {
                            console.log(b.time < a.time)
                            return (b.time < a.time ? -1 : 1)
                        })
                )
            )
        }
    }

    useEffect(() => {
        getArticleLikesInfo()
    }, [userId])

    return (
        <div className="h-screen bg-gray-100">
            <CommonHeader title="赞" />
            <div className="">
                {articleLikesInfo.map((item: any) => (
                    <ThumbsUpRecordItem key={item.articleId} {...item} />
                ))}
            </div>
        </div>
    )
}

const initialArticleLikesInfo = [
    {
        avatar: '',
        uesrname: '',
        date: '',
        title: '',
        articleId: '',
    },
]

const ThumbsUpRecordItem = ({ avatar, username, date, title }: any) => {
    return (
        <div className="p-2 bg-white border-b">
            <div className="flex justify-between">
                <div className="flex">
                    <div>
                        <img className="w-10 h-10 rounded-full" src={avatar} />
                    </div>
                    <div className="ml-1">
                        <div>{username}</div>
                        <div className="text-sm text-gray-400">
                            {date.slice(0, date.lastIndexOf(':'))}
                        </div>
                    </div>
                </div>
                <div className="text-sm">赞了你的文章</div>
            </div>
            <div className="mt-2 p-1 bg-gray-100 text-gray-500">我的文章：{title}</div>
        </div>
    )
}

export default ThumbsUpRecord
