import React from 'react';
import { Button } from '@material-ui/core';
// Paper, Stepper, Step, StepLabel, Typography, CircularProgress, Divider,
const PaymentDetails = ({ nextStep, backStep, userInput }) => {
    return (
        <div>
            <h1>{ userInput.firstName}</h1>
            <Button type='submit' variant='contained' color='primary' onClick={() => nextStep()}>Next</Button>
            <Button onClick={() => backStep()}>back</Button>
        </div>
    )
}

export default PaymentDetails
