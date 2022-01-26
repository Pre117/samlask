import { useEffect, useState } from 'react'
import BlogItem from '../../component/BlogItem'
import Header from '../../component/Header'

const blogProps = {
    username: '嘉然今天吃DOOM',
    date: '天前',
    title: '深入浅出 | 浏览器存储的详细复习资料，面试必看！！！！',
    contentPreview: `content preview content preview content
    preview content preview content preview
    content preview `,
    tags: ['javascript'],
}

const arr = new Array(100).fill(blogProps)

const Home = () => {
    const [blogList, setBlogList] = useState(arr)

    const loadItem = (num: number) => {
        const newArr = new Array(num).fill(blogProps)
        setBlogList([...blogList, ...newArr])
    }

    const infiniteScroll = () => {
        const sentinels = document.getElementById('sentinels')
        const callBack = (entries: IntersectionObserverEntry[]) => {
            if (entries[0].intersectionRatio <= 0) {
                return
            }
            if (blogList.length < 150) {
                // console.log(entries)
                console.log('触发IntersectionObserver')
                loadItem(10)
                // 关键，加载后停止观察，这个函数作用域的io废弃，这样在state更新后，下一个io开始观察
                io.unobserve(entries[0].target)
            }
        }

        const io = new IntersectionObserver(callBack)
        io.observe(sentinels as Element)
    }

    useEffect(() => {
        infiniteScroll()
    }, [blogList])

    return (
        <div id="home">
            <Header />
            <div className="">
                {blogList.map((item, index) => (
                    <BlogItem
                        key={index}
                        index={index}
                        username={item.username}
                        date={item.date}
                        tags={item.tags}
                        title={item.title}
                        contentPreview={item.contentPreview}
                    />
                ))}
            </div>
            <div id="sentinels" className="h-10 text-center leading-10">
                已经到底了
            </div>
        </div>
    )
}

export default Home
