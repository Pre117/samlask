import { useCallback, useMemo } from 'react';
import { BaseEditor, createEditor, CustomTypes, Editor, Transforms } from 'slate';
import { Editable, ReactEditor, Slate, withReact } from 'slate-react';

type CustomElement = { type: string; children: CustomText[] }
type CustomText = { text: string }

declare module 'slate' {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor
        Element: CustomElement
        Text: CustomText
    }
}

const CustomEditor = {
    isBoldMarkActive(editor: CustomTypes["Editor"]) {
        const [match] = Editor.nodes(editor, {
            match: n => n.bold === true,
            universal: true
        })

        return !!match
    },

    isCodeBlockActive(editor: CustomTypes["Editor"]) {
        const [match] = Editor.nodes(editor, {
            match: n => n.type === 'code'
        })


        return !!match
    },

    toggleBoldMark(editor: CustomTypes["Editor"]) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? null : true },
            { match: n => Text.isText(n), split: true }
        )
    },

    toggleCodeBlock(editor: CustomTypes["Editor"]) {
        const isActive = CustomEditor.isCodeBlockActive(editor)
        Transforms.setNodes(
            editor,
            { type: isActive ? undefined : 'code' },
            { match: n => Editor.isBlock(editor, n)}
        )
    }
}

const initialValue: CustomElement[] = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

const ArticleEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), [])

    const renderElement = useCallback((props: any) => {
        switch (props.element.type) {
            case 'code':
                return <CodeElement {...props} />
            default:
                return <DefaultElement {...props} />
        }
    }, [])

    const renderLeaf = useCallback((props: any) => {
        return <Leaf {...props} />
    }, [])

    const onEventHandler = (event: any) => {
        if (!event.ctrlKey) return

        switch (event.key) {
            case '`': {
                event.preventDefault()
                CustomEditor.toggleCodeBlock(editor)
                break
            }

            case 'b': {
                event.prevetDefault()
                CustomEditor.toggleBoldMark(editor)
                break
            }
        }
    }

    return (
        <Slate editor={editor} value={initialValue}>
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={onEventHandler}
            />
        </Slate>
    )
}

const CodeElement = (props: any) => {
    return (
        <pre {...props.attributes}>
            <code>{props.children}</code>
        </pre>
    )
}

const DefaultElement = (props: any) => {
    return <p {...props.attributes}>{props.children}</p>
}

const Leaf = (props: any) => {
    return (
        <span {...props.attrbutes} style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}>
            {props.children}
        </span>
    )
}

export default ArticleEditor
