"use client"

import React from 'react'
import { Button, Carousel } from 'antd';
// import img1 from "../"
import './Style.css';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
const Hero = () => {
    const carouselRef = React.createRef();

    const images = [
        '/images/slider.png',
        'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmFubmVyfGVufDB8fDB8fHww',
    ];

    const handlePrev = () => {
        if (carouselRef.current) {
            carouselRef.current.prev();
        }
    };

    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.next();
        }
    };
  return (
    <div>
        <Carousel ref={carouselRef}>
    {images.map((image, index) => (
        <div key={index}>
            <div style={{ backgroundImage: `url(${image})`,backgroundSize:"cover", backgroundRepeat:"no-repeat", height: "90vh", width: "100%" }} className='flex between'>
                <ArrowLeftOutlined style={{ fontSize: "30px", color: "#fff", marginLeft: "30px" }} onClick={handlePrev} />
                <div style={{ width: "90%", height: "100%" }}>
                    <div style={{ width: "50%" }}></div>
                    <div className='flex column' style={{ width: "50%", height: "100%" , justifyContent:"center", paddingLeft:"120px", color:"#fff"}}>
                        <h2 style={{fontSize:"30px"}}>T-shirt / Tops</h2>
                        <h2 style={{fontSize:"70px", fontWeight:"900"}}>Summer</h2>
                        <h2 style={{fontSize:"70px", fontWeight:"900", marginTop:"-25px"}}>Value Pack</h2>
                        <h2 style={{fontSize:"30px"}}>cool / colorful / comfy</h2><br/>
                        <Button  style={{color:"#000", width:"220px", height:"50px", fontSize:"22px"}}>Shop Now</Button>

                    </div>
                </div>
                <ArrowRightOutlined style={{ fontSize: "30px", color: "#fff", marginRight: "30px" }} onClick={handleNext} />
            </div>
        </div>
    ))}
</Carousel>
</div>
  )
}

export default Hero