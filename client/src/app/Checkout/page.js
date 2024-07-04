"use client"
import HomeHeader from '@/Components/HomeHeader'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form, Input, Radio, message } from 'antd'
import React, { useEffect, useState } from 'react'
import "./Style.css"
import CheckoutSidebar from '@/Components/CheckoutSidebar'
import PaymentMethods from '@/Components/PaymentMethods'
import Footer from '@/Components/Footer'
import axios from 'axios'
const page = () => {
    const [User, setUser] = useState([])
    const [Details, setDetails] = useState()
    const userid = localStorage.getItem('id')
    const [messageApi, contextHolder] = message.useMessage();
    const fetchUserDetails = async () => {
        const res = await axios.get(`https://ecommerce-app-nextjs.onrender.com/api/v1/user/${userid}`)
        console.log(res.data)
        setUser(res.data)
    }
    useEffect(() => {
        fetchUserDetails()
    }, [])
    const handleValues = (e) => {
        setUser({ ...User, [e.target.name]: e.target.value })
    }
   
    const SubmitValues = async () => {
        try {
            const res = await axios.put(`https://ecommerce-app-nextjs.onrender.com/api/v1/user/${userid}`, User)
            console.log(res)
            fetchUserDetails()
            message.success('User Details Updated.. Add Your Payment Method to Proceed!!!')
        } catch (error) {
            console.log(error)

        }
    }

    return (
        <div>
            <HomeHeader />
            <div className='flex center' style={{ width: "100%" }}>
                <main style={{ width: "80%" }}>
                    <div className='flex' style={{ gap: "15px", alignItems: "center" }}>
                        <h5 style={{ color: "#807D7E" }}>Home</h5>
                        <ArrowRightOutlined />
                        <h5>Add to Cart</h5>
                        <br /><br /><br />
                    </div>
                    <h3 style={{ textTransform: "capitalize", borderLeft: "4px solid #8A33FD", paddingLeft: "10px" }}>Check Out</h3>
                    <br /><br />
                    <div className='flex' style={{ gap: "30px" }}>

                        <div>

                            <h3 >Billing Details</h3>
                            <br />
                            <br />
                            <div style={{ width: "500px" }}>
                                {Object.keys(User).length > 0 && (
                                    <>
                                        <div className='flex' style={{ gap: "20px" }}>
                                            <Form.Item className='flex inputColumn' label='First Name' name="First name" >
                                                <Input name='firstName' defaultValue={User.firstName} onChange={(e) => handleValues(e)} placeholder='First Name' style={{ width: "350px" }} />
                                            </Form.Item>
                                            <Form.Item className='flex inputColumn' label='Last Name' name="Last Name">
                                                <Input name='lastName' defaultValue={User.lastName} onChange={(e) => handleValues(e)} placeholder='Last Name' style={{ width: "350px" }} />
                                            </Form.Item>
                                        </div>
                                        <div className='flex' style={{ gap: "20px" }}>
                                            <Form.Item className='flex inputColumn' label='Country / Region' name="Country / Region" >
                                                <Input name='country' defaultValue={User.country} onChange={(e) => handleValues(e)} placeholder='Country / Region' style={{ width: "350px" }} />
                                            </Form.Item>
                                            <Form.Item className='flex inputColumn' label='Company Name' name="Company Name">
                                                <Input name='companyName' defaultValue={User.companyName} onChange={(e) => handleValues(e)} placeholder='Company Name' style={{ width: "350px" }} />
                                            </Form.Item>
                                        </div>
                                        <div className='flex' style={{ gap: "20px" }}>
                                            <Form.Item className='flex inputColumn' label='Street Address' name="Street Address" >
                                                <Input name='streetAddress' defaultValue={User.streetAddress} onChange={(e) => handleValues(e)} placeholder='Street Address' style={{ width: "350px" }} />
                                            </Form.Item>
                                            <Form.Item className='flex inputColumn' label='Apt, suite, unit' name="Apt, suite, unit">
                                                <Input name='Apt' defaultValue={User.Apt} onChange={(e) => handleValues(e)} placeholder='Apt, suite, unit' style={{ width: "350px" }} />
                                            </Form.Item>
                                        </div>
                                        <div className='flex' style={{ gap: "20px" }}>
                                            <Form.Item className='flex inputColumn' label='City' name="City" >
                                                <Input name='city' defaultValue={User.city} onChange={(e) => handleValues(e)} placeholder='City' style={{ width: "225px" }} />
                                            </Form.Item>
                                            <Form.Item className='flex inputColumn' label='State' name="State">
                                                <Input name='state' defaultValue={User.state} onChange={(e) => handleValues(e)} placeholder='State' style={{ width: "225px" }} />
                                            </Form.Item>
                                            <Form.Item className='flex inputColumn' label='Postal Code' name="Postal Code">
                                                <Input name='postalCode' defaultValue={User.postalCode} onChange={(e) => handleValues(e)} placeholder='Postal Code' style={{ width: "225px" }} />
                                            </Form.Item>
                                        </div>
                                        <Form.Item className='flex inputColumn' label='Phone' name="Phone">
                                            <Input name='phone' defaultValue={User.phone} onChange={(e) => handleValues(e)} placeholder='Phone' style={{ width: "225px" }} />
                                        </Form.Item>
                                        <br />
                                        <Button onClick={() => SubmitValues()} style={{ backgroundColor: "#8A33FD", color: "#fff" }} size='large'>Continue to delivery</Button><br /><br /><br />
                                    </>)}
                            </div>
                            <Checkbox >Save my information for a faster checkout</Checkbox><br /><br />
                            <h2>Shipping Address</h2><br />
                            <p>Select the address that matches your card or payment method.</p><br />
                            <div>
                                <Radio className='bold' style={{ fontSize: '18px' }}>Same as Billing address</Radio><br />
                                <Radio className='bold' style={{ fontSize: '18px' }}>Use a different shipping address</Radio>
                            </div><br /><br />
                            <h2>Shipping Method</h2><br /><br />
                            <p>Arrives by Monday, June 7</p><br />
                            <div className='flex between' style={{ width: "500px" }}>
                                <div>
                                    <p style={{ marginBottom: "10px" }} className='bold'>Delivery Charges</p>
                                    <p style={{ fontSize: "12px" }}>Additional fess may apply</p>
                                </div>
                                <p className='bold'>$5.00</p>
                            </div><br /><br />
                            <h2>Payment Method</h2>
                            <p style={{ fontSize: "14px", marginTop: "10px" }}>All transactions are secure and encrypted.</p><br /><br />
                            <PaymentMethods />
                        </div>
                        <div>
                            <CheckoutSidebar />
                        </div>
                    </div>

                </main>

            </div>
            <Footer />
        </div>
    )
}

export default page
