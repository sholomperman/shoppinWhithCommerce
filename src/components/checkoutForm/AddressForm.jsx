import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField, OutlinedInput } from '@material-ui/core';
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

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({ id: code, label: name }))
    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({ id: code, label: name }))
    const options = shippingOptions.map((sO) => ({ id: sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})` }))

    const fetchShippingCountries  = async(checkoutTokenId) => {
        const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId)
        setShippingCountries(countries)
        console.log(countries)
        setShippingCountry(Object.keys(countries)[0])
    }

    const fetchShippingSubdivisions = async( countryCode ) => {
        const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode)
        setShippingSubdivisions(subdivisions)
        setShippingSubdivision(Object.keys(subdivisions)[0])
    }

    const fetchShippingOption = async(checkoutTokenId, country, region = null ) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, { country, region })
        setShippingOptions(options)
        setShippingOption(options[0].id)
    }

    useEffect(() => {
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(() => {
        if(shippingCountry) fetchShippingSubdivisions(shippingCountry)
    }, [shippingCountry])

    useEffect(() => {
        if(shippingSubdivision) fetchShippingOption(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

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
                            <Select value={shippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                                {countries.map((i) => (
                                <MenuItem key={i.id} value={i.id}>
                                    {i.label}
                                </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((i) => (
                                <MenuItem key={i.id} value={i.id}>
                                    {i.label}
                                </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Option</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                                {options.map((sO) => (
                                <MenuItem key={sO.id} value={sO.id}>
                                    {sO.label}
                                </MenuItem>
                                    ))}
                            </Select>
                        </Grid>
                    </Grid>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
