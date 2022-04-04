import Header from '../../component/Header';
import avatar from './EarthSpirit.jpg';

const Article = () => {
    const ClassifyLabel = (props: { title: string; valueArr: string[] }) => (
        <div className="mt-2 flex items-center">
            <div className='mr-2 text-sm text-gray-700'>{props.title}：</div>
            <div className='flex'>
                {props.valueArr.map((value) => (
                    <div className="w-14 h-8 mr-2 rounded bg-blue-50 text-sm text-blue-500 text-center leading-8">{value}</div>
                ))}
            </div>
        </div>
    )

    return (
        <div className="bg-gray-100">
            <Header />
            <div className="mt-8 px-6 py-8 bg-white">
                <h1 className="mb-6 text-3xl font-bold">title</h1>
                <div className="h-12 mb-6 flex justify-between items-center">
                    <div className="w-12 h-12">
                        <img src={avatar} className="rounded-full" />
                    </div>
                    <div className="flex flex-col">
                        <div className="text-gray-600">野猪被骑</div>
                        <div className="font-sans text-sm text-gray-400">
                            2022年04月01日 12:08 · 阅读 4038
                        </div>
                    </div>
                    <div className="w-20 h-10 bg-green-500 border rounded text-center text-sm text-white leading-10">
                        关注
                    </div>
                </div>
                <div>content</div>
                <div className="flex flex-col">
                    <ClassifyLabel title='分类' valueArr={['阅读']} />
                    <ClassifyLabel title='标签' valueArr={['前端', '后端', '全栈']} />
                </div>
            </div>
            <div className="mt-8 bg-white">
                <div>评论</div>
            </div>
            <div className="mt-8 bg-white">
                <div>相关推荐</div>
            </div>
            <div className="fixed bottom-0 w-full h-12 px-8 border divide-x divide-gray-300 flex justify-around items-center text-center">
                <div className="flex-auto">点赞</div>
                <div className="flex-auto">评论</div>
                <div className="flex-auto">收藏</div>
            </div>
        </div>
    )
}

export default Article
