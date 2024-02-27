"use client"

import { ArrowRightOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import "./Style.css"
import axios from 'axios'
import Productslist from './Products'
import stripe from "stripe"
import Link from 'next/link'
const Productlist = (props) => {
  const [Products, setProducts] = useState([])
  const [category, setCategory] = useState()
  const [WomensProducts, setWomensProducts] = useState([])


  const fetchProducts = async ()=>{
    try {
        const res = await axios.get(`http://localhost:9000/api/v1/Products/${props.data}`)
        console.log(res.data[0].products)
        setProducts(res.data[0].products)
    } catch (error) {
        console.log(error)
    }
}
useEffect(() => {
    fetchProducts()
    
}, []);
  // useEffect(() => {
  //   const category = props.data;
  //   // Check if the category exists in Productslist before setting it
  //   if (Productslist[category]) {
  //     setProducts(Productslist[category]);
  //     setCategory(category)
  //   } else {
  //     console.error(`Category "${category}" not found in Productslist`);
  //   }
  // }, [props.data]);


  return (
    <>
      {console.log(Products)}
      <h1 style={{ borderLeft: "5px solid #8A33FD", marginLeft: "150px", paddingLeft: "25px" }}>Categories For {props.data}</h1><br /><br />
      <div className='flex center' style={{ width: "100%" }}>
        {/* {console.log(products)} */}
        {Products && Products.length > 0 && <>
        <div className='flex center' style={{ width: "85%", gap: "50px", flexWrap: "wrap" }}>
          {
            Products.map(item => (
              <Link className='productcard' style={{ color: "#000", textDecoration: "none",padding:"10px" }} href={`/Product/${item._id}`}>
                <div style={{ width: "180px", height: "350px" }}>
                  <img style={{ width: "100%", height: "70%", objectFit: "contain", borderRadius: "15px" }} src={item.featuredImage} />
                  <br /><br />
                  <div className='flex between' style={{ width: "100%" }}>
                    <div>
                      <p style={{ fontWeight: "600" }}>
                        {item.title.split(' ').length <= 2
                          ? item.title
                          : item.title.split(' ').slice(0, 3).join(' ') + ' ...'}
                      </p>
                      <p>Explore Now!</p>
                    </div>
                    <div>
                      <ArrowRightOutlined style={{ fontSize: '25px' }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          }

        </div></>}
      </div>
    </>
  )
}

export default Productlist