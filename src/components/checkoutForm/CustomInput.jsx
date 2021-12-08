import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller } from 'react-hook-form';

const CustomInput = ({ name, label }) => {
    const { control } = useFormContext();
    return (
        <Grid item xs={12} ms={6}>
            <Controller
                as={TextField} control={control} name={name} label={label} fullWidth required
            />
        </Grid>
    )
}

export default CustomInput
