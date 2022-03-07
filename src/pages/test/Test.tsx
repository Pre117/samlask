import Header from '../../component/Header'

const Test = () => {
    return (
        <div>
            <Header />
            test页面
            <div className='w-11/12 mx-auto'>
                <video controls src="http://localhost:9000\uploads\resource-1646395477230-MV.mp4" />
            </div>
        </div>
    )
}

export default Test
