
import { ChangeEvent } from 'react';
import { Paper, InputBase, IconButton, InputLabel, Box } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { FileInputProps } from '../types';


export default function FileInput({ label, fileValue, handleChange }: FileInputProps) {


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const url = URL.createObjectURL(e.target.files[0]);
            handleChange(url);
        }
    };

    return (
        <Box>
            <InputLabel>{label}</InputLabel>
            <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder={fileValue}
                    disabled
                />
                <IconButton aria-label="upload logo" component="label">
                    <input hidden accept="image/*" type="file" onChange={handleFileChange} />
                    <FileUploadIcon />
                </IconButton>
            </Paper>
        </Box>

    );

}