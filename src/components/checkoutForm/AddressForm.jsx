import React, { useState, useEffect } from 'react';
import { InputLabel, Select, MenuItem, Button, Grid, Typography, TextField, OutlinedInput } from '@material-ui/core';
import { useForm, FormProvider } from 'react-hook-form';
import { commerce } from '../../lib/commerce';
import { Link } from 'react-router-dom';
// import CustomInput from './CustomInput';

const AddressForm = ({ checkoutToken, nextStep, userInput, setUserInput }) => {
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

    const handelChange = e => {
        e.preventDefault();
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        })
    }

    // const handelSubmit = (e) => {
    //     e.preventDefault();
    // }
console.log(userInput)
    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            {/* <FormProvider {...methods}> */}
                <form>
                    <Grid justifyContent="space-around" container> 
                        <TextField 
                        variant="outlined" 
                        value={userInput.firstName}
                        type='text'
                        required
                        name='firstName'
                        label='First Name'
                        onChange={handelChange}
                        />
                        <TextField 
                        variant="outlined" 
                        value={userInput.lastName}
                        required
                        type='text'
                        name='lastName'
                        label='Last Name'
                        onChange={handelChange}
                        />
                        <TextField 
                        variant="outlined" 
                        value={userInput.email}
                        required
                        type='email'
                        name='email'
                        label='Email'
                        onChange={handelChange}
                        />
                        <TextField 
                        variant="outlined" 
                        value={userInput.address1}
                        required
                        type='text'
                        name='address1'
                        label='Address'
                        onChange={handelChange}
                        />
                        <TextField 
                        variant="outlined" 
                        value={userInput.city}
                        required
                        type='text'
                        name='city'
                        label='City'
                        onChange={handelChange}
                        />
                        <TextField 
                        variant="outlined" 
                        value={userInput.zip}
                        required
                        type='text'
                        name='zip'
                        label='ZIP'
                        onChange={handelChange}
                        />
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
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                        <Button type='submit' color='primary' onClick={() => nextStep() } variant='contained'>Next</Button>
                    </div>
                </form>
            {/* </FormProvider> */}
        </>
    )
}

export default AddressForm
