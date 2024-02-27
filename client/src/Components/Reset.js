import React, { useState } from 'react'
// import Header from '../../Components/Header'
// import img from "../../images/reset.png"
import { Input, Form, Button } from 'antd'
import Link from 'next/link'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
const Reset = ({ onBack }) => {
    const [hide, setHide] = useState(true)
    const [type, setType] = useState('password')
    const togglePassword = () => {
        if (hide) {
            setHide(false)
            setType("text")
        } else {
            setHide(true)
            setType("password")

        }
    }

    return (
        <div>

            {/* <Header /> */}
            <section className='flex hero' style={{ height: "89vh", width: "100%" }}>
                <div className='cover' style={{ width: "50%", height: "100%", backgroundImage: `url(images/reset.png)` }}>
                </div>
                <div style={{ width: "50%", padding: '50px' }}>
                    <h2 style={{ fontSize: "30px", marginBottom: "5px" }}>Reset Your Password</h2>
                    <p style={{ color: "#676B80" }}>Enter your email and we'll send you a link to reset your password.</p>
                    <p style={{ color: "#676B80", marginTop: "5px" }}>Please  check it.</p>

                    <br />
                    <Form validateTrigger="onSubmit">
                        <label>Email</label>
                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email' }]}>
                            <Input style={{ height: "40px", marginTop: "5px" }} />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" className="bgpurple" style={{ width: "150px", height: "50px", fontSize: "18px" }}>
                                Send
                            </Button>
                        </Form.Item>
                        <p onClick={onBack}>Back To <Link style={{ borderBottom: "1px solid #3C4242", color: '#000' }} href="/Signin"> Login  </Link> </p>
                    </Form>
                </div>
            </section>
        </div>
    )
}

export default Reset