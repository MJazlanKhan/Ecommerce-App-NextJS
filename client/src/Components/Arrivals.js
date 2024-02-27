"use client"

import React, { useEffect, useState } from 'react'
import "./Style.css"
import axios from 'axios'
// import Productslist from './Products'
import Link from 'next/link'
const Arrivals = () => {
    const [Products, setProducts] = useState([])
    const displayProduct = async () => {
        const res = await axios.get("http://localhost:9000/api/v1/Products")
        const data = res.data
        const sortedProducts = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        // Select the latest 4 products
        const latestProducts = sortedProducts.slice(0, 4);
        setProducts(latestProducts);
    }
    useEffect(() => {
        displayProduct()
    }, [])

    return (
        <>
            <h1 style={{ borderLeft: "5px solid #8A33FD", marginLeft: "150px", paddingLeft: "25px" }}>New Arrivals</h1><br /><br />
            <div className='flex center product'>

                <div className='flex center' style={{ gap: "50px", width: "80%", flexWrap: "wrap" }}>

                    {Object.values(Products).flat().map(product => (
                        // <Product key={product.id} product={product} />
                        <Link style={{ color: "#000", textDecoration: "none" }} href={`/Product/${product._id}`}>
                            <div className='card' key={product._id}>
                                <img style={{ objectFit: "contain" }} src={product.featuredImage} alt='Product Image' /><br />
                                <p className='productname'>{product.title}</p>
                            </div>
                        </Link>
                    ))}
                </div>
                <br /><br />

            </div>
        </>
    )
}

export default Arrivals