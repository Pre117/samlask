import React from "react"

const PublishPop = (props: {
    isShow: boolean,
    onCancel: () => void
}) => {
    const { isShow, onCancel } = props

    const onClosePop = () => {
        onCancel()
    }

    const PopButton = (props: {
        value: string
    }) => (
        <div className="w-20 h-10 mr-4 leading-10 text-center text-white text-sm border rounded bg-green-500">{props.value}</div>
    )

    return (
        <div style={{ display: isShow ? 'block' : 'none'}} className="absolute w-full h-full top-0">
            <div className="absolute top-1/4 left-1/2 w-80 h-80 -ml-40 border bg-white divide-y flex flex-col">
                <div className="h-10 ml-4 leading-10 text-left text-lg">发布文章</div>
                <div className="flex-auto">
                    <div>
                        <div>分类</div>
                        <div></div>
                    </div>
                    <div className="flex">
                        <div>标签</div>
                        <input type="text" className="border outline-none" />
                    </div>
                    <div className="flex">
                        <div>摘要</div>
                        <textarea name="" id="" cols={30} rows={5} className='resize-none outline-none border rounded bg-gray-100'></textarea>
                    </div>
                </div>
                <div className="h-16 flex justify-end items-center">
                    <PopButton value="取消" />
                    <PopButton value="确定发布" />
                </div>
            </div>
        </div>
    )
}

export default React.memo(PublishPop)