import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { pushArticle } from '../../network/article';
import { fetchUserInfo } from '../../network/user';
import { userSelector } from '../../redux/reducers/userSlice';

const PublishPop = (props: { isShow: boolean; onCancel: () => void }) => {
    const { isShow, onCancel } = props
    const [classification, setClassification] = useState(
        Number(localStorage.getItem('classification')) || 0
    )
    const [tags, setTags] = useState(JSON.parse(localStorage.getItem('tags') as string) || [''])
    const [abstract, setAbstract] = useState(localStorage.getItem('abstract') || '')
    const { userId } = useAppSelector(userSelector)

    const history = useHistory()

    // 关闭发布弹窗
    const onClosePop = () => {
        onCancel()
    }

    // 发布文章
    const onComfirmPublish = async () => {
        console.log(userId)
        const { username} = await fetchUserInfo(userId)
        console.log(username)

        console.log('publish article')
        const title = localStorage.getItem('title') as string
        const content = localStorage.getItem('content') as string
        const classificationString = localStorage.getItem('classification')
        const tags = JSON.parse(localStorage.getItem('tags') as string)
        const abstract = localStorage.getItem('abstract') as string

        console.log(`classification: ${classificationString} tags: ${tags} abstract: ${abstract}
        title: ${title} content: ${content}`)

        const res = await pushArticle({
            userId,
            username,
            classification,
            tags,
            abstract,
            title,
            content,
            date: new Date().toLocaleString()
        })

        console.log(res.code, res.result)

        if (res.code === 0) {
            // history.push(`/article/${res.result._id}`)
        }
    }

    useEffect(
        () => localStorage.setItem('classification', String(classification)),
        [classification]
    )

    useEffect(() => localStorage.setItem('tags', JSON.stringify(tags)), [tags])

    useEffect(() => localStorage.setItem('abstract', abstract), [abstract])

    return (
        <div
            style={{ display: isShow ? 'block' : 'none' }}
            className="absolute w-full h-full top-0"
        >
            <div className="absolute top-1/4 left-1/2 w-80 h-96 -ml-40 border rounded bg-white divide-y flex flex-col">
                <div className="h-10 ml-4 leading-10 text-left text-lg">发布文章</div>
                <div className="px-1 py-4 flex-auto text-sm flex flex-col justify-around">
                    <div className="flex items-center">
                        <div>分类：</div>
                        <div className="flex-auto flex justify-around">
                            {classifications.map((item) => (
                                <ClassifyButton
                                    key={item.id}
                                    item={item}
                                    classification={classification}
                                    setClassification={setClassification}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div>标签：</div>
                        <input
                            type="text"
                            placeholder="请搜索添加标签"
                            className="w-56 h-8 pl-2 py-1 border outline-none"
                            value={tags}
                            onChange={(e) => setTags([e.target.value])}
                        />
                    </div>
                    <div className="flex">
                        <div className="">摘要：</div>
                        <textarea
                            value={abstract}
                            onChange={(e) => setAbstract(e.target.value)}
                            cols={30}
                            rows={5}
                            className="p-2 resize-none outline-none border bg-gray-100"
                        ></textarea>
                    </div>
                </div>
                <div className="h-16 flex justify-end items-center">
                    <PopButton value="取消" onClick={onClosePop} />
                    <PopButton value="确定发布" onClick={onComfirmPublish} />
                </div>
            </div>
        </div>
    )
}

const classifications = [
    {
        id: 1,
        value: '前端',
    },
    {
        id: 2,
        value: '后端',
    },
    {
        id: 3,
        value: 'Android',
    },
    {
        id: 4,
        value: 'iOS',
    },
]

const ClassifyButton = ({ item, classification, setClassification }: any) => (
    <div
        style={{
            backgroundColor:
                item.id === classification ? 'rgb(219, 234, 254)' : 'rgb(243, 244, 246)',
            color: item.id === classification ? 'rgb(59, 130, 246)' : 'rgb(156, 163, 175)',
        }}
        className="w-16 h-8 leading-8 rounded text-center"
        onClick={() => setClassification(item.id)}
    >
        {item.value}
    </div>
)

const PopButton = (props: { value: string; onClick: () => void }) => (
    <div
        className="w-20 h-10 mr-4 leading-10 text-center text-white text-sm border rounded bg-green-500"
        onClick={props.onClick}
    >
        {props.value}
    </div>
)

export default React.memo(PublishPop)
