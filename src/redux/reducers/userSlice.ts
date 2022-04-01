import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUserMetaInfo } from '../../model/user'
import { RootState } from '../store'

const initialState: IUserMetaInfo = {
    userId: localStorage.getItem('userId') || '',
    token: localStorage.getItem('token') || '',
}

const userSlice = createSlice({
    name: 'userInfo',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<IUserMetaInfo>) => {
            state.userId = action.payload.userId
            state.token = action.payload.token
        },
        resetUserInfo: (state) => {
            state.userId = ''
            state.token = ''
        },
    },
})

export const { setUserInfo, resetUserInfo } = userSlice.actions
export const userSelector = (state: RootState) => state.userInfo
export default userSlice.reducer
