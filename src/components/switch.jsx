import * as React from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 78, 
    height: 35, 
    padding: 8,
    margin: -3,
    '& .MuiSwitch-switchBase': {
        padding: 9,
        margin: 3,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(35px)', // Adjust the translate distance for the switch thumb
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: '#D7987D', // Use the background color from your image
                opacity: 1,
                border: '3px solid #D7987D', // Add border to match image
            },
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 20, // Adjusted thumb size to better match your image
        height: 20,
        backgroundColor: '#ffffff', // Thumb color
        
    },
    '& .MuiSwitch-track': {
        borderRadius: 30, // Border-radius to make track rounder
        backgroundColor: '#E9E9EA', // Default background
        opacity: 1,
        border: '4px solid #D7987D', // Border color for the switch track
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default IOSSwitch;
