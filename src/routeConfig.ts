import { IRouteConfig } from './model/routeConfig'
import ArticleEditor from './pages/editor/ArticleEditor'
import PostEditor from './pages/editor/PostEditor'
import Home from './pages/home/Home'
import Message from './pages/message/Message'
import Profile from './pages/profile/Profile'
import Test from './pages/test/Test'

const routeConfig: IRouteConfig[] = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/article-editor',
        component: ArticleEditor,
        exact: true,
    },
    {
        path: '/post-editor',
        component: PostEditor,
        exact: true,
    },
    {
        path: '/message',
        component: Message,
        exact: true,
    },
    {
        path: '/profile',
        component: Profile,
        exact: true,
    },
    {
        path: '/test',
        component: Test,
        exact: true
    }
]

export default routeConfig
