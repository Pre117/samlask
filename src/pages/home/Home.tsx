import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
    return(
        <div>
            我是home页面
            <NavLink to='/reach-editor'>编辑器</NavLink>
        </div>
    );
};

export default Home;