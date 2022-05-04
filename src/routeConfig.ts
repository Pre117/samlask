import { IRouteConfig } from './model/routeConfig'
import Article from './pages/article/article'
import ArticleEditor from './pages/editor/ArticleEditor'
import PostEditor from './pages/editor/PostEditor'
import Home from './pages/home/Home'
import FollowRecord from './pages/message/childPage/FollowRecord'
import Notification from './pages/message/childPage/Notification'
import ReplyRecord from './pages/message/childPage/ReplyRecord'
import ThumbsUpRecord from './pages/message/childPage/ThumbsUpRecord'
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
        auth: true,
    },
    {
        path: '/post-editor',
        component: PostEditor,
        exact: true,
        auth: true,
    },
    {
        path: '/message',
        component: Message,
        exact: true,
        auth: true,
    },
    {
        path: '/notification',
        component: Notification,
        exact: true,
        auth: true,
    },
    {
        path: '/thumbsup-record',
        component: ThumbsUpRecord,
        exact: true,
        auth: true,
    },
    {
        path: '/reply-record',
        component: ReplyRecord,
        exact: true,
        auth: true,
    },
    {
        path: '/follow-record',
        component: FollowRecord,
        exact: true,
        auth: true,
    },
    {
        path: '/profile',
        component: Profile,
        exact: true,
        auth: true,
    },
    {
        path: '/article/:articleId',
        component: Article,
        exact: true,
    },
    {
        path: '/test',
        component: Test,
        exact: true,
        auth: true,
    },
]

export default routeConfig
