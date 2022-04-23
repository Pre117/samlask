// 每个块大小为10MB
const CHUNK_SIZE = 10 * 1024 * 1024
// 大于100MB为大文件
export const FILE_MAX_SIZE = CHUNK_SIZE * 10

// 对大文件进行分片切割
export const sliceLargeFile = (file: File, size = CHUNK_SIZE) => {
    const fileChunkList = []
    let cur = 0
    while (cur < file.size) {
        fileChunkList.push(file.slice(cur, cur + size))
        cur += size
    }

    return fileChunkList
}
