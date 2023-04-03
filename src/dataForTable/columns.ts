import { GridColDef } from "@mui/x-data-grid";

export const columns: GridColDef[] = [
    { field: 'companySigDate', headerName: 'companySigDate', width: 120 },
    { field: 'companySignatureName', headerName: 'companySignatureName', width: 130 },
    { field: 'documentName', headerName: 'documentName', width: 130 },
    { field: 'documentStatus', headerName: 'documentStatus', width: 130 },
    { field: 'documentType', headerName: 'documentType', width: 130 },
    { field: 'employeeNumber', headerName: 'employeeNumber', width: 130 },
    { field: 'employeeSigDate', headerName: 'employeeSigDate', width: 130 },
    { field: 'employeeSignatureName', headerName: 'employeeSignatureName', width: 130 },
];