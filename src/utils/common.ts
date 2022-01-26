
/**
 * 
 * @param path 要跳转的路径
 * @param history useHistory的实例
 */
export const goToPage = (path: string, history: any) => {
    if (location.pathname !== path) history.push(path)
}