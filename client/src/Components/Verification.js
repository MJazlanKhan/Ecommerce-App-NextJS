import React, { useState } from 'react'
// import Header from '../../Components/Header'
// import img from "../../images/reset.png"
import { Input, Form, Button } from 'antd'
import Link from 'next/link'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import "./Style.css"
const Verification = ({ onBack }) => {

    return (
        <div>

            {/* <Header /> */}
            <section className='flex hero' style={{ height: "89vh", width: "100%" }}>
                <div className='cover' style={{ width: "50%", height: "100%", backgroundImage: `url(images/reset.png)` }}>
                </div>
                <div style={{ width: "50%", padding: '50px' }}>
                    <h2 style={{ fontSize: "30px", marginBottom: "5px" }}>Verification</h2>
                    <p style={{ color: "#676B80" }}>Verify your code.</p>
                    <br />
                    <h4>Verification Code</h4><br/>
                    <Form.Item >
                        <Input/>
                    </Form.Item>
                    <Button style={{backgroundColor:"#8A33FD", color:"#fff"}}>Verify Code</Button>
                </div>
            </section>
        </div>
    )
}

export default Verification