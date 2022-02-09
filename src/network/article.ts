import { nAxios } from '.';
import { IArticleInfo } from '../model/article';

/**
 * 分页查询文章列表
 * @param limit 每页文章数量限制
 * @param page 页数
 * @returns 该页文章列表
 */
export const fetchPartOfArticleList = async (limit: number, page: number) => {
    const { data: { result } } = await nAxios.post('/article/find/list', { limit, page })

    return result
}

/**
 * 查询单个文章
 * @param articleId 文章Id
 * @returns 查询结果与结果状态码
 */
export const fetchSingleArticle = async (articleId: string) => {
    const { data } = await nAxios.get(`/article/find/articleId=${articleId}`)

    return data
}

/**
 * 查询用户下的所有文章
 * @param userId 用户Id
 * @returns 查询结果与结果状态码
 */
export const fetchArticleUnderUser = async (userId: string) => {
    const { data } = await nAxios.get(`/article/find/userId=${userId}`)

    return data
}

/**
 * 发表文章
 * @param articleInfo 文章详情
 * @returns 结果状态码
 */
export const pushArticle = async (articleInfo: IArticleInfo) => {
    const { data: { code } } = await nAxios.post('/article/add', { articleInfo })

    return code
}

/**
 * 修改文章
 * @param articleId 文章Id
 * @param articleInfo 文章详情
 * @returns 结果状态码
 */
export const modifyArticle = async (articleId: string, articleInfo: IArticleInfo) => {
    const { data: { code } } = await nAxios.post('/article/update', { articleId, articleInfo })

    return code
}

/**
 * 删除文章
 * @param articleId 文章Id
 * @returns 结果状态码
 */
export const deleteArticle = async (articleId: string) => {
    const { data: { code } } = await nAxios.post('/article/del', { articleId }) 

    return code
}