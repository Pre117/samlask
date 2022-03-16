import { nAxios } from '.';

/**
 * 上传文件
 * @param formData 需要上传的表单数据
 * @returns 上传文件服务器地址
 */
export const uploadFiles = async(formData: FormData) => {
    const { data: { result } } = await nAxios.post('/upload/files', formData)

    return result
}

/**
 * 合并上传的文件分片
 * @param filename 需要合并的文件名
 * @returns 合并结果
 */
export const mergeFiles = async(filename: string, size: number) => {
    const { data: { result } } = await nAxios.post('/upload/merge', { filename, size })

    return result
}