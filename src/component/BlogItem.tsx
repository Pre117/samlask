const BlogItem = (props: { index: number }) => {
    const { index } = props

    return (
        <div className="w-full pt-3 px-5 grid grid-rows-blogItem">
            <div className="flex justify-start text-sm divide-x divide-gray-400 divide-solid">
                <div className="text-gray-700 pr-2">嘉然今天吃DOOM</div>
                <div className="text-gray-500 px-3">{index}天前</div>
                <div className="text-gray-500 px-2">javascript</div>
            </div>
            <div className="my-3 font-bold truncate">
                深入浅出 | 浏览器存储的详细复习资料，面试必看！！！！
            </div>
            <div className="pb-3 border-b border-gray-200 text-sm text-gray-500 truncate">
                content preview content preview content
                 preview content preview content preview
                 content preview 
            </div>
        </div>
    )
}

export default BlogItem
