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
export const debounce = (fn: any, delay: number) => {
    let timer: any

    return function () {
        if (timer) {
            clearTimeout(timer)
        }

        timer = setTimeout(() => {
            fn.apply(null, arguments)
            timer = null
        }, delay)
    }
}

// 时间格式处理
export const timeFormat = (time: string) => {
    const start = new Date(time)
    const end = new Date()
    const timeDiff = end.getTime() - start.getTime()

    const seconds = 1000
    const minute = seconds * 60
    const hour = minute * 60
    const day = hour * 24
    const month = day * 30
    const year = month * 12

    let res = ''

    if (timeDiff < seconds) {
        res = '一秒'
    } else if (timeDiff < minute) {
        res = `${Math.floor(timeDiff / seconds)}秒`
    } else if (timeDiff < hour) {
        res = `${Math.floor(timeDiff / minute)}分钟`
    } else if (timeDiff < day) {
        res = `${Math.floor(timeDiff / hour)}小时`
    } else if (timeDiff < month) {
        res = `${Math.floor(timeDiff / day)}天`
    } else if (timeDiff < year) {
        res = `${Math.floor(timeDiff / month)}月`
    } else {
        res = `${Math.floor(timeDiff / year)}年`
    }

    return `${res}前`
}
// 本地时间格式处理
export const locareTimeFormat = (localeTime: string) => {
    const arr = localeTime.split(' ')

    if (arr.length === 1) return ''
    const date = arr[0].split('/')
    const time = arr[1].split(':')

    return `${date[0]}年${date[1].length === 1 ? '0' : ''}${date[1]}月${
        date[2].length === 1 ? '0' : ''
    }${date[2]}日 ${time[0].length === 1 ? '0' : ''}${time[0]}:${time[1].length === 1 ? '0' : ''}${
        time[1]
    }`
}
