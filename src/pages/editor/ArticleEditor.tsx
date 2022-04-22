import isHotkey from 'is-hotkey'
import { useCallback, useMemo } from 'react'
import { createEditor, Descendant, Editor, Element, Text, Transforms } from 'slate'
import { Editable, Slate, withReact } from 'slate-react'
import { TCustomEditor } from './EditorTypes'

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code',
}

const CustomEditor = {
    isBoldMarkActive(editor: TCustomEditor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => Text.isText(n) && n.bold === true,
            universal: true,
        })

        return !!match
    },

    isCodeBlackActive(editor: TCustomEditor) {
        const [match] = Editor.nodes(editor, {
            match: (n) => Element.isElement(n) && n.type === 'code',
        })

        return !!match
    },

    toggleBoldMark(editor: TCustomEditor) {
        const isActive = CustomEditor.isBoldMarkActive(editor)
        Transforms.setNodes(
            editor,
            { bold: isActive ? false : true },
            { match: (n) => Text.isText(n), split: true }
        )
    },

    toggleCodeBlock(editor: TCustomEditor) {
        const isActive = CustomEditor.isCodeBlackActive(editor)

        Transforms.setNodes(
            editor,
            { type: isActive ? 'paragraph' : 'code' },
            { match: (n) => Editor.isBlock(editor, n) }
        )
    },
}

const ArticleEditor = () => {
    const editor = useMemo(() => withReact(createEditor()), [])
    const renderElement = useCallback((props) => <AllElement {...props} />, [])
    const renderLeaf = useCallback((props) => <AllLeaf {...props} />, [])
    const initialValue: Descendant[] = useMemo(
        () =>
            JSON.parse(localStorage.getItem('content') as string) || [
                {
                    type: 'paragraph',
                    children: [{ text: 'A line of text in a paragraph.' }],
                },
            ],
        []
    )

    return (
        <Slate
            editor={editor}
            value={initialValue}
            onChange={(value) => {
                const isAstChange = editor.operations.some((op) => 'set_selection' !== op.type)
                if (isAstChange) {
                    const content = JSON.stringify(value)
                    localStorage.setItem('content', content)
                }
            }}
        >
            <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={(event) => {
                    for (const hotkey in HOTKEYS) {
                        if (isHotkey(hotkey, event as any)) {
                            event.preventDefault()
                            const mark = HOTKEYS[hotkey as keyof typeof HOTKEYS]
                            console.log(mark)
                            toggleMark(editor, mark)
                        }
                    }
                }}
            />
        </Slate>
    )
}

const toggleMark = (editor: TCustomEditor, format: string) => {
    const isActive = isMarkActive(editor, format)

    if (isActive) {
        Editor.removeMark(editor, format)
    } else {
        Editor.addMark(editor, format, true)
    }
}

const isMarkActive = (editor: TCustomEditor, format: string) => {
    const marks = Editor.marks(editor)
    return marks ? marks[format as keyof typeof marks] === true : false
}

const AllElement = ({ attributes, children, element }: any) => {
    const style = { textAlign: element.align }
    switch (element.type) {
        case 'block-quote':
            return (
                <blockquote style={style} {...attributes}>
                    {children}
                </blockquote>
            )
        case 'bulleted-list':
            return (
                <ul style={style} {...attributes}>
                    {children}
                </ul>
            )
        case 'heading-one':
            return (
                <h1 style={style} {...attributes}>
                    {children}
                </h1>
            )
        case 'heading-two':
            return (
                <h2 style={style} {...attributes}>
                    {children}
                </h2>
            )
        case 'list-item':
            return (
                <li style={style} {...attributes}>
                    {children}
                </li>
            )
        case 'numbered-list':
            return (
                <ol style={style} {...attributes}>
                    {children}
                </ol>
            )
        default:
            return (
                <p style={style} {...attributes}>
                    {children}
                </p>
            )
    }
}

const AllLeaf = ({ attributes, children, leaf }: any) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>
    }

    if (leaf.code) {
        children = <code>{children}</code>
    }

    if (leaf.italic) {
        children = <em>{children}</em>
    }

    if (leaf.underline) {
        children = <u>{children}</u>
    }

    return <span {...attributes}>{children}</span>
}

export default ArticleEditor
