import { Button, Form, Input, Radio, message } from 'antd';
import React, { useEffect, useState } from 'react';
// import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'
import "./Style.css"
import axios from 'axios';
const PaymentMethods = () => {
    const [selectedPayment, setSelectedPayment] = useState("creditCard");
    const [PaymentDetails, setPaymentDetails] = useState([]);
    const [CartDetails, setCartDetails] = useState([]);
    const [UserDetails, setUserDetails] = useState([]);
    const cart = localStorage.getItem('cart')
    const id = localStorage.getItem('id')
    const router = useRouter()
    const ManagingDetails = async () => {
        const ConvertedCart = JSON.parse(cart)
        setCartDetails(ConvertedCart)
        const res = await axios.get(`http://localhost:9000/api/v1/user/${id}`)
        setUserDetails(res.data)
        console.log(res.data)
    }
    useEffect(() => {
        ManagingDetails()
    }, [])

    const handlePaymentChange = (e) => {
        setSelectedPayment(e.target.value);
    };
    const handleValues = (e) => {
        setPaymentDetails({ ...PaymentDetails, [e.target.name]: e.target.value })
    }
    const handleOrder = async () => {
        if (!PaymentDetails.cardNumber || !PaymentDetails.ExpDate || !PaymentDetails.CVV || !PaymentDetails.OwnerName) {
            message.error("Please Fill Out All Payment Details")
        } else {
            try {
                const orderData = {
                    cartDetails: CartDetails,
                    // userDetails: UserDetails,
                    paymentDetails: PaymentDetails
                };
                const res = await axios.post('http://localhost:9000/api/v1/newOrder', orderData);
                console.log(res);
                message.success("Congrats !!! Order Placed Successfully")
                localStorage.removeItem('cart')
                router.push('/')

            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <>
            <div style={{ backgroundColor: "#F6F6F6", padding: "50px", borderRadius: "15px" }}>
                <Radio.Group onChange={handlePaymentChange} value={selectedPayment}>
                    <Radio value="creditCard">
                        <h2>Credit Card</h2>
                        <p>We accept all major credit cards.</p>

                    </Radio>

                    {selectedPayment === 'creditCard' && (
                        <>
                            <div style={{ width: '600px', marginTop: "20px" }}>
                                <img style={{ marginBottom: "15px" }} src='/images/Frame 444.png' />
                                <div className='flex between' style={{ gap: "30px", marginBottom: "15px" }}>
                                    <Input name='cardNumber' type='number' onChange={(e) => handleValues(e)} style={{ border: "1px solid #3C4242", height: "40px", background: "none" }} placeholder="Card number" />
                                    <Input name='OwnerName' onChange={(e) => handleValues(e)} style={{ border: "1px solid #3C4242", height: "40px", background: "none" }} placeholder="Name of card" />
                                </div>
                                <div className='flex between' style={{ gap: "40px" }}>
                                    <Input name='ExpDate' onChange={(e) => handleValues(e)} style={{ border: "1px solid #3C4242", height: "40px", background: "none" }} placeholder="Expiration date (MM/YY)" />
                                    <Input name='CVV' onChange={(e) => handleValues(e)} style={{ border: "1px solid #3C4242", height: "40px", background: "none" }} placeholder="Security Code" />
                                </div>

                            </div>
                        </>

                    )}
                    <hr style={{ width: "600px", marginTop: "20px" }} />
                    <br />
                    <Radio style={{ marginTop: "15px" }} value="cashOnDelivery">
                        <h2>Cash on delivery</h2>
                        <p>Pay with cash upon delivery.</p>
                    </Radio>

                    <hr style={{ width: "600px", marginTop: "20px" }} />
                    <br />
                    <br />
                    <Radio style={{ marginTop: "15px" }} value="paypal">
                        <h2>Paypal</h2>
                    </Radio>
                </Radio.Group>
            </div><br />
            <Button style={{ backgroundColor: "#8A33FD", color: "#fff" }} onClick={() => handleOrder()} size='large'>Pay Now</Button>
            <br /><br />
        </>
    );
};

export default PaymentMethods;
