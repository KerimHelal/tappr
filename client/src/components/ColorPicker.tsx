import React, { useState } from 'react'
import { ChromePicker, ColorChangeHandler } from 'react-color'
import { Popover, IconButton, Box } from '@mui/material';

interface Props {
    color: string,
    handleChange: ColorChangeHandler
}

export default function ColorPicker({ color, handleChange }: Props) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleOpenColorPicker = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ marginTop: 1 }}>
            <IconButton
                sx={{
                    backgroundColor: color,
                    width: '35px',
                    height: '35px',
                    border: '2px solid #dfdfdf',
                    borderRadius: 0
                }}
                onClick={handleOpenColorPicker} />
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <ChromePicker color={color} onChange={handleChange} />
            </Popover>

        </Box>
    )
}
