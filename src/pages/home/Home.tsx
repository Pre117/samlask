import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import BlogItem from '../../component/BlogItem'
import Header from '../../component/Header'
import { fetchPartOfArticleList } from '../../network/article'

const articleProps = {
    articleId: '',
    username: '',
    classification: 0,
    tags: [''],
    abstract: '',
    date: '',
    title: '',
}

const initArticleList = new Array(10).fill(articleProps).map((item) => {
    return {
        articleId: String(Math.random()),
        username: '',
        classification: 0,
        tags: [''],
        abstract: '',
        date: '',
        title: '',
    }
})

const ARTICLE_COUNT_LIMIT = 20

const Home = () => {
    const [articleList, setArticleList] = useState(initArticleList)
    const [page, setPage] = useState(1)
    const [showStart, setShowStart] = useState(1)
    const [over, setOver] = useState(false)
    const observer = useRef<IntersectionObserver>()

    const getPartOfArticleList = useCallback(async () => {
        const result = await fetchPartOfArticleList(ARTICLE_COUNT_LIMIT, page)

        setPage(page + 1)
        setArticleList(result)
    }, [])

    useEffect(() => {
        getPartOfArticleList()
    }, [])

    const callBack = (entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
            if (entries[0].target.id === 'end') {
                console.log('end')
                console.log(showStart)
                resetObserver()
                setShowStart(showStart + 10)
            } else {
                console.log('start')
                console.log(showStart)
                resetObserver()
                setShowStart(showStart - 10 <= 1 ? 1 : showStart - 10)
            }
        }
    }

    const resetObserver = () => {
        observer.current?.disconnect()
    }

    useEffect(() => {
        const start = document.getElementById('start') as Element
        const end = document.getElementById('end') as Element
        const io = new IntersectionObserver(callBack, {
            rootMargin: '-100px 0px 400px 0px',
        })
        io.observe(start)
        io.observe(end)
        observer.current = io
    }, [showStart])

    const testList = useMemo(() => {
        const len = articleList.length
        if (len > showStart - 1 && len < showStart - 1 + ARTICLE_COUNT_LIMIT) {
            return articleList.slice(showStart - 1 - 10, articleList.length)
        } else {
            return articleList.slice(showStart - 1, showStart - 1 + ARTICLE_COUNT_LIMIT)
        }
    }, [showStart, articleList])

    const getRemainList = useCallback(async () => {
        if (
            showStart - 1 + ARTICLE_COUNT_LIMIT > articleList.length &&
            articleList.length !== 10 &&
            !over
        ) {
            const list = await fetchPartOfArticleList(ARTICLE_COUNT_LIMIT, page)

            if (list.length < ARTICLE_COUNT_LIMIT) {
                console.log('over')
                setOver(true)
            }

            setPage(page + 1)
            setArticleList([...articleList, ...list])
        }
    }, [showStart])

    useEffect(() => {
        getRemainList()
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
                    {testList.map((item) => (
                        <BlogItem key={item.articleId} {...item} />
                    ))}
                </div>
                <div id="end" />
            </div>
        </div>
    )
}

export default Home
