
/**
 * 
 * @param path 要跳转的路径
 * @param history useHistory的实例
 */
export const goToPage = (path: string, history: any) => {
    if (location.pathname !== path) history.push(path)
}

const body = document.getElementsByTagName('body')[0]
// 禁用滚动
export const bodyOverflowHidden = () => {
    body.style.overflow = 'hidden'
}

export const bodyOverflowVisible = () => {
    body.style.overflow = 'visible'
}

// 防抖
// export const debounce = (fn: () => void, delay: number) => {
//     let timer: any = null
//     return function () {
//         if (timer) {
//             clearTimeout(timer)
//         }

//         timer = setTimeout(() => {
//             fn.apply(this, arguments)
//             timer = null
//         }, delay)
//     }
// }

export const debounce = (fn: any, delay: number) => {
    let timer: any = null;

    return function() {
        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
        }, delay);
    }
}