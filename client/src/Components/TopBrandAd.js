import { ArrowRightOutlined } from '@ant-design/icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const TopBrandAd = () => {
    // const [WomensProducts, setWomensProducts] = useState([])
    // const womensProducts = async () => {
    //     const res = await axios.get("https://dummyjson.com/products/category/fragrances")
    //     const data = res.data.products
    //     let mappedItems = data.slice(0, 15);
    //     setWomensProducts(mappedItems)
    //   }
    //   useEffect(() => {
    //     womensProducts()
    //   }, [])
    const images = [
        "images/Brands/image 7.png",
        "images/Brands/image 18.png",
        "images/Brands/image 19.png",
        "images/Brands/image 20.png",
        "images/Brands/image 21.png",
    ]
    return (
        <>
            <div className='flex center' style={{ width: "100%" }}>
                <div className='flex column' style={{ backgroundColor: "#3C4242", width: "80%", padding: "25px", alignItems: "center", borderRadius: "15px" }}>
                    <h1 style={{ fontSize: "45px", color: "#fff" }}>Top Brands Deal</h1><br />
                    <h4 style={{ color: "#fff" }}>Up To <span style={{ color: "yellow" }}> 60% </span> off on brands</h4><br /><br />
                    <div className='flex' >
                        {images.map(image => {
                            return (
                                <div className='flex center' style={{ backgroundColor: "#fff", marginRight: "25px", width: "170px", height: "auto", borderRadius: "20px", objectFit: "contain" }} >
                                    <img src={image} />
                                </div>
                            )
                        })}</div>
                </div>
            </div><br/><br/><br/>
            {/* <div>
                <h1 style={{ borderLeft: "5px solid #8A33FD", marginLeft: "150px", paddingLeft: "25px" }}>In The Limelight</h1><br /><br />
                <div className='flex center' style={{ width: "100%" }}>
        <div className='flex center' style={{ width: "85%", gap: "50px", flexWrap: "wrap" }}>
          {
            WomensProducts.map(item => (
              <div style={{ width: "180px", height: "400px" }}>
                <img style={{ width: "100%", height: "70%" }} src={item.images[0]} />
                <br /><br />
                <div className='flex between' style={{ width: "100%" }}>
                  <div>
                    <h4>{item.title}</h4><br />
                    <p>Explore Now!</p>
                  </div>
                  <div>
                    <ArrowRightOutlined style={{ fontSize: '25px' }} />
                  </div>
                </div>
              </div>
            ))
          }


        </div>
      </div>
            </div> */}
        </>
    )
}

export default TopBrandAd