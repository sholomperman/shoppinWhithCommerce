import {React, useState, useEffect} from 'react';
import NavBar from './components/navBar/NavBar';
import Products from './components/products/Products';
import Cart from './components/cart/Cart';
import { commerce } from './lib/commerce';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Checkout from './components/checkoutForm/checkout/Checkout';

const App = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState({})

    const fetchData = async () => {
        const { data } = await commerce.products.list();
        setProducts(data)
    }

    const fetchCart = async () => {
        setCart(await commerce.cart.retrieve());
    }

    const handelProductCartChange = async (productId, quantity) => {
        const { cart } = await commerce.cart.add(productId, quantity)
        setCart(cart)
    }

    useEffect(() => {
        fetchData();
        fetchCart();
    }, [])
    
    const handelUpdateCardQty = async(productId, quantity) => {
        const { cart } = await commerce.cart.update(productId, { quantity })
        setCart(cart)
    }

    const handelRemoveCart = async(productId) => {
        const { cart } = await commerce.cart.remove(productId)
        setCart(cart)
    }

    const handelEmptyCart = async() => {
        const { cart } = await commerce.cart.empty()
        setCart(cart)
    }
    return (
        <Router>
            <div>
            <NavBar cardTotalItems={cart.total_items} />
                <Routes>
                    <Route exact path='/' element={
                        <Products
                            products={products}
                            onCartChange={handelProductCartChange}/> }>
                    </Route>
                    <Route
                        exact path='/cart' element={
                            <Cart cart={cart}
                            handelUpdateCardQty={handelUpdateCardQty}
                            handelRemoveCart={handelRemoveCart}
                            handelEmptyCart={handelEmptyCart} /> }>
                    </Route>
                    <Route exact path='/checkout' element={
                        <Checkout
                        cart={cart} /> }>
                    </Route>
                </Routes>
            </div>
        </Router>
    )
}

export default App