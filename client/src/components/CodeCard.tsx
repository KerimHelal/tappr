
import { Grid, Paper, Typography } from '@mui/material';
import { QRCodeCanvas } from 'qrcode.react';
import { useAppContext } from '../context/App.context';

interface Props {
    code: string
}

export default function CodeCard({ code }: Props) {
    const { settings } = useAppContext();
    const codeSettings = {
        fgColor: settings.foregroundColor,
        level: settings.correctionLevel,
        size: settings.width,
        ...(settings.logo !== '' && {
            imageSettings: {
                src: settings.logo,
                height: 50,
                width: 50,
                excavate: false
            }
        })
    };

    return (
        <Grid item xs={2}>
            <Paper variant="outlined" sx={{ padding: 2, textAlign: 'center' }}>
                <QRCodeCanvas id={code} value={code} {...codeSettings} />
                <Typography gutterBottom align="center">
                    {code}
                </Typography>
            </Paper>
        </Grid>
    )
}
