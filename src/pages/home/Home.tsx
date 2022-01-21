import React from 'react'
import { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <div id='home'>
            我是home页面1
            <NavLink to='/reach-editor'>编辑器</NavLink>
        </div>
    )
}

export default Home
