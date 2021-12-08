import React from 'react';
import { Grid } from '@material-ui/core';
import Product from './product/Product';

const Products = ({ products, onCartChange }) => {
    if (products.length === 0) {
        return 'Loading...';
    } else {
        return (
            <main>
                <Grid container justify='center' spacing={4}>
                    {
                        products?.map((i) => (
                            <Grid item key={i.id} xs={12} sm={6} md={4} lg={3}>
                                <Product i={i} onCartChange={onCartChange} />
                            </Grid>
                        ))
                    }
                </Grid>
            </main>
        );
    }
}

export default Products

