


export interface CustomElements extends HTMLFormControlsCollection {
    companySigDate: HTMLInputElement;
    companySignatureName: HTMLInputElement;
    documentName: HTMLInputElement;
    documentStatus: HTMLInputElement;
    documentType: HTMLInputElement;
    employeeNumber: HTMLInputElement;
    employeeSigDate: HTMLInputElement;
    employeeSignatureName: HTMLInputElement;
}

export interface CustomForm extends HTMLFormElement {
    readonly elements: CustomElements;
}

export interface CustomDataObject {
    companySigDate: string,
    companySignatureName: string,
    documentName: string,
    documentStatus: string,
    documentType: string,
    employeeNumber: string,
    employeeSigDate: string,
    employeeSignatureName: string,

}


////////////////redux

export interface authInitialStateInterface {
    token: string,
}

export interface tableDataItem extends CustomDataObject {
    id: string
}

export interface tableDataInitialStateInterface {
    tableData: tableDataItem[] | null,
    selectedTableRow: tableDataItem[],
    loading: boolean,
    errorMessage: string
}
