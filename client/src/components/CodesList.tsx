import { useState } from 'react';
import { downloadZip } from 'client-zip';
import { Container, Divider, Grid, Typography, Pagination } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from 'react-s-alert';
import CodeCard from './CodeCard';
import { deleteCodes } from '../api/codes';
import dataURLtoBlob from '../utils/dataURLtoBlob'
import downloadFile from '../utils/downloadFile'
import { Code } from '../types';
import { useAppContext } from '../context/App.context';

export default function CodesList() {
    const { codes, codesCount, getAllCodes, page, setPage } = useAppContext();
    const [downloadingCodes, setDownloadingCodes] = useState<boolean>(false);
    const [deletingCodes, setDeletingCodes] = useState<boolean>(false);

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    const handleDownloadCodes = async () => {
        setDownloadingCodes(true);
        const files = codes.map((item: Code) => {
            const qrCodeElement = document.getElementById(item.code) as HTMLCanvasElement;
            return {
                name: `${item.code}.png`,
                input: new File([dataURLtoBlob(qrCodeElement?.toDataURL("image/png"))], `${item.code}.png`)
            }
        });
        const blob = await downloadZip(files).blob();
        downloadFile('tappr_codes.zip', blob);
        setDownloadingCodes(false);
    }

    const handleDeleteCodes = async () => {
        try {
            setDeletingCodes(true);
            await deleteCodes();
            setDeletingCodes(false);
            getAllCodes();
        } catch (e) {
            setDeletingCodes(false);
            Alert.error('An Error occured while deleting Codes.', {
                position: 'top-right',
                effect: 'slide',
                timeout: 'none'
            });
        }
    }

    return (
        <Container maxWidth="xl" sx={{ marginTop: 5 }}>
            <Divider />
            <Grid container spacing={1} sx={{ marginTop: 5 }}>
                {codes.length ?
                    <>
                        <Grid item xs={12}>
                            <LoadingButton
                                loading={downloadingCodes}
                                variant="contained"
                                endIcon={<DeleteIcon />}
                                loadingPosition={deletingCodes ? "start" : undefined}
                                startIcon={deletingCodes ? <SaveIcon /> : undefined}
                                sx={{ float: 'left' }}
                                onClick={handleDeleteCodes}
                                color="error"
                            >
                                Delete All records
                            </LoadingButton>
                            <LoadingButton
                                loading={downloadingCodes}
                                variant="contained"
                                endIcon={<DownloadIcon />}
                                loadingPosition={downloadingCodes ? "start" : undefined}
                                startIcon={downloadingCodes ? <SaveIcon /> : undefined}
                                sx={{ float: 'right' }}
                                onClick={handleDownloadCodes}
                            >
                                Download
                            </LoadingButton>
                        </Grid>
                        {codes.map((item: Code, i) =>
                            <CodeCard key={item._id} code={item.code} />
                        )}
                    </> :
                    <Grid item xs={12}>
                        <Typography align='center'>There are no codes in the database.</Typography>
                    </Grid>
                }
            </Grid>
            {codesCount > 1 && <Pagination count={codesCount} page={page} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }} onChange={handleChangePage} />}
        </Container>
    )
}