import { useEffect, useState } from 'react';
import { downloadZip } from 'client-zip';
import { Container, Divider, Grid, Typography, Pagination } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import DownloadIcon from '@mui/icons-material/Download';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from 'react-s-alert';
import useWebSocket from 'react-use-websocket';
import CodeCard from './CodeCard';
import { fetchCodes, deleteCodes } from '../api/codes';
import dataURLtoBlob from '../utils/dataURLtoBlob'
import downloadFile from '../utils/downloadFile'
import { Code } from '../types';

export default function CodesList() {
    const [codes, setCodes] = useState<Code[]>([]);
    const [page, setPage] = useState<number>(1);
    const [count, setCount] = useState<number>(0);
    const [downloadingCodes, setDownloadingCodes] = useState<boolean>(false);
    const [deletingCodes, setDeletingCodes] = useState<boolean>(false);

    useWebSocket('ws://localhost:8080', {
        onMessage: () => {
            getCodes();
        }
    });


    const getCodes = async () => {
        try {
            const { codes, count, error } = await fetchCodes(page);
            if (error) {
                Alert.error('An Error occured while fetching Codes.', {
                    position: 'top-right',
                    effect: 'slide',
                    timeout: 'none'
                });
                return;
            }
            setCodes(codes);
            setCount(Math.ceil(count / 12));
        } catch (e) {
            Alert.error('An Error occured while fetching Codes.', {
                position: 'top-right',
                effect: 'slide',
                timeout: 'none'
            });
        }
    }

    useEffect(() => {
        getCodes();
    }, [page]);

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
            getCodes()
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
            {count > 1 && <Pagination count={count} page={page} sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }} onChange={handleChangePage} />}
        </Container>
    )
}