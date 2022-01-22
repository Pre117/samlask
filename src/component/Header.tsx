const Header = () => {
    return (
        <div className="sticky top-0 w-full h-12 shadow bg-white">
            <div className="w-full flex justify-center">
                <input type="text" placeholder="搜索教学文章" className="bg-gray-200" />
            </div>
            <div>分类</div>
        </div>
    )
}

export default Header
