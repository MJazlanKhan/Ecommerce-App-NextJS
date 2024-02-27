import React, { useState } from 'react'
// import Header from '../../Components/Header'
// import img from "../../images/reset.png"
import { Input, Form, Button } from 'antd'
import Link from 'next/link'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
const CheckEmail = ({ onBack }) => {


    return (
        <div>

            {/* <Header /> */}
            <section className='flex hero' style={{ height: "89vh", width: "100%" }}>
                <div className='cover' style={{ width: "50%", height: "100%", backgroundImage: `url(images/reset.png)` }}>
                </div>
                <div style={{ width: "50%", padding: '50px' }}>
                    <h2 style={{ fontSize: "30px", marginBottom: "5px" }}>Check Email</h2>
                    <p style={{ color: "#676B80" }}>Please check your email inbox and click on the provided link to reset your
                        password . If you don’t receive email, Click here to resend</p>
                    <br />
                    <p style={{cursor:"pointer"}} onClick={onBack}>Back to Login</p>
                </div>
            </section>
        </div>
    )
}

export default CheckEmail