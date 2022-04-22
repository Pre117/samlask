import { BaseEditor } from 'slate'
import { HistoryEditor } from 'slate-history'
import { ReactEditor } from 'slate-react'

export type TCustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type TParagraphElement = {
    type: 'paragraph'
    children: TCustomText[]
}

export type THeadingElement = {
    type: 'heading'
    level: number
    children: TCustomText[]
}

export type TCodeElement = {
    type: 'code',
    children: TCustomText[]
}

export type TCustomElement = TParagraphElement | THeadingElement | TCodeElement

export type TFormattedText = { text: string; bold?: boolean }

export type TCustomText = TFormattedText

declare module 'slate' {
    interface CustomTypes {
        Editor: TCustomEditor
        Element: TCustomElement
        Text: TCustomText
    }
}