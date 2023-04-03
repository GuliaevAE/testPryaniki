import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Button, TextField } from '@mui/material';

import { asyncAddTableData } from '../dataForTable/functions';

import { useAppDispatch } from '../store/hooks'
import { CustomDataObject, CustomForm } from '../dataForTable/interfaces';


const AddDialog = () => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const clickDialogButton = async (dataObject: CustomDataObject) => {
        await asyncAddTableData(dataObject, dispatch) && handleClose()
    }

    const handletextField = (event: React.FormEvent<CustomForm>) => {
        event.preventDefault();
        const target = event.currentTarget.elements;

        let companySigDateNewDate = Date.parse(target.companySigDate.value)
        let employeeSigDateNewDate = Date.parse(target.employeeSigDate.value)
        
        const data = {
            companySigDate: isNaN(companySigDateNewDate) ? '' : new Date(companySigDateNewDate).toISOString(),
            companySignatureName: target.companySignatureName.value,
            documentName: target.documentName.value,
            documentStatus: target.documentStatus.value,
            documentType: target.documentType.value,
            employeeNumber: target.employeeNumber.value,
            employeeSigDate: isNaN(employeeSigDateNewDate) ? '' :  new Date(employeeSigDateNewDate).toISOString(),
            employeeSignatureName: target.employeeSignatureName.value,
        };
        clickDialogButton(data);
    }
    return (
        <Box>
            <Button sx={{
                background: 'black',
                color: 'white',
                margin: '5px 0',
                borderColor: 'white',
                '&:hover': {
                    color: 'black',
                    background: 'white',
                    borderColor: 'black',
                }
            }}
                onClick={handleClickOpen}
                variant="outlined">Add</Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle >
                    {"Добавление записи"}
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
                            variant="standard" />
                        <TextField
                            id='companySignatureName'
                            color='primary'

                            type='text'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="companySignatureName"
                            variant="standard" />

                        <TextField
                            id='documentName'
                            color='primary'
                            type='text'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="documentName"
                            variant="standard" />

                        <TextField
                            id='documentStatus'
                            color='primary'
                            type='text'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="documentStatus"
                            variant="standard" />
                        <TextField
                            id='documentType'
                            color='primary'
                            type='text'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="documentType"
                            variant="standard" />
                        <TextField
                            id='employeeNumber'
                            color='primary'
                            type='number'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="employeeNumber"
                            variant="standard" />
                        <TextField
                            id='employeeSigDate'
                            color='primary'
                            type='datetime-local'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="employeeSigDate"
                            variant="standard" />
                        <TextField
                            id='employeeSignatureName'
                            color='primary'
                            type='text'
                            InputLabelProps={{ shrink: true }}
                            margin='dense'
                            fullWidth
                            label="employeeSignatureName"
                            variant="standard" />

                    </DialogContent>
                    <DialogActions>
                        <Button type='submit' sx={{ margin: '0 10px' }}>Submit</Button>
                        {/* <Button sx={{ margin: '0 10px' }} onClick={handleClose} autoFocus>
                            Agree
                        </Button> */}
                    </DialogActions>
                </form>

            </Dialog>
        </Box>

    );
};

export default AddDialog;