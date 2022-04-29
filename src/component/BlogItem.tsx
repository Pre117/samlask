import { useHistory } from 'react-router-dom'
import '../iconfont/interaction.css'
import { IArticleListItemInfo } from '../model/article'
import { goToPage } from '../utils/common'
import ThumbsUpButton from './ThumbsUpButtom'

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
    const history = useHistory()

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
                <ThumbsUpButton likes={likes} articleId={articleId} />
                <div className="flex">
                    <div className="iconfont icon-pinglun mr-1"></div>
                    <div className="text-gray-500">{commentCount}</div>
                </div>
            </div>
        </div>
    )
}

export default BlogItem
