import axios from "axios"
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { changeTableData, addRowInTableData, editRowInTableData, dellSomeRowsInTableData, tableData, selectedTableRow, changeLoading, changeErrorMessage } from '../store/slices/tableData';
import { CustomDataObject, tableDataItem } from "./interfaces";
import { AppDispatch, RootState } from "../store/store";
import { TypedUseSelectorHook } from "react-redux";


export let HOST = 'https://test.v5.pryaniky.com'


export function fetchData(dispatch: AppDispatch) {
    try {
        dispatch(changeLoading(true))
        axios.get(HOST + '/ru/data/v3/testmethods/docs/userdocs/get').then(res => {
            console.log(res.data.data)
            dispatch(changeTableData(res.data.data))
            dispatch(changeLoading(false))
        })
    } catch (error) {
        if (typeof error === "string") {
            dispatch(changeErrorMessage(error.toUpperCase()))
        } else if (error instanceof Error) {
            dispatch(changeErrorMessage(error.message))
        }
        dispatch(changeLoading(false))
    }
}


export const asyncAddTableData = async (dataObject: CustomDataObject, dispatch: AppDispatch) => {
    console.log('dataObject', dataObject)
    try {
        dispatch(changeLoading(true))
        let res = await axios.post(HOST + '/ru/data/v3/testmethods/docs/userdocs/create', dataObject)
        if (!res.data.error_code && res.data.data.id) {
            let subObj = Object.assign(dataObject, { id: res.data.data.id })
            dispatch(addRowInTableData(subObj))
            dispatch(changeLoading(false))
            return true
        }

    } catch (error) {
        if (typeof error === "string") {
            dispatch(changeErrorMessage(error.toUpperCase()))
        } else if (error instanceof Error) {
            dispatch(changeErrorMessage(error.message))
        }
        dispatch(changeLoading(false))
        return false
    }
}


export const asyncDellTableData = (dispatch: AppDispatch, selector: tableDataItem[]) => {

    selector && selector.forEach((row: tableDataItem) => {
        try {
            dispatch(changeLoading(true))
            axios.post(HOST + '/ru/data/v3/testmethods/docs/userdocs/delete/' + row.id).then(res => {
                console.log('res', res)
                dispatch(dellSomeRowsInTableData(row.id))
                dispatch(changeLoading(false))
            })

        } catch (error) {
            if (typeof error === "string") {
                dispatch(changeErrorMessage(error.toUpperCase()))
            } else if (error instanceof Error) {
                dispatch(changeErrorMessage(error.message))
            }
            dispatch(changeLoading(false))
        }
    })
}




export const asyncEditTableData = async (dispatch: AppDispatch, dataObject: tableDataItem) => {

    try {
        let res = await axios.post(HOST + '/ru/data/v3/testmethods/docs/userdocs/set/' + dataObject.id, dataObject)
        if (!res.data.error_code && res.data.data.id) {
            dispatch(editRowInTableData(dataObject))
            return true
        }

    } catch (error) {
        if (typeof error === "string") {
            dispatch(changeErrorMessage(error.toUpperCase()))
        } else if (error instanceof Error) {
            dispatch(changeErrorMessage(error.message))
        }
        return false
    }

}


