import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import logo from '../../assets/commerce.png';
import useStyles from './NavStyles';
import { Link, useLocation } from 'react-router-dom'

const NavBar = ({ cardTotalItems }) => {
    const classes = useStyles()
    const location = useLocation()
    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit' >
                        <img src={logo} alt='shopping with strape' height='25px' className={classes.image} />
                        shopping with strape
                    </Typography>
                    <div className={classes.grow} />
                    {location.pathname === '/' && (
                        <div className={classes.button}>
                            <IconButton component={Link} to='/cart' aria-label='Show Card Item' color='inherit'>
                                <Badge badgeContent={cardTotalItems} color='secondary'>
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                        )}
                </Toolbar>
            </AppBar>
            <div className={classes.toolbar}/>
        </>
    )
}

export default NavBar
