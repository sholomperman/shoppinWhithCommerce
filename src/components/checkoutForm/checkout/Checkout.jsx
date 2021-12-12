import React, { useState, useEffect } from 'react';
import { Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider, Button } from '@material-ui/core';
import useStyles from './checkoutStyles';
import AddressForm from '../AddressForm';
import PaymentDetails from '../PaymentDetails';
import { commerce } from '../../../lib/commerce';


const steps = ['Shipping address', 'Payment details']



const Checkout = ({ cart }) => {
    const classes = useStyles()
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [userInput, setUserInput] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    address1: '',
    zip: ''
    })
    console.log('activeStep is ',activeStep)

    useEffect(() => {
        const generateToken = async() => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
                setCheckoutToken(token)
            } catch (error) {
                console.log(error)
            }
        }
        generateToken()
    }, [cart])

    const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1);
    const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    // const next = (data) => {
    //     setShippingData(data)
    //     nextStep()
    // }

    const Form = () => activeStep === 0
        ? <AddressForm
            nextStep={nextStep}
            userInput={userInput}
            setUserInput={setUserInput}
            checkoutToken={checkoutToken}
        />
        : <PaymentDetails
            nextStep={nextStep}
            backStep={backStep}
            userInput={userInput}
        />
    
    const Confirmation = () => (
        <>
        <div>Confirmation</div>
        <Button onClick={ ()=> backStep() }>back</Button>
        </>
    );

    return (
        <>
            <div className={classes.toolbar} />
            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography variant='h4' align='center'>Checkout</Typography>
                    <Stepper activeStep={activeStep} className={classes.stepper}>
                        {
                            steps.map((step) => (
                                <Step key={step}>
                                    <StepLabel>{step}</StepLabel>
                                </Step>
                            ))
                        }
                    </Stepper>
                    { activeStep === steps.length ? <Confirmation /> : checkoutToken && <Form />}
                </Paper>
            </main>
        </>
    )
}

export default Checkout