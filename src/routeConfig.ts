import { IRouteConfig } from "./model/routeConfig";
import Editor from "./pages/editor/Editor";
import Home from "./pages/home/Home";

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
    }
];

export default routeConfig;