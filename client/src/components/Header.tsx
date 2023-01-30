import { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Drawer } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import CodeSettingsMenu from './CodeSettingsMenu';

export default function Header() {
    const [settingsDrawerOpen, setSettingsDrawerOpen] = useState<boolean>(false);

    const toggleDrawer = (state: boolean) => () => {
        setSettingsDrawerOpen(state);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar color="transparent" position="sticky">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={toggleDrawer(true)}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                    >
                        QR Code Generator
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor='left'
                open={settingsDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                <CodeSettingsMenu handleClose={toggleDrawer(false)} />
            </Drawer>
        </Box>
    );
}