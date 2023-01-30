import { useFormik } from 'formik';
import { Box, InputLabel, MenuItem, FormControl, Select, TextField, Grid, Typography, Button } from '@mui/material';
import FileInput from './FileInput';
import ColorPicker from './ColorPicker';
import { useSettings } from '../context/Settings.context';
import { settings } from '../context/types'
import { CodeSettingsMenuProps } from '../types';

export default function CodeSettingsMenu({ handleClose }: CodeSettingsMenuProps) {
    const { settings, updateSettings } = useSettings();

    const formik = useFormik({
        initialValues: {
            logo: settings.logo,
            correctionLevel: settings.correctionLevel,
            width: settings.width,
            foregroundColor: settings.foregroundColor
        },
        onSubmit: (values: settings) => {
            updateSettings(values);
            handleClose();
        },
    });

    const handleFileChange = (value: string) => {
        formik.setFieldValue('logo', value);
    }

    return (
        <Box
            sx={{ minWidth: 300, padding: 5 }}
            role="presentation"
        >
            <form onSubmit={formik.handleSubmit}>
                <Grid container direction={"column"} spacing={5}>
                    <Grid item>
                        <Typography variant="h5" align='center'>QR Code Settings</Typography>
                    </Grid>
                    <Grid item>
                        <FileInput label="Logo" fileValue={formik.values.logo} handleChange={handleFileChange} />
                    </Grid>
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel id="error-correction-level">Error Correction Level</InputLabel>
                            <Select
                                labelId="error-correction-level"
                                value={formik.values.correctionLevel}
                                name="correctionLevel"
                                onChange={formik.handleChange}
                                label="Error Correction Level"
                            >
                                <MenuItem value='L'>Low</MenuItem>
                                <MenuItem value='M'>Medium</MenuItem>
                                <MenuItem value='Q'>Quartile</MenuItem>
                                <MenuItem value='H'>High</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField
                            id="width"
                            name="width"
                            label="Width"
                            value={formik.values.width}
                            onChange={formik.handleChange}
                            variant="outlined"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{ inputProps: { min: 30 } }}
                            sx={{ width: '100%' }}
                        />
                    </Grid>
                    <Grid item>
                        <InputLabel id="error-correction-level">Foreground Color</InputLabel>
                        <ColorPicker color={formik.values.foregroundColor} handleChange={color => formik.setFieldValue('foregroundColor', color.hex)} />
                    </Grid>
                </Grid>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                    <Grid item xs={6}>
                        <Button variant="outlined" sx={{ width: '100%' }} onClick={() => handleClose()}>
                            Cancel
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button variant='contained' sx={{ width: '100%' }} type="submit">
                            Save
                        </Button>
                    </Grid>
                </Grid>
            </form >
        </Box >
    )
}