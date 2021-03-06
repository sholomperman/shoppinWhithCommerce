import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import useStyles from './cartStyles';
import CardItems from './cartItems/CartItems';
import { Link } from 'react-router-dom'


const Cart = ({ cart, handelUpdateCardQty, handelRemoveCart, handelEmptyCart }) => {
    const classes = useStyles();

    const EmptyCart = () => (
        <Typography variant='subtitle1'>You Dont Have anything in you cart
            <Link to='/' className={classes.link}> Start Shopping :)</Link>
        </Typography>
    );

    const FilledCart = () => (
        <>
            <Grid container spacing={4}>
                {
                    cart.line_items.map((i) => (
                        <Grid item xs={12} sm={4} key={i.id}>
                            <CardItems className={classes.CardItems} i={i} handelUpdateCardQty={handelUpdateCardQty} handelRemoveCart={handelRemoveCart}/>
                        </Grid>
                    ))
                }
            </Grid>
            <div className={classes.cardDetails}>
                <Typography className={classes.Subtotal} variant='14'>
                    Subtotal: {cart.subtotal.formatted_with_symbol}
                </Typography>
                <div>
                    <Button className={classes.emptyButton} size='large' type='button' variant='contained' color='secondary' onClick={handelEmptyCart}>Empty Cart</Button>
                    <Button className={classes.checkoutButton} size='large' type='button' variant='contained' color='primary' component={Link} to='/checkout'>Checkout</Button>
                </div>
            </div>
        </>
    );

    if (!cart.line_items) return 'Loading...';

    return (
        <Container>
            <div className={classes.toolbar} />
            <Typography className={classes.title} variant='h3' gutterBottom>Your Shopping Cart</Typography>
            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </Container>
    )
}

export default Cart
