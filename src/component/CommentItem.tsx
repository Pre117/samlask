import { useEffect, useMemo, useState } from 'react'
import { createEditor, Descendant } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'

const CommentItem = ({ commentValue }: any) => {
    const editor = useMemo(() => withReact(createEditor()), [])
    const [comment, setComment] = useState(initialCommentValue)

    useEffect(() => {
        setComment(commentValue)
    }, [])

    return (
        <Slate editor={editor} value={comment}>
            <Editable
                readOnly={true}
            />
        </Slate>
    )
}

const initialCommentValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: '这是一个评论' }],
    },
]

export default CommentItem
