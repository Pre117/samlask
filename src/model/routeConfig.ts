// 路由配置接口
export interface IRouteConfig {
    path: string,
    component: () => JSX.Element,
    exact: boolean,
    auth?: boolean,
}