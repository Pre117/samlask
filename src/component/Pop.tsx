const Pop = (props: { isShow: boolean, onCancel: () => void }) => {
    const { isShow, onCancel } = props

    return (
        <div className="absolute w-full h-full top-0" style={{ display: isShow ? 'block' : 'none' }}>
            <div className="w-full h-full bg-black bg-opacity-25" />
            <div className="absolute top-1/2 left-1/2 w-80 h-72 -ml-40 -mt-36 bg-white">
                <div>登录</div>
                <div onClick={onCancel}>关闭</div>
                <div className="" />
                <input type="text" className="bg-gray-200 mb-2" />
                <input type="password" className="bg-gray-200" />
                <div className="">登录</div>
            </div>
        </div>
    )
}

export default Pop
