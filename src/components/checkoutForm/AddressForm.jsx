import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../lib/commerce';
// import CustomInput from './CustomInput';

const AddressForm = ({ checkoutToken }) => {
    const methods = useForm();

    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setShippingOptions] = useState([]);
    const [shippingOption, setShippingOption] = useState('');

    let countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))

    const fetchShippingCountries  = async(checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setShippingCountries(countries)
        console.log(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                <form onSubmit=''>
                    <Grid alignItems="space-between" justifyContent="space-between" container> 
                        <TextField variant="outlined" required name='firstName' label='First Name'/>
                        <TextField variant="outlined" required name='lastName' label='Last Name'/>
                        <TextField variant="outlined" required name='email' label='Email'/>
                        <TextField variant="outlined" required name='address1' label='Address'/>
                        <TextField variant="outlined" required name='city' label='City'/>
                        <TextField variant="outlined" required name='zip' label='ZIP'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange='{(e) => setShippingCountry(e.target.value)}'>
                                {countries.map((i) => (
                                <MenuItem key={i.id} value={i.id}>
                                    {i.label}
                                </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select variant={} fullWidth onChange={}> 
                                <MenuItem key={} value={}>
                                Select Me
                                </MenuItem>
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Option</InputLabel>
                            <Select variant={} fullWidth onChange={}> 
                                <MenuItem key={} value={}>
                                Select Me
                                </MenuItem>
                            </Select>
                        </Grid> */}
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
