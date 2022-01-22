const BlogItem = (props: {
    index: number
}) => {
    const { index } = props

    return (
        <div className="w-full h-24 flex justify-center items-center">
            <li className="list-none">{index}</li>
        </div>
    )
}

export default BlogItem
