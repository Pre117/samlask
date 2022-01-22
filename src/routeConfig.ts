import { IRouteConfig } from './model/routeConfig'
import Editor from './pages/editor/Editor'
import Home from './pages/home/Home'
import Message from './pages/message/Message'
import Profile from './pages/profile/Profile'

const routeConfig: IRouteConfig[] = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/reach-editor',
        component: Editor,
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
]

export default routeConfig
