import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IArticleMetaInfo } from '../../model/article';
import { RootState } from './../store';

const initialState = {
    userId: localStorage.getItem('userId') || '',
    classification: '',
    tag: [''],
    abstract: '',
    title: '',
    content: JSON.parse(localStorage.getItem('content') as string) || [
        {
            type: 'paragraph',
            children: [{ text: '' }],
        },
    ],
}

const articleSlice = createSlice({
    name: 'articleInfo',
    initialState,
    reducers: {
        setArticleInfo: (state, action: PayloadAction<IArticleMetaInfo>) => {
            state.classification = action.payload.classification
            state.tag = action.payload.tag
            state.abstract = action.payload.abstract
            state.title = action.payload.title
            state.content = action.payload.content
        },
        resetArticleInfo: (state) => {
            state.classification = ''
            state.tag = ['']
            state.abstract = ''
            state.title = ''
            state.content = ''
        }
    }
})

export const { setArticleInfo, resetArticleInfo } = articleSlice.actions
export const articleSelector = (state: RootState) => state.articleInfo
export default articleSlice.reducer