import React, { useEffect, useState } from 'react'
import "./Style.css"

const CheckoutSidebar = () => {
    const [productPrice, setProductPrice] = useState(0); // State variable to store total product price
    const [cart, setCart] = useState([]); // State variable to store cart items
    const [Quantity, setQuantity] = useState(1); // State variable to store cart items

    useEffect(() => {
        const cartItems = localStorage.getItem('cart'); // Retrieve cart items from localStorage
        if (cartItems) {
            const convertedCart = JSON.parse(cartItems);
            setCart(convertedCart);
            calculateTotalPrice(convertedCart); // Calculate total price when cart items change
        }
    }, []);

    // Function to calculate total price of all products in the cart
    const calculateTotalPrice = (cart) => {
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += parseFloat(item.price); // Assuming price is stored in each item object
        });
        setProductPrice(totalPrice);
    };

    return (
        <div>
            <div className='summarybox'>
                <h2>Order Summary</h2><br /><br />
                {cart.map((item, index) => (
                    <div key={index} className='flex' style={{ gap: "15px" }}>
                        <div>
                            <img style={{ width: "50px", height: "60px", objectFit: "contain" }} src={item.featuredImage} alt={item.title} />
                        </div>
                        <div className='flex column' style={{ justifyContent: "center", fontSize: "14px" }}>
                            <p style={{ marginBottom: "5px" }}>{item.title} x  {item.quantity ? item.quantity : Quantity}</p>
                            <p className='flex ' style={{gap:'5px'}}>Color : <div style={{width:'15px',borderRadius:"100%", height:'15px', backgroundColor:`${item.selectedColor ? item.selectedColor : item.productColors[0]}`}}></div></p>
                        </div>
                        <div className='flex center' style={{ marginLeft: '15px' }}>
                            <p>
                                {item.quantity ? item.quantity : Quantity} * {item.price} = {item.quantity ? item.quantity * item.price : Quantity * item.price}</p>
                        </div>
                    </div>
                ))}
                <br /><br /><br />
                <div>
                    <div className='flex between' style={{ marginBottom: "5px" }}><p className='bold'>Subtotal ( {cart.length} items )</p> <p>$ {cart.reduce((total, item) => total + (parseFloat(item.price) * (item.quantity ? item.quantity : Quantity)), 0)}</p></div>
                    <div className='flex between'><p className='bold'>Savings</p><p>$00.00</p></div><br />
                    <div className='flex between'><p className='bold'>Shipping</p><p>-$00.00</p></div><br />
                    <div className='flex between'><p className='bold'>Total</p><p>$ {cart.reduce((total, item) => total + (parseFloat(item.price) * (item.quantity ? item.quantity : Quantity)), 0)}</p></div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutSidebar;
