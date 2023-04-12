import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, TextField } from '@mui/material';

import { CustomDataObject, CustomForm, tableDataItem } from '../dataForTable/interfaces';
import { useAppSelector, useAppDispatch } from '../store/hooks'

import { selectedTableRow } from '../store/slices/tableData';
import { asyncEditTableData } from '../dataForTable/functions';

const EditButton_style = {
    background: 'black',
    color: 'white',
    margin: '5px 0',
    borderColor: 'white',
    justifySelf: 'end',
    transition: 'transform .5s ease-out',
    '&:hover': {
        color: 'black',
        background: 'white',
        borderColor: 'black',
    }
}

const EditButtonWithDialog = () => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>(false);
    const selectedTableRowSelector = useAppSelector(selectedTableRow)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickDialogButton = async (dataObject: tableDataItem) => {
        await asyncEditTableData(dispatch, dataObject) && handleClose()
    }

    const handletextField = async (event: React.FormEvent<CustomForm>) => {
        event.preventDefault();
        const target = event.currentTarget.elements;

        const data = {
            companySigDate: !target.companySigDate.value ? '' : target.companySigDate.value + ':00.000Z',
            companySignatureName: target.companySignatureName.value,
            documentName: target.documentName.value,
            documentStatus: target.documentStatus.value,
            documentType: target.documentType.value,
            employeeNumber: target.employeeNumber.value,
            employeeSigDate: !target.employeeSigDate.value ? '' : target.employeeSigDate.value + ':00.000Z',
            employeeSignatureName: target.employeeSignatureName.value,
            id: selectedTableRowSelector[0].id
        };
        clickDialogButton(data)
    }
    return (
        <Box>
            <Button sx={Object.assign(EditButton_style, {
                transform: selectedTableRowSelector.length !== 1 ? 'translateY(calc(100% + 5px) )' : 'none'
            })}
                onClick={handleClickOpen}
                variant="outlined">Edit</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >
                    {"Редактирование записи"}
                </DialogTitle>
                <form onSubmit={handletextField}>
                    <DialogContent>
                        <TextField
                            id='companySigDate'
                            color='primary'
                            type='datetime-local'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth label={"companySigDate"}
                            variant="standard"
                            defaultValue={selectedTableRowSelector.length === 1 && selectedTableRowSelector[0].companySigDate && new Date(selectedTableRowSelector[0].companySigDate).toISOString().split('.')[0]}
                        />
                        <TextField
                            id='companySignatureName'
                            color='primary'
                            type='text'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="companySignatureName"
                            variant="standard"
                            defaultValue={selectedTableRowSelector.length === 1 && selectedTableRowSelector[0].companySignatureName && selectedTableRowSelector[0].companySignatureName} />
                        <TextField
                            id='documentName'
                            color='primary'
                            type='text'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="documentName"
                            variant="standard"
                            defaultValue={selectedTableRowSelector.length === 1 && selectedTableRowSelector[0].documentName && selectedTableRowSelector[0].documentName} />
                        <TextField
                            id='documentStatus'
                            color='primary'
                            type='text'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="documentStatus"
                            variant="standard"
                            defaultValue={selectedTableRowSelector.length === 1 && selectedTableRowSelector[0].documentStatus && selectedTableRowSelector[0].documentStatus} />
                        <TextField
                            id='documentType'
                            color='primary'
                            type='text'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="documentType"
                            variant="standard"
                            defaultValue={selectedTableRowSelector.length === 1 && selectedTableRowSelector[0].documentType && selectedTableRowSelector[0].documentType} />
                        <TextField
                            id='employeeNumber'
                            color='primary'
                            type='number'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="employeeNumber"
                            variant="standard"
                            defaultValue={selectedTableRowSelector.length === 1 && selectedTableRowSelector[0].employeeNumber && selectedTableRowSelector[0].employeeNumber} />
                        <TextField
                            id='employeeSigDate'
                            color='primary'
                            type='datetime-local'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="employeeSigDate"
                            variant="standard"
                            defaultValue={selectedTableRowSelector.length === 1 && selectedTableRowSelector[0].employeeSigDate && new Date(selectedTableRowSelector[0].employeeSigDate).toISOString().split('.')[0]}
                        />
                        <TextField
                            id='employeeSignatureName'
                            color='primary'
                            type='text'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="employeeSignatureName"
                            variant="standard"
                            defaultValue={selectedTableRowSelector.length === 1 && selectedTableRowSelector[0].employeeSignatureName && selectedTableRowSelector[0].employeeSignatureName} />

                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' sx={{ margin: '0 10px' }}>Submit</Button>
                    </DialogActions>
                </form>

            </Dialog>
        </Box>

    );
};

export default EditButtonWithDialog;