import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Paper, Container, TextField, Grid, Button, Backdrop, Box, LinearProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Alert from 'react-s-alert';
import { FormValues } from '../types';
import { generateCodes } from '../api/codes';
import { useAppContext } from '../context/App.context';

export default function CodesForm() {
    const [formDisabled, setFormDisabled] = useState<boolean>(false);
    const { getAllCodes } = useAppContext();

    const validationSchema = yup.object({
        amount: yup
            .number()
            .min(1, 'Amount should be more than 0.')
            .required('Amount is required'),
    });

    const formik = useFormik({
        initialValues: {
            prefix: '',
            suffix: '',
            numOfLeadingZeros: 0,
            amount: 0
        },
        validationSchema,
        onSubmit: (values: FormValues, { resetForm }) => {
            handleGenerateCodes(values);
            resetForm();
        },
    });

    const handleGenerateCodes = async (values: FormValues) => {
        try {
            setFormDisabled(true);
            const handler = setInterval(getAllCodes, 10000);
            await generateCodes(values);
            getAllCodes(); //fetch codes in case query finished in less than 10 seconds (because interval will be cleared before its time passes
            setFormDisabled(false);
            clearTimeout(handler);
        } catch (e) {
            setFormDisabled(false);
            Alert.error('An Error occured while inserting Codes.', {
                position: 'top-right',
                effect: 'slide',
                timeout: 'none'
            });
        }
    }

    return (
        <Container maxWidth="sm" >
            <Paper variant="outlined" sx={{ padding: 5, marginTop: 5, position: 'relative' }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                id="prefix"
                                name="prefix"
                                label="Prefix"
                                value={formik.values.prefix}
                                onChange={formik.handleChange}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="suffix"
                                name="suffix"
                                label="Suffix"
                                value={formik.values.suffix}
                                onChange={formik.handleChange}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }} />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="numOfLeadingZeros"
                                name="numOfLeadingZeros"
                                label="Leading Zeros"
                                value={formik.values.numOfLeadingZeros}
                                onChange={formik.handleChange}
                                variant="outlined"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{ inputProps: { min: 0 } }}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                id="amount"
                                name="amount"
                                label="Amount"
                                value={formik.values.amount}
                                onChange={formik.handleChange}
                                error={formik.touched.amount && Boolean(formik.errors.amount)}
                                helperText={formik.touched.amount && formik.errors.amount}
                                variant="outlined"
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{ inputProps: { min: 1 } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="outlined" endIcon={<SendIcon />} sx={{ width: '100%' }} type="submit">
                                Generate
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                <Backdrop
                    sx={{
                        color: "white",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                        "position": "absolute",
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        width: '100%'
                    }}
                    open={formDisabled}
                >
                    <Box sx={{ width: '80%', mr: 1 }}>
                        <LinearProgress />
                    </Box>
                </Backdrop>
            </Paper>
        </Container>
    )
}