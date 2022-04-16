import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BlogItem from '../../component/BlogItem'
import Header from '../../component/Header'
import { fetchPartOfArticleList } from '../../network/article'

const articleProps = {
    username: '',
    date: '',
    title: '',
    contentPreview: '',
    tags: [''],
}

const initArticleList = new Array(10).fill(articleProps).map(() => {
    return {
        articleId: Math.random(),
        username: '',
        date: '',
        title: '',
        contentPreview: '',
        tags: [''],
    }
})
// 每次请求20个列表项
const ARTICLE_COUNT_LIMIT = 20

const Home = () => {
    // 从服务器获取的列表，初始值为10个空的列表项
    const [articleList, setArticleList] = useState(initArticleList)
    // 用于翻页查询，初始页数为1
    const [page, setPage] = useState(1)
    // 判断当前renderList在articleList的位置
    const [showStart, setShowStart] = useState(1)
    // 判断数据库的列表项是否已经全部获取完毕
    const [over, setOver] = useState(false)
    // 存储Intersection Observer实例的引用
    const observer = useRef<IntersectionObserver>()
    // 拉取第一部分的文章列表
    const getFirstPartOfArticleList = useCallback(async () => {
        const result = await fetchPartOfArticleList(ARTICLE_COUNT_LIMIT, page)

        setPage(page + 1)
        setArticleList(result)
    }, [])
    // 在组件第一次加载时调用拉取第一部分的文章列表函数
    useEffect(() => {
        getFirstPartOfArticleList()
    }, [])
    // 观察器传入的第一个回调函数，用于对观察的元素进行相关操作
    const callBack = (entries: IntersectionObserverEntry[]) => {
        // 判断观察的元素是否出现在可视区内
        if (entries[0].isIntersecting) {
            if (entries[0].target.id === 'end') {
                // 如果是尾部的id为end的div与交叉区域观察对象的根相交
                // 关闭观察器，并且showStart加10
                resetObserver()
                setShowStart(showStart + 10)
            } else {
                // 如果是头部的id为start的div与交叉区域观察对象的根相交
                // 关闭观察器，并且showStart减10，如果小于1，则为1
                resetObserver()
                setShowStart(showStart - 10 <= 1 ? 1 : showStart - 10)
            }
        }
    }
    // 关闭观察器，这是为了防止多次组件更新后同时挂载多个相同观察器
    const resetObserver = () => {
        observer.current?.disconnect()
    }
    // 通过Intersection Observer来观察renderList头部与尾部的div
    // 来判断滚动条是否滚动到顶部/底部
    useEffect(() => {
        const start = document.getElementById('start') as Element
        const end = document.getElementById('end') as Element
        // rootMargin用来扩大或缩小rootBounds这个矩形的大小
        // 从而影响intersectionRect交叉区域的大小
        const io = new IntersectionObserver(callBack, {
            rootMargin: '-100px 0px 400px 0px',
        })
        io.observe(start)
        io.observe(end)
        // 将io保存到ref中
        observer.current = io
    }, [showStart])

    const len = articleList.length
    // 真正要渲染的列表，从articleList中获取列表项
    const renderList = useMemo(() => {
        if (len > showStart - 1 && len < showStart - 1 + ARTICLE_COUNT_LIMIT) {
            // renderList能从articleList中获取的列表项不足20个时
            return articleList.slice(showStart - 1 - 10, len)
        } else {
            // 当articleList的列表项充足时
            return articleList.slice(showStart - 1, showStart - 1 + ARTICLE_COUNT_LIMIT)
        }
    }, [showStart, articleList])
    // 拉取剩余的部分列表
    const getRemainPartOfList = useCallback(async () => {
        // 要拉取剩余的部分列表，需要同时满足三个条件：
        // 1、articleList的数目不够renderList的下一次获取
        // 2、articleList不为初始化状态时的10个空列表项
        // 3、数据库内容列表尚未拉取完毕
        if (showStart - 1 + ARTICLE_COUNT_LIMIT > len && len !== 10 && !over) {
            const list = await fetchPartOfArticleList(ARTICLE_COUNT_LIMIT, page)
            // 当拉取到的列表长度小于要拉取的数目时，表明数据库的列表已拉取完毕
            if (list.length < ARTICLE_COUNT_LIMIT) {
                console.log('over')
                setOver(true)
            }

            setPage(page + 1)
            setArticleList([...articleList, ...list])
        }
    }, [showStart])

    useEffect(() => {
        getRemainPartOfList()
    }, [showStart])

    return (
        <div id="home">
            <Header />
            <div
                style={{
                    paddingTop: (showStart - 1) * 127 + 'px',
                }}
                className="dark:bg-dark-bg bg-blue-50"
            >
                <div id="start" />
                <div className="sm:w-4/5 md:w-4/5 lg:w-3/5 xl:w-2/5 m-auto  dark:bg-dark-bg">
                    {renderList.map((item) => (
                        <BlogItem key={item.articleId} {...item} />
                    ))}
                </div>
                <div id="end" />
            </div>
        </div>
    )
}

export default Home
