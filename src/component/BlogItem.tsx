import { useHistory } from 'react-router-dom'
import { goToPage } from '../utils/common'

const BlogItem = (props: {
    articleId: string
    username: string
    date: string
    tags: string[]
    title: string
    abstract: string
}) => {
    const { articleId, username, date, tags, title, abstract } = props
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
        </div>
    )
}

export default BlogItem
