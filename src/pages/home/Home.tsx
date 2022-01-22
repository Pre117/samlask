import BlogItem from '../../component/BlogItem'
import Footer from '../../component/Footer'
import Header from '../../component/Header'


const Home = () => {
    const arr = new Array(100).fill(1)

    return (
        <div id="home">
            <Header />
            <div className='h-12'></div>
            <div className="">
                {arr.map((item, index) => (
                    <BlogItem key={index} index={index} />
                ))}
            </div>
            <Footer />
        </div>
    )
}

export default Home
