import React,{useState,useEffect} from 'react';
import Products from './Components/Products/Products';
import  NavBar  from './Components/NavBar/NavBar';
import Cart from './Components/Cart/Cart';
import Checkout from './Components/CheckoutForm/Checkout/Checkout';
import {commerce} from './lip/commerce';
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
 

 const App = () => {
    const [products,setProducts] = useState([]);
    const [cart,setCart]=useState({});
    const [order,setOrder]=useState({});
    const [errorMessage,setErrorMessage]=useState('')

    const fetchProducts =async()=>{
        const {data}=await commerce.products.list();
    setProducts(data);}

    const fetchCart     =async()=>{
             setCart(await commerce.cart.retrieve());}
      // ---------------------Adding product to cart fnc-------------------------------
    const handleAddToCart=async(productId,quantity)=>{
        const {cart} =await commerce.cart.add(productId,quantity);
        setCart(cart);}
        //----------------------update product to cart  fnc-------------------------------
    const handleUpdateQnt=async(productId,quantity)=>{
     const {cart} =await commerce.cart.update(productId,{quantity})
    setCart(cart)}

    //---------------------------removing product from cart fnc---------------------

    const handleRemoveFromCart=async(productId)=>{
        const {cart} = await commerce.cart.remove(productId)
        setCart(cart)
    }
    //-------------------------empty cart fnc-----------------
    const handleemptyCart=async()=>{
        const {cart}=await commerce.cart.empty()
        setCart(cart);

    }
    //-----------------------create new order  ---------------

    const refreshCart=async()=>{
        const newCart =await commerce.cart.refresh();
        setCart(newCart)
    }
    const handlecapureCheckout=async(checkoutTokenId,newOrder)=>{
        try{
            const incomingOder=await commerce.checkout.capture(checkoutTokenId,newOrder);
          setOrder(incomingOder);
          refreshCart();

        }catch(error){
            setErrorMessage(error.data.error.message);

        }

    }
useEffect (()=>{
    fetchProducts();
    fetchCart();
},[]);
console.log(products);
    return (
        <Router>
        <div>
            <NavBar totalItems={cart.total_items}/>
          <Routes>
                <Route exact path='/' element={ <Products products={products} onAddToCart={handleAddToCart}/>}>
               
                </Route>
                <Route exact path='/cart' 
                element={ 
                <Cart cart={cart}
                handleUpdateQnt={handleUpdateQnt}
                handleRemoveFromCart={handleRemoveFromCart}
                handleemptyCart={handleemptyCart}
                       
                       
                       />}>
               
                </Route>
                <Route exact path='/checkout'
                element={
                    <Checkout
                     cart={cart}
                     order={order}
                     onCaptureCheckout={handlecapureCheckout}
                     error={errorMessage}
                     
                     
                     
                     />
                }>
               
                </Route>
                
                </Routes>  
        </div>
        </Router>
    )

    }

export default App