
/**
 * 
 * @param path 要跳转的路径
 * @param history useHistory的实例
 */
export const goToPage = (path: string, history: any) => {
    if (location.pathname !== path) history.push(path)
}

const body = document.getElementsByTagName('body')[0]

export const bodyOverflowHidden = () => {
    body.style.overflow = 'hidden'
}

export const bodyOverflowVisible = () => {
    body.style.overflow = 'visible'
}