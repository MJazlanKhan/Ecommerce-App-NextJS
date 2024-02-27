"use client"
import Card from '@/Components/Card'
import Footer from '@/Components/Footer'
import HomeHeader from '@/Components/HomeHeader'
import Productlist from '@/Components/Productlist'
import ProductswithPrice from '@/Components/ProductswithPrice'
import Sidebar from '@/Components/category/Sidebar'
import { Table } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import Productslist from '@/Components/Products'
const page = ({ params }) => {
    const {id} = params
    //     const router = useRouter();
    //   const { category } = router.query;
    const [Products, setProducts] = useState([])

    const fetchProducts = async ()=>{
        try {
            const res = await axios.get(`http://localhost:9000/api/v1/Products/${id}/all`)
            console.log(res.data.products)
            setProducts(res.data.products)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProducts()
        
    }, [params]);
    const dataSource = Products.map((product, index) => ({
        key: index + 1,
        title: product.title,
        price: product.price,
    }));

    const columns = [
        {
            title: <h2>Womens Clothing</h2>,
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: <h2>Best Price</h2>,
            dataIndex: 'price',
            key: 'price',
        }
    ];

    return (
        <div className='flex column' style={{ alignItems: "center" }}>
            {/* {console.log(params.id)} */}
            <HomeHeader />
            <div style={{ width: "80%" }}>
                <div className='flex' style={{ width: "100%" }}>
                    <div style={{ width: "20%" }}>
                        <Sidebar />
                    </div>
                    <div style={{ width: "80%" }}>
                        <ProductswithPrice data={Products} />
                    </div>
                </div>
                <div style={{ width: "100%" }}>
                    <h1 style={{ borderLeft: "5px solid #8A33FD", paddingLeft: "25px" }}>Clothing for Women Online in India</h1><br /><br />
                    <div style={{ paddingLeft: "25px" }}>
                        <h3>Reexplore Women's Clothing Collection Online at Euphoria</h3><br />
                        <p style={{ color: "#807D7E", lineHeight: "33.5px" }}>Women's Clothing – Are you searching for the best website to buy Clothing for Women online in India? Well, your search for the coolest and most stylish womens clothing ends here. From trendy Casual Womens Wear Online shopping to premium quality cotton women's apparel, Euphoria has closet of Women Collection covered with the latest and best designs of Women's Clothing Online.</p>
                        <p style={{ color: "#807D7E", lineHeight: "33.5px" }}>Our collection of clothes for women will make you the trendsetter with an iconic resemblance of choice in Womens Wear. </p>
                    </div><br />
                    <div style={{ paddingLeft: "25px" }}>
                        <h3>One-Stop Destination to Shop Every Clothing for Women: Euphoria</h3><br />
                        <p style={{ color: "#807D7E", lineHeight: "33.5px" }}>Today, Clothing for Women is gaining more popularity above all. This is because gone are the days when women were used to carrying uncomfortable fashion. Today, a lady looks prettier when she is in Casual Womens Wear which is a comfortable outfit. Concerning this, Euphoria has a big fat range of Stylish Women's Clothing that would make her the winner wherever she goes. </p>
                        <p style={{ color: "#807D7E", lineHeight: "33.5px" }}>
                            Our collection of clothes for women will make you the trendsetter with an iconic resemblance of choice in Womens Wear. It is quite evident to say that there are very few Womens Clothing online stores where you can buy Western Wear for Women comprising the premium material and elegant design that you are always seeking for. Basically,
                        </p>
                    </div>
                </div><br />
                
                <br />
                <div className='flex colum center' style={{ width: "100%" }}>
                    <div style={{ width: "80%" }}>
                        {/* <Table dataSource={dataSource} columns={columns} pagination={false} />; */}
                    </div>
                </div>
            </div><br />
            <Footer />
        </div>
    )
}

export default page