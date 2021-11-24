import React from 'react'
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './Styles';

const Product = ({ i, onCartChange }) => {
    const classes = useStyles()
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} alt={i.name} image={i.image?.url} title={i.name} />
            <CardContent>
                <div className={classes.cardContent}>
                    <Typography variant='h5' gutterBottom>
                        {i.name}
                    </Typography>
                    <Typography variant='h5' gutterBottom>
                        {i.price.formatted_with_symbol}
                    </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: i.description}} variant='h12' color='textSecondary'/>
            </CardContent>
            <CardActions disableSpacing className={classes.cardActions}>
                <IconButton aria-label='add to cart' onClick={() => {onCartChange(i.id, 1)}}>
                    <AddShoppingCart />
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
