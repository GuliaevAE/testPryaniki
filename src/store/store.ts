import { configureStore } from '@reduxjs/toolkit'
import  authReducer  from './slices/auth'
import tableReducer  from './slices/tableData'
export const store = configureStore({
  reducer: {
    authReducer,
    tableReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch