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