import React from "react";

import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import TextField from "@mui/material/TextField";

type DBFormPropsType = {
    label: string;
    name: string;
    value: string;
    type: string;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const DBFormInput = ({label, name, value, type, handleChange}: DBFormPropsType ) => {
    return (
    <Box sx={{ display: 'flex',flexDirection: 'column' ,alignItems: 'center', columnGap: 1, width: '100%' }}>
        <Typography variant="subtitle1">
            {`${label}:`}
        </Typography>
        <TextField 
            variant="outlined"
            required
            hiddenLabel 
            size="small" 
            fullWidth 
            value={value} 
            name={name} 
            onChange={handleChange}
            type={type}
        />
    </Box>
    )

}

export default DBFormInput;