import { Button } from '@mui/material';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import {  selectedTableRow } from '../store/slices/tableData';
import { asyncDellTableData } from '../dataForTable/functions';

const DellButton = () => {
    const selectedTableRowSelector = useAppSelector(selectedTableRow)
    const dispatch = useAppDispatch()
    
    return (
        <Button
            sx={{
                background: 'black',
                color: 'white',
                margin: '5px 0',
                borderColor: 'white',
                transform: !selectedTableRowSelector.length ? 'translateY(calc(100% + 5px) )' : 'none',
                transition: 'transform .5s ease-out',
                '&:hover': {
                    color: 'black',
                    background: 'white',
                    borderColor: 'black',
                }
            }}
            onClick={() => asyncDellTableData(dispatch, selectedTableRowSelector)}
            variant="outlined">Del</Button>
    );
};

export default DellButton;