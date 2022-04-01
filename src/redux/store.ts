import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'


const store = configureStore({
    reducer: {
        userInfo: userReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store