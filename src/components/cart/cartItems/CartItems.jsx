import React from 'react';
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core';
import useStyles from './cardItemsStyles';


const CartItems = ({ i, handelUpdateCardQty, handelRemoveCart }) => {
    const classes = useStyles()
    return (
        <Card>
            <CardMedia image={i.image.url} alt={i.name} className={classes.media} />
            <CardContent>
                <Typography variant='h6'>{i.name}</Typography>
                <Typography variant='h7'>{i.line_total.formatted_with_symbol}</Typography>
            </CardContent>
            <CardActions className={classes.CardActions}>
                <div className={classes.buttons}>
                    <Button type='button' size='small' onClick={() => handelUpdateCardQty(i.id, i.quantity + 1)}>+</Button>
                    <Typography>{i.quantity}</Typography>
                    <Button type='button' size='small' onClick={() => handelUpdateCardQty(i.id, i.quantity - 1)}>-</Button>
                </div>
                <Button variant='contained' type='button' color='secondary' onClick={() => handelRemoveCart(i.id)}>Remove</Button>
            </CardActions>
        </Card>
    )
}

export default CartItems
