const BlogItem = (props: {
    username: string
    date: string
    tags: string[]
    title: string
    contentPreview: string
}) => {
    const { username, date, tags, title, contentPreview } = props

    return (
        <div className="w-full py-3 px-5 my-1 grid grid-rows-blogItem border shadow bg-white">
            <div className="flex justify-start text-sm divide-x divide-gray-400 divide-solid">
                <div className="text-gray-700 pr-2">{username}</div>
                <div className="text-gray-500 px-3">{date}</div>
                {tags.map((tag, index) => (
                    <div key={index} className="text-gray-500 px-2">
                        {tag}
                    </div>
                ))}
            </div>
            <div className="my-3 font-bold truncate">
                {title}
            </div>
            <div className="pb-3 border-gray-200 text-sm text-gray-500 truncate">
                {contentPreview}
            </div>
        </div>
    )
}

export default BlogItem
