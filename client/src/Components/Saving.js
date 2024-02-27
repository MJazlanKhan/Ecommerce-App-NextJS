import { ArrowDownOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

const Saving = () => {
    return (
        <>
            <h1 style={{ borderLeft: "5px solid #8A33FD", marginLeft: "150px", paddingLeft: "25px" }}>Big Saving Zone</h1><br /><br />
            <div className='flex center column product' style={{ gap: "25px" }}>
                <div className='flex center' style={{ gap: "25px" }}>
                    <div style={{ backgroundImage: "url(/images/bigcard.png)", width: "350px", height: "350px", backgroundSize: "cover", borderRadius: "15px" }}>
                        <div className=' flex column center' style={{ width: "150px", height: "100%", color: "#fff", paddingLeft: "15px" }}>
                            <h2 style={{ marginBottom: "10px" }}> Hawaiian Shirts</h2>
                            <p style={{ marginBottom: "10px" }}>Dress up in summer vibe</p>
                            <h3>UPTO 50% OFF</h3><br />
                            <ArrowDownOutlined style={{ fontSize: "30px" }} /><br />
                            <Button style={{ width: "150px" }} ghost>Button</Button>
                        </div>
                    </div>
                    <div style={{ backgroundImage: "url(/images/bigcard.png)", width: "350px", height: "350px", backgroundSize: "cover", borderRadius: "15px" }}>
                        <div className=' flex column center' style={{ width: "150px", height: "100%", color: "#fff", paddingLeft: "15px" }}>
                            <h2 style={{ marginBottom: "10px" }}> Hawaiian Shirts</h2>
                            <p style={{ marginBottom: "10px" }}>Dress up in summer vibe</p>
                            <h3>UPTO 50% OFF</h3><br />
                            <ArrowDownOutlined style={{ fontSize: "30px" }} /><br />
                            <Button style={{ width: "150px" }} ghost>Button</Button>
                        </div>
                    </div>
                    <div style={{ backgroundImage: "url(/images/bigcard.png)", width: "350px", height: "350px", backgroundSize: "cover", borderRadius: "15px" }}>
                        <div className=' flex column center' style={{ width: "150px", height: "100%", color: "#fff", paddingLeft: "15px" }}>
                            <h2 style={{ marginBottom: "10px" }}> Hawaiian Shirts</h2>
                            <p style={{ marginBottom: "10px" }}>Dress up in summer vibe</p>
                            <h3>UPTO 50% OFF</h3><br />
                            <ArrowDownOutlined style={{ fontSize: "30px" }} /><br />
                            <Button style={{ width: "150px" }} ghost>Button</Button>
                        </div>
                    </div>
                </div>
                <div className='flex center' style={{ gap: "25px" }}>
                    <div className='flex center' style={{ backgroundImage: "url(/images/bigcard2.png)", width: "500px", height: "350px", backgroundSize: "cover", borderRadius: "15px" }}>
                        <div style={{ width: "50%" }}></div>
                        <div className=' flex column center' style={{ width: "50%" }}>
                            <h2 style={{ marginBottom: "10px", fontSize: "30px" }}>Urban  Shirts</h2>
                            <p style={{ marginBottom: "10px" }}>Live In Confort</p>
                            <h3>FLAT 60% OFF</h3><br />
                            <ArrowDownOutlined style={{ fontSize: "30px" }} /><br />
                            <Button style={{ width: "100px", border: "2px solid #000", color: "#000" }} ghost>Button</Button>
                        </div>

                    </div>
                    <div className='flex center' style={{ backgroundImage: "url(/images/bigcard2.png)", width: "500px", height: "350px", backgroundSize: "cover", borderRadius: "15px" }}>
                        <div style={{ width: "50%" }}></div>
                        <div className=' flex column center' style={{ width: "50%" }}>
                            <h2 style={{ marginBottom: "10px", fontSize: "30px" }}>Urban  Shirts</h2>
                            <p style={{ marginBottom: "10px" }}>Live In Confort</p>
                            <h3>FLAT 60% OFF</h3><br />
                            <ArrowDownOutlined style={{ fontSize: "30px" }} /><br />
                            <Button style={{ width: "100px", border: "2px solid #000", color: "#000" }} ghost>Button</Button>
                        </div>

                    </div>
                </div>
            </div>
            <br />
            <br /><br />
            <br /><br />
            <br />
            <div className='flex center' style={{width:"100%"}}>
                <div className='flex center' style={{width:"80%"}}>
                    <div className="flex column" style={{ backgroundImage: "url(/images/leafs.png)", width: "50%", height: "550px", backgroundSize: "cover", borderRadius:"15px 0 0 15px", color:"#fff", justifyContent:"center", paddingLeft:"50px" }} >
                        <h2 style={{fontSize:"35px"}}>WE MADE YOUR EVERYDAY <br/> FASHION BETTER!</h2> <br/> 
                        <p style={{fontSize:"18px"}}>In our journey to improve everyday fashion,  <br/> euphoria presents EVERYDAY wear range -  <br/> Comfortable & Affordable fashion 24/7</p><br/><br/>
                        <Button style={{width:"100px"}}>Shop Now</Button>
                    </div>
                    <div style={{backgroundImage: "url(/images/Rectangle13.png)", width: "50%", height: "550px", backgroundSize: "cover", borderRadius:" 0 15px 15px 0 "}}></div>
                </div>
            </div><br/><br/>
        </>
    )
}

export default Saving