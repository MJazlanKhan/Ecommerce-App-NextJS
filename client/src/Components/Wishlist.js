import { CloseOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import Image from 'next/image'
import React, { useState } from 'react'
import ProductswithPrice from './ProductswithPrice'

const Wishlist = () => {
    const [status, setStatus] = useState('products')
    return (
        <div>
            {status === 'products' &&
                <>
                    <div style={{ paddingLeft: "15px" }}>
                        <h2>Wishlist</h2><br />
                        <div className='flex between'>
                            <div className='flex' style={{ gap: "10px" }}>
                                <CloseOutlined />
                                <Image
                                    src="/images/Rectangle13.png"
                                    width={100}
                                    height={100}
                                    alt="Picture of the author"
                                />
                                <div className='flex column' style={{ justifyContent: "center", fontSize: "16px" }}>
                                    <p className='bold' style={{ marginBottom: "5px" }}>Blue Flower Print Crop Top </p>
                                    <p className='bold' style={{ marginBottom: "5px" }}>Color : Yellow</p>
                                    <p className='bold'>Quantity : 1</p>
                                </div>
                            </div>
                            <div className='flex' style={{ gap: "20px", alignItems: "center" }}>
                                <p className='bold' style={{ color: "#807D7E" }}>$29.00</p>
                                <Button style={{ backgroundColor: "#8A33FD", color: "#fff" }}>Add to cart</Button>
                            </div>
                        </div><br />
                        <hr style={{ borderColor: "#EDEEF2" }} /><br />
                        <div className='flex between'>
                            <div className='flex' style={{ gap: "10px" }}>
                                <CloseOutlined />
                                <Image
                                    src="/images/Rectangle13.png"
                                    width={100}
                                    height={100}
                                    alt="Picture of the author"
                                />
                                <div className='flex column' style={{ justifyContent: "center", fontSize: "16px" }}>
                                    <p className='bold' style={{ marginBottom: "5px" }}>Blue Flower Print Crop Top </p>
                                    <p className='bold' style={{ marginBottom: "5px" }}>Color : Yellow</p>
                                    <p className='bold'>Quantity : 1</p>
                                </div>
                            </div>
                            <div className='flex' style={{ gap: "20px", alignItems: "center" }}>
                                <p className='bold' style={{ color: "#807D7E" }}>$29.00</p>
                                <Button style={{ backgroundColor: "#8A33FD", color: "#fff" }}>Add to cart</Button>
                            </div>
                        </div><br />
                        <hr style={{ borderColor: "#EDEEF2" }} /><br />
                    </div>
                </>}
            {status === 'empty' && <>
                <div className='flex center column'>
                    <Image src='/images/heart.png' width="200" height="200" /><br />
                    <h2>Your wishlist is empty.</h2><br/>
                    <p style={{textAlign:"center"}}>You don’t have any products in the wishlist yet. You will find a lot<br/>
                        of interesting products on our Shop page.</p><br/>
                        <Button style={{backgroundColor:"#8A33FD", color:"#fff"}}>Continue Shopping</Button>
                </div><br/>
                {/* <ProductswithPrice data={"mens"}/> */}
            </>}
        </div>
    )
}

export default Wishlist