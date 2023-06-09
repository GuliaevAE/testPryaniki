import React, { useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie'

import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { token, changeJWTToken } from '../store/slices/auth';
import { changeArrayWithSelectedTableRows, tableData, selectedTableRow } from '../store/slices/tableData';
import axios from 'axios';

import { DataGrid } from '@mui/x-data-grid';
import { columns } from '../dataForTable/columns';
import { Box } from '@mui/material';
import AddButtonWithDialog from './AddButtonWithDialog';
import { fetchData } from '../dataForTable/functions';
import DellButton from './DellButton';
import EditButtonWithDialog from './EditButtonWithDialog';
import { tableDataItem } from '../dataForTable/interfaces';
import LogoutButton from './LogoutButton';



///styles for MUI
const TableBlock_style = {
    position: 'absolute',
    height: '80%',
    maxHeight: '500px',
    top: '100%',
    opacity: '0',
    transform: 'translateY(-50%)',
    maxWidth: '1200px',
    width: '90%',
    margin: ' 0 15px',
    transition: 'top 1s , opacity 1s',
    '&.active': {
        top: '50%',
        opacity: '1',
    },
}

const TableBlock_buttons_style = {
    display: 'flex',
    width: '100%',
    justifyContent: 'end',
    gap: '5px'
}

const DataGrid_style = {
    color: 'white',
    background: 'black',
    border: 'none',
    borderRadius: '5px',
    fontSize: '1rem',
    '.MuiSvgIcon-root, .MuiDataGrid-withBorderColor ,.MuiDataGrid-checkboxInput, .MuiToolbar-root': {
        color: 'white',
    },
    '.MuiDataGrid-virtualScroller': {
        '&::-webkit-scrollbar': {
            width: '15px',
        },
        '&::-webkit-scrollbar-track': {
            background: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
            background: 'white',
            borderRadius: '10px',
            border: '3px solid black',
        }
    },
    '.PrivateSwitchBase-input': {
        borderRadius: '0'
    }
}
//////////////////






export default function Table() {
    const tokenSelector = useAppSelector(token)
    const tableSelector = useAppSelector(tableData)
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const datasGrid = useRef<any>(null)
    const [tableRow, setRow] = useState<any>([])

    useEffect(() => {
        if (tableSelector) {
            let subArr: tableDataItem[] = []
            tableSelector.forEach((row: any) => {
                let subObj: any = {}
                Object.keys(row).forEach((rowkey: any) => {
                    if (rowkey === 'companySigDate' || rowkey === 'employeeSigDate') {
                        if (row[rowkey]) {
                            let nd = new Date(row[rowkey]).toISOString().split('.')[0]
                            let date = nd.split('T')[0]
                            let time = nd.split('T')[1]
                            subObj[rowkey] = time + ' ' + date
                        }
                    } else subObj[rowkey] = row[rowkey]
                })
                subArr.push(subObj)
            })
            setRow(subArr)
        }
    }, [tableSelector])

    useEffect(() => {
        const token = Cookies.get('token');
        console.log(token)
        if (token) {
            axios.defaults.headers['x-auth'] = token
            dispatch(changeJWTToken(token))

        } else {
            navigate("/")
        }
    }, [])

    useEffect(() => {
        tokenSelector && fetchData(dispatch)
    }, [tokenSelector])

    useEffect(() => {
        setTimeout(() => datasGrid.current.classList.add('active'), 1000)
    }, [])

    

    return (
        <Box ref={datasGrid} sx={TableBlock_style}>
            <Box sx={TableBlock_buttons_style}>
                <EditButtonWithDialog />
                <DellButton />
                <AddButtonWithDialog />
                <LogoutButton />
            </Box>

            <DataGrid
                sx={DataGrid_style}
                rows={tableRow ? tableRow : []}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={(ids) => {
                    if (tableSelector) {
                        const selectedIDs = new Set(ids);
                        const selectedRowData = tableSelector.filter((row: tableDataItem) => selectedIDs.has(row.id.toString()))
                        dispatch(changeArrayWithSelectedTableRows(selectedRowData))
                    }
                }}
            />
        </Box>
    );
};

