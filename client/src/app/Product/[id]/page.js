'use client'
import React, { useState, useEffect, useRef } from 'react'
import HomeHeader from '@/Components/HomeHeader'
import { Button, Carousel, Tabs, message } from 'antd';
import { ArrowDownOutlined, ArrowRightOutlined, ArrowUpOutlined, CalendarOutlined, CarOutlined, CommentOutlined, DeploymentUnitOutlined, ShoppingCartOutlined, SkinOutlined } from "@ant-design/icons"
import './VerticalCarousel.css'
import ProductswithPrice from '@/Components/ProductswithPrice';
import Footer from '@/Components/Footer';
import Productslist from '@/Components/Products';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

const Page = ({ params, searchParams }) => {
  const [Product, setProduct] = useState({});
  const [ProductSizes, setProductSizes] = useState([]);
  const [ProductColors, setProductColors] = useState([]);
  const [ProductImages, setProductImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [messageApi, contextHolder] = message.useMessage();
  const carouselRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:9000/api/v1/Product/${params.id}`);
        const data = res.data;
        console.log(data);
        setProduct(data);
        setProductImages(data.moreImages.slice(0, 4));
        setProductSizes(data.productSizes);
        setProductColors(data.productColors);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [params.id]);

  const userid = localStorage.getItem('id');

  const fetchUserDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:9000/api/v1/user/${userid}`);
      const userData = res.data;
      setProduct((prevProduct) => ({ ...prevProduct, userDetail: userData }));
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    if (userid) {
      fetchUserDetails();
    }
  }, [userid]);

  useEffect(() => {
    console.log("Updated Product State:", Product);
  }, [Product]);


  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + ProductImages.length) % ProductImages.length);
  };

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % ProductImages.length);
  };

  const handleSelectColor = (itemId, color) => {
    let updatedProduct;
    if (Array.isArray(Product)) {
      updatedProduct = Product.map(item => {
        if (item._id === itemId) {
          return { ...item, selectedColor: color };
        }
        return item;
      });
    } else {
      updatedProduct = { ...Product, selectedColor: color };
    }
    setProduct(updatedProduct);
    message.success("Color Selected");
    console.log(color);
    console.log(itemId);
  };

  const addItemToLocalStorage = async () => {
    try {
        const existingCart = localStorage.getItem("cart");
        let cartArray = existingCart ? JSON.parse(existingCart) : [];
  
        if (!Array.isArray(cartArray)) {
          cartArray = [Product];
        } else {
          cartArray.push(Product);
        }
        localStorage.setItem("cart", JSON.stringify(cartArray));
  
        console.log(cartArray);
      }
     catch (error) {
      console.log(error);
    }
  };
  

  return (
    <>
      <div className="flex center column" style={{ width: "100%" }}>
        <HomeHeader />
        <div className='flex center' style={{ width: "80%" }}>
          <div className="flex column" style={{ width: '10%', justifyContent: "center" }}>
            <Carousel ref={carouselRef} autoplay={false} vertical slidesToShow={4} beforeChange={(from, to) => setCurrentSlide(to)} selectedIndex={currentSlide}>
              {ProductImages.map((image, index) => (
                <div key={index}>
                  <img
                    style={{ width: "40px", height: "40px", margin: "10px" }}
                    src={image}
                    alt={`Image ${index}`}
                  />
                </div>
              ))}
            </Carousel>
            <div className='flex column center' style={{ width: "50px", fontSize: "18px" }}>
              <ArrowDownOutlined onClick={handlePrev} style={{ backgroundColor: "#fff", padding: "8px", borderRadius: "100%", border: "1px solid #3C4242", cursor: "pointer" }} /><br />
              <ArrowUpOutlined onClick={handleNext} style={{ backgroundColor: "#3C4242", padding: "8px", borderRadius: "100%", color: "#fff", cursor: "pointer" }} />
            </div>
          </div>
          <div>{ProductImages.length > 0 && (
            <img style={{ width: "500px" }} src={ProductImages[currentSlide]} alt={`Current Image`} />
          )}</div>
          <div style={{ verticalAlign: "top", minHeight: "374px", padding: "25px" }}>
            <h2> {Product.title} </h2><br />
            <div className='flex ' style={{ gap: "30px" }}>
              {Product.rating > 4 && (
                <div className='flex center' style={{ gap: "5px" }}><img src="/images/star.png" alt="star" /><img src="/images/star.png" alt="star" /><img src="/images/star.png" alt="star" /><img src="/images/star.png" alt="star" /><img src="/images/star.png" alt="star" /> <p>{Product.rating}</p></div>
              )}
              {Product.rating > 3 && Product.rating < 5 && (
                <div className='flex center' style={{ gap: "5px" }}><img src="/images/star.png" alt="star" /><img src="/images/star.png" alt="star" /><img src="/images/star.png" alt="star" /><img src="/images/star.png" alt="star" /> <p>{Product.rating}</p></div>
              )}
              <div className='flex center' style={{ gap: "5px" }}><CommentOutlined /><p>120 Comments</p></div>
            </div><br /><br />
            <div className='flex' style={{ alignItems: "center", gap: "25px" }}>
              <p>Select Size</p>
              <p>Size Guide <ArrowRightOutlined /></p>
            </div><br /><br />
            <div className='flex' style={{ alignItems: "center", gap: "25px" }}>
              {ProductSizes.map((item, index) => (
                <p key={index} className='sizebtn flex center'>{item}</p>
              ))}
            </div><br /><br />
            <p>Colours Available </p><br />
            <div className='flex' style={{ gap: "10px" }}>
              {ProductColors.map((item, index) => (
                <div key={index} className='color' onClick={() => handleSelectColor(Product._id, item)} style={{ backgroundColor: `${item}`, border: "1px solid #000", cursor: 'pointer' }}></div>
              ))}
            </div><br />
            <div className='flex ' style={{ alignItems: "center", gap: "25px" }} >
              <Link href={`/Cart`}>
                <Button size='large' onClick={addItemToLocalStorage} style={{ backgroundColor: "#000", color: "#fff" }}><ShoppingCartOutlined /> Add To Cart</Button>
              </Link>
              <Button size='large' style={{ border: "1px solid #3C4242", color: "#000" }}>$ {Product.price}.00</Button>
            </div><br /><hr></hr><br />
            <div>
              <div className='flex' style={{ gap: "20px", color: "#3C4242" }}>
                <div className='flex' style={{ gap: "15px", alignItems: "center" }}><CalendarOutlined className='flex center' style={{ fontSize: "20px", backgroundColor: "#F6F6F6", width: "40px", height: "35px", borderRadius: "100%" }} /> <p>Secured Payment</p></div>
                <div className='flex' style={{ gap: "15px", alignItems: "center" }}><SkinOutlined className='flex center' style={{ fontSize: "20px", backgroundColor: "#F6F6F6", width: "40px", height: "35px", borderRadius: "100%" }} /> <p>Size & Fit</p></div>
              </div><br />
              <div className='flex' style={{ gap: "20px", color: "#3C4242" }}>
                <div className='flex' style={{ gap: "15px", alignItems: "center" }}><CarOutlined className='flex center' style={{ fontSize: "20px", backgroundColor: "#F6F6F6", width: "40px", height: "35px", borderRadius: "100%" }} /> <p>Secured Payment</p></div>
                <div className='flex' style={{ gap: "15px", alignItems: "center" }}><DeploymentUnitOutlined className='flex center' style={{ fontSize: "20px", backgroundColor: "#F6F6F6", width: "40px", height: "35px", borderRadius: "100%" }} /> <p>Size & Fit</p></div>
              </div>
            </div>
          </div>
        </div><br /><br />
        <div className='flex center' style={{ width: "100%" }}>
          <div className='flex center' style={{ width: "80%" }}>
            <div style={{ width: "50%" }}>
              <h1 style={{ borderLeft: "5px solid #8A33FD", paddingLeft: "25px" }}>Product Description</h1><br />
              <Tabs defaultActiveKey="1">
                <Tabs.TabPane key="1" tab="Description">
                  <div><br /><br />
                    <p dangerouslySetInnerHTML={{ __html: Product.description }}></p><br /><br />
                    <table style={{ width: "90%", backgroundColor: "#F6F6F6" }}>
                      <thead >
                        <tr className='flex center ' style={{ width: "100%", gap: "50px", padding: "10px", fontSize: "16px", color: "#807D7E" }}>
                          <th style={{ width: "30%", textAlign: "left" }}>Fabric</th>
                          <th style={{ width: "30%", textAlign: "left" }}>Pattern</th>
                          <th style={{ width: "30%", textAlign: "left" }}>Fit</th>
                        </tr>
                      </thead>
                      <tbody >
                        <tr className='flex center' style={{ width: "100%", gap: "50px", padding: "10px", color: "#3C4242" }}>
                          <td style={{ width: "30%", textAlign: "left" }}>Bio-washed Cotton</td>
                          <td style={{ width: "30%", textAlign: "left" }}>Regular-fit</td>
                          <td style={{ width: "30%", textAlign: "left" }}>Printed</td>
                        </tr>
                      </tbody>
                      <thead >
                        <tr className='flex center ' style={{ width: "100%", gap: "50px", padding: "10px", fontSize: "16px", color: "#807D7E" }}>
                          <th style={{ width: "30%", textAlign: "left" }}>Neck</th>
                          <th style={{ width: "30%", textAlign: "left" }}>Sleeve</th>
                          <th style={{ width: "30%", textAlign: "left" }}>Style</th>
                        </tr>
                      </thead>
                      <tbody >
                        <tr className='flex center' style={{ width: "100%", gap: "50px", padding: "10px", color: "#3C4242" }}>
                          <td style={{ width: "30%", textAlign: "left" }}>Round Neck</td>
                          <td style={{ width: "30%", textAlign: "left" }}>Half-sleeves</td>
                          <td style={{ width: "30%", textAlign: "left" }}>Casual Wear</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Tabs.TabPane>
                <Tabs.TabPane key="2" tab="User comments">User comments</Tabs.TabPane>
                <Tabs.TabPane key="3" tab="Question & Answer">Question & Answer</Tabs.TabPane>
              </Tabs>
            </div>
            <div style={{ width: "50%" }}>
              <img style={{ width: "100%", height: "250px", marginTop: "100px", borderRadius: "15px", objectFit: "cover" }} src={Product.featuredImage} alt="Featured" />
            </div>
          </div>
        </div><br /><br />
        {/* <ProductswithPrice data={category}/><br/><br/> */}
      </div>
      <Footer />
    </>
  );
};

export default Page;
