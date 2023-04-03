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

export default function Table() {
    const tokenSelector = useAppSelector(token)
    const tableSelector = useAppSelector(tableData)
    const selectedTableRowSelector = useAppSelector(selectedTableRow)

    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const datasGrid = useRef<any>(null)



    useEffect(() => {
        const token = Cookies.get('token');
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
        <Box
            ref={datasGrid}
            sx={{
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
            }}>
            <Box
                sx={{ display: 'flex', width: '100%', justifyContent: 'end', gap: '5px' }}>
                <EditButtonWithDialog />
                <DellButton />

                <AddButtonWithDialog />
                <LogoutButton />
            </Box>

            <DataGrid
                sx={{
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
                }}

                rows={tableSelector ? tableSelector : []}
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

