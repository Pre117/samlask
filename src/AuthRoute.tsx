import { useEffect } from "react"
import { Route } from "react-router-dom"
import { IRouteConfig } from './model/routeConfig'


const AuthRoute = (props: { route: IRouteConfig }) => {
    const { route } = props

    const isLogin = localStorage.getItem('token')

    useEffect(() => {
      if (route.auth && !isLogin) {
        // 打开登录弹窗
      }
    }, [isLogin])

    return (
      <Route {...route} />
    )
}

export default AuthRoute