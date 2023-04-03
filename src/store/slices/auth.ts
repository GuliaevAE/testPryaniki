import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

interface CounterState {
  token: string ,
}

const initialState: CounterState = {
  token: '',
}

export const authReducer = createSlice({
  name: 'tokenReducer',
  initialState,
  reducers: {
    changeJWTToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },
  },
})

export const {  changeJWTToken } = authReducer.actions
export const token = (state: RootState) => state.authReducer.token

export default authReducer.reducer