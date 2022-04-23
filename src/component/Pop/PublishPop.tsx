import React, { useEffect, useState } from 'react';

const classifyType = [
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

const PublishPop = (props: { isShow: boolean; onCancel: () => void }) => {
    const { isShow, onCancel } = props
    const [classifiedValue, setClassifiedValue] = useState(0)
    const [labelValue, setLabelValue] = useState('')
    const [abstractValue, setAbstractValue] = useState('')

    // 关闭发布弹窗
    const onClosePop = () => {
        setClassifiedValue(0)
        setLabelValue('')
        setAbstractValue('')
        onCancel()
    }

    const PopButton = (props: { value: string; onClick: () => void }) => (
        <div
            className="w-20 h-10 mr-4 leading-10 text-center text-white text-sm border rounded bg-green-500"
            onClick={props.onClick}
        >
            {props.value}
        </div>
    )

    const ClassifyButton = (props: { id: number; value: string }) => (
        <div
            style={{
                backgroundColor:
                    props.id === classifiedValue ? 'rgb(219, 234, 254)' : 'rgb(243, 244, 246)',
                color: props.id === classifiedValue ? 'rgb(59, 130, 246)' : 'rgb(156, 163, 175)',
            }}
            className="w-16 h-8 leading-8 rounded text-center"
            onClick={() => setClassifiedValue(props.id)}
        >
            {props.value}
        </div>
    )

    useEffect(() => {
        console.log(classifiedValue)
        console.log(labelValue)
        console.log(abstractValue)
        console.log(isShow)
    }, [classifiedValue, labelValue, abstractValue])

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
                            {classifyType.map((item) => (
                                <ClassifyButton key={item.id} id={item.id} value={item.value} />
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div>标签：</div>
                        <input
                            type="text"
                            placeholder="请搜索添加标签"
                            className="w-56 h-8 pl-2 py-1 border outline-none"
                            value={labelValue}
                            onChange={(e) => setLabelValue(e.target.value)}
                        />
                    </div>
                    <div className="flex">
                        <div className="">摘要：</div>
                        <textarea
                            value={abstractValue}
                            onChange={(e) => setAbstractValue(e.target.value)}
                            cols={30}
                            rows={5}
                            className="p-2 resize-none outline-none border bg-gray-100"
                        ></textarea>
                    </div>
                </div>
                <div className="h-16 flex justify-end items-center">
                    <PopButton value="取消" onClick={onClosePop} />
                    <PopButton value="确定发布" onClick={() => console.log('send message')} />
                </div>
            </div>
        </div>
    )
}

export default React.memo(PublishPop)
