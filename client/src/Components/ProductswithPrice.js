"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Productslist from './Products'
import "./Style.css"
const ProductswithPrice = (props) => {
    const [Products, setProducts] = useState([])
    const [Category, setCategory] = useState()

    useEffect(() => {
        // console.log(props.data)
        setProducts(props.data)
        
    }, [props]);
    
    return (
        <div style={{ padding: "10px 35px", width: "100%" }}><br />
            {/* <div className='flex between headline'>
                {props.data && props.data.id ? (
                    <>
                        <h3 style={{ textTransform: "capitalize" }}>{props.data.id}</h3>
                        <div className='flex center' style={{ gap: "25px" }}>
                            <h3>New</h3>
                            <h3>Recommended</h3>
                        </div>
                    </>
                ) : (
                    <></>
                )}
                {props.data && !props.data.id ? (
                    <h3 style={{ textTransform: "capitalize", marginLeft: "25px" }}>Similar Products</h3>
                ) : (
                    <></>
                )}

            </div>
            {console.log(Products)}
            <br /><br /> */}
            <div className='products flex center' style={{ gap: "25px", flexWrap: "wrap" }}>
                {Products.map(item => (
                    // console.log(item)
                    <Link className='productcard' style={{ color: "#000", textDecoration: "none",padding:"12px", backgroundColor:"#EFF0F1",borderRadius:'10px' }} href={`/Product/${item._id}`}>
                        <div>
                            <img className='productimg' style={{ width: '220px', height: '280px', objectFit:"contain" }} src={item.featuredImage} />
                            <div className='flex between' style={{ width: "100%", padding: "25px 0" }} >
                                <div className='flex column'>
                                    <p style={{ fontWeight: "600" , width:"170px" }}>
                                        {item.title.split(' ').length <= 4
                                            ? item.title
                                            : item.title.split(' ').slice(0, 4).join(' ') + ' ...'}
                                    </p>


                                    {/* <p style={{ fontSize: "13px", marginTop: "5px" }}>{item.brand}</p> */}
                                    </div>
                                <div className='flex center' style={{ fontWeight: "600", width: "60px", height: "30px", padding: "5px", borderRadius: "3px", backgroundColor: "#F6F6F6" }}>$ {item.price}</div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default ProductswithPrice