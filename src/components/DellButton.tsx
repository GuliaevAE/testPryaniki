import { Button } from '@mui/material';
import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { selectedTableRow } from '../store/slices/tableData';
import { asyncDellTableData } from '../dataForTable/functions';

const DellButton_style = {
    background: 'black',
    color: 'white',
    margin: '5px 0',
    borderColor: 'white',
    transition: 'transform .5s ease-out',
    '&:hover': {
        color: 'black',
        background: 'white',
        borderColor: 'black',
    }
}


const DellButton = () => {
    const selectedTableRowSelector = useAppSelector(selectedTableRow)
    const dispatch = useAppDispatch()

    return (
        <Button
            sx={Object.assign(DellButton_style, {
                transform: !selectedTableRowSelector.length ? 'translateY(calc(100% + 5px) )' : 'none'
            })}
            onClick={() => asyncDellTableData(dispatch, selectedTableRowSelector)}
            variant="outlined">Del</Button>
    );
};

export default DellButton;