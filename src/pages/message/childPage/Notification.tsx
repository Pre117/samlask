import CommonHeader from "./CommonHeader"

const Notification = () => {
    return (
        <div className="h-screen bg-gray-100">
            <CommonHeader title="通知" />
            <div className="mt-10 text-lg text-gray-500 text-center">
                暂无通知
            </div>
        </div>
    )
}

export default Notification