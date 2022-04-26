import { configureStore } from '@reduxjs/toolkit'
import articleReducer from './reducers/articleSlice'
import userReducer from './reducers/userSlice'


const store = configureStore({
    reducer: {
        userInfo: userReducer,
        articleInfo: articleReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store