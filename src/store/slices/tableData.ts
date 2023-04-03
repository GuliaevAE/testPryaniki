import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'


interface tableDataItem {
    companySigDate: string,
    companySignatureName: string,
    documentName: string,
    documentStatus: string,
    documentType: string,
    employeeNumber: string,
    employeeSigDate: string,
    employeeSignatureName: string,
    id: string
}

interface CounterState {
    tableData: tableDataItem[] | null,
    selectedTableRow: tableDataItem[],
    loading: boolean,
    errorMessage:string
}

const initialState: CounterState = {
    tableData: null,
    selectedTableRow: [],
    loading: false,
    errorMessage: ''

}

export const tableReducer = createSlice({
    name: 'tokenReducer',
    initialState,
    reducers: {
        changeTableData: (state, action: PayloadAction<tableDataItem[]>) => {
            state.tableData = action.payload
        },
        addRowInTableData: (state, action: PayloadAction<tableDataItem>) => {
            state.tableData && state.tableData.push(action.payload)
        },
        editRowInTableData: (state, action: PayloadAction<tableDataItem>) => {
            if (state.tableData) {
                let findedObj:any = state.tableData.find(item => item.id === action.payload.id)
                let index = state.tableData.indexOf(findedObj);
                state.tableData[index] = action.payload
            }
          
        },
        dellSomeRowsInTableData: (state, action: PayloadAction<string>) => {
            state.tableData = state.tableData && state.tableData.filter(item => item.id !== action.payload)
        },
        changeArrayWithSelectedTableRows: (state, action: PayloadAction<tableDataItem[]>) => {
            state.selectedTableRow = action.payload
        },

        changeLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        changeErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload
        },

    }
})

export const { changeTableData, addRowInTableData, changeArrayWithSelectedTableRows, dellSomeRowsInTableData, editRowInTableData, changeLoading, changeErrorMessage } = tableReducer.actions
export const tableData = (state: RootState) => state.tableReducer.tableData
export const selectedTableRow = (state: RootState) => state.tableReducer.selectedTableRow
export const loading = (state: RootState) => state.tableReducer.loading
export const errorMessage = (state: RootState) => state.tableReducer.errorMessage

export default tableReducer.reducer