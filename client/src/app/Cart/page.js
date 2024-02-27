"use client"
import HomeHeader from '@/Components/HomeHeader'
import NumberBtn from '@/Components/category/NumberBtn'
import { ArrowRightOutlined, DeleteOutlined } from '@ant-design/icons'
import { Button, Popconfirm, Table } from 'antd'
import Link from 'next/link'
import Productslist from '@/Components/Products'
import React, { useEffect, useState } from 'react'
import "./Style.css"
import { Input } from 'antd';
import Footer from '@/Components/Footer'
import Image from 'next/image'

const page = (props) => {

    const { Search } = Input;
    const [Product, setProduct] = useState([])
    const [status, setStatus] = useState('items')

    const cart = localStorage.getItem('cart')
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (cart) {
            const convertedProduct = JSON.parse(cart);
            setProduct(convertedProduct);
        } else {
            setStatus('empty');
        }
    }, [cart]);

    const removeFromTheCart = (itemId) => {
        console.log(itemId)

        const updatedProduct = Product.filter(item => item._id !== itemId);


        setProduct(updatedProduct);


        localStorage.setItem("cart", JSON.stringify(updatedProduct));
    };
    const [quantity, setQuantity] = useState(1);
    const updateCart = (updatedProduct) => {
        setProduct(updatedProduct);
        localStorage.setItem("cart", JSON.stringify(updatedProduct));
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        const updatedProduct = Product.map(item => {
            console.log(item)
            if (item._id === itemId) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        });
        updateCart(updatedProduct);
    };
    const dataSource = Product.map((item) => ({
        key: item._id,
        ProductDetails: (
            <>
                <div className='flex' style={{ gap: "10px", alignItems: "center" }}>
                    <img src={item.featuredImage} alt={item.title} style={{ width: '100px', maxHeight: '50px', marginRight: '10px', objectFit: "contain" }} />
                    {item.title}
                </div>
            </>
        ),
        Price: item.price,
        Quantity: <NumberBtn defaultValue={item.quantity ? item.quantity : 1} onChange={(newQuantity) => handleQuantityChange(item._id, newQuantity)} />,
        // Subtotal: item.price * item.quantity,
        Subtotal: item.quantity ? item.quantity * item.price :  item.price,
        shipping: 'Free',
        action: (
            <Popconfirm
                title="Delete this Product"
                description="Are you sure to Delete this Product?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => removeFromTheCart(item._id)}
            >
                <DeleteOutlined style={{ fontSize: "25px" }} />
            </Popconfirm>
        )
    }));

    const columns = [
        {
            title: 'Product Details',
            dataIndex: 'ProductDetails',
            key: 'ProductDetails',
        },
        {
            title: 'Price',
            dataIndex: 'Price',
            key: 'Price',
        },
        {
            title: 'Quantity',
            dataIndex: 'Quantity',
            key: 'Quantity',
        },
        {
            title: 'Shipping',
            dataIndex: 'shipping',
            key: 'shipping',
        },
        {
            title: 'Subtotal',
            dataIndex: 'Subtotal',
            key: 'Subtotal',
            shipping: 'Free',

        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action'
        },
    ];


    return (
        <div className='cartPage'>
            <HomeHeader style={{ borderBottom: "1px solid #BEBCBD" }} />
            <hr />
            {status === 'items' &&
                <>
                    <div className='flex center' style={{ width: '100%' }}>

                        <div style={{ width: '80%' }}>
                            <br /><br />
                            <div className='flex' style={{ gap: "15px" }}>
                                <h3 style={{ color: "#807D7E" }}>Home</h3>
                                <ArrowRightOutlined />
                                <h3>Add to Cart</h3>
                            </div>
                            <br /><br />
                            <p>Please fill in the fields below and click place order to complete your purchase!</p><br />
                            <p>Already registered? <Link href='/Signin'> Please login here</Link></p>
                        </div>
                    </div>
                    <br /><br />
                    <Table style={{ padding: "0 50px" }} dataSource={dataSource} columns={columns} />;<br /><br />
                    <div className='flex center' style={{ width: "100%" }}>
                        <div className='flex between' style={{ width: "80%" }}>
                            <div>
                                <h4>Discount  Codes</h4><br />
                                <p>Enter your coupon code if you have one</p><br />
                                <Search placeholder="input search text" enterButton="Apply Coupon" size="large" loading />
                                <br /><br />
                                <Button>Continue Shopping</Button>
                            </div>
                            <div style={{ width: "350px" }}>
                                <div className='flex between' style={{ gap: "10px" }}>
                                    <p>Sub Total </p>
                                    <p>$ {Product.reduce((total, item) => total + (parseFloat(item.price) * (item.quantity ? item.quantity : 1)), 0)}</p>
                                </div><br />
                                <div className='flex between' style={{ gap: "10px" }}>
                                    <p>Shipping</p>
                                    <p>$00.00</p>
                                </div><br /><br />
                                <div className='flex between' style={{ gap: "10px" }}>
                                    <p>Grand Total</p>
                                    <p>$ {Product.reduce((total, item) => total + (parseFloat(item.price) * (item.quantity ? item.quantity : 1)), 0)}</p>
                                </div><br /><br /><hr />
                                <br /><br />
                                <div className='flex center'>
                                    {!token && <>
                                        <Link href="/Signin"> <Button style={{ backgroundColor: "#8A33FD", color: "#fff" }} size='large'>Proceed To Checkout</Button></Link>
                                    </>}
                                    {token && <>
                                        <Link href="/Checkout"> <Button style={{ backgroundColor: "#8A33FD", color: "#fff" }} size='large'>Proceed To Checkout</Button></Link>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                </>}
            {status === 'empty' && <>
                <div className='flex center' style={{ width: "100%" }}>
                    <div className='flex column center' style={{ width: "90%" }}>
                        {/* <img src="images/emptycart.png" /> */}<br />
                        <Image
                            style={{ objectFit: "contain" }}
                            src="/images/emptycart.png"
                            width={600}
                            height={400}
                            alt="Empty Cart"
                        /><br />
                        <h2>Your cart is empty and sad :( </h2><br />
                        <p style={{ color: "#807D7E" }}>Add something to make it happy!</p><br />
                        <Button size='large' style={{ backgroundColor: "#8A33FD", color: "#fff" }}>Continue Shopping</Button>
                    </div>
                </div>
            </>}
            <br /><br />
            <Footer />
        </div>
    )
}

export default page