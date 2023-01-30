export interface FormValues {
    prefix: string | null;
    suffix: string | null;
    amount: number;
    numOfLeadingZeros: number;
}

export interface Code {
    _id: string,
    code: string,
    createdAt: string
}

export interface CodeSettingsMenuProps {
    handleClose: Function;
}

export interface FileInputProps {
    label: string;
    fileValue: string,
    handleChange: Function
}