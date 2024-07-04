"use client"

import React, { useState, useEffect } from 'react'
// import img from "../../images/signin.png"
import { Input, Form, Button, Alert, message } from 'antd'
import { redirect } from 'next/navigation'
// import {Link} from "react-router-dom"
import Link from 'next/link'
import Header from '@/Components/Header'
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import Reset from '@/Components/Reset'
import CheckEmail from '@/Components/CheckEmail'
import Verification from '@/Components/Verification'
import { useRouter } from 'next/navigation'

import axios from 'axios'
const page = () => {
    // const {} = useChatState();
    const [hide, setHide] = useState(true)
    const [status, setStatus] = useState("login")
    const [type, setType] = useState('password')
    const [Details, setDetails] = useState({})
    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter()
    const token = localStorage.getItem('token')
    useEffect(() => {
        if (token) {
            router.push('/', { scroll: false })

        }
    }, [])

    const togglePassword = () => {
        if (hide) {
            setHide(false)
            setType("text")
        } else {
            setHide(true)
            setType("password")

        }
    }
    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
    };
    const handleValues = (e) => {
        setDetails({ ...Details, [e.target.name]: e.target.value })
        console.log(Details)
    }
    const handleSubmit = async () => {

        try {
            const res = await axios.post('https://ecommerce-app-nextjs.onrender.com/api/v1/Signin', Details)
            if (res.status === 200) {
                message.success(res.data.message)
                console.log(res)
                localStorage.setItem("id", res.data.Id)
                localStorage.setItem("token", res.data.token)
                router.push('/', { scroll: false })

            }
        } catch (error) {
            if (error) {
                console.log(error)
                message.error(error.response.data.message)
            }
        }
    }
    return (
        <div>
            <Header />
            {status === "login" && <>
                {/* <Alert type="sucess" className='sucess' message={`hi`} /> */}
                <section className='flex hero' style={{ height: "89vh", width: "100%" }}>
                    <div className='cover' style={{ width: "50%", height: "100%", backgroundImage: `url(images/signin.png)` }}>
                    </div>
                    <div style={{ width: "50%", padding: '50px' }}>
                        <h2 style={{ fontSize: "30px" }}>Sign in Page</h2>      <br /><br />
                        <Form validateTrigger="onSubmit">
                            <label>User name or email address</label>
                            <Form.Item name="email" rules={[{ required: true, message: 'Please input your Email' }]}>
                                <Input name='email' onChange={handleValues} style={{ height: "40px", marginTop: "5px" }} />
                            </Form.Item>

                            <div className='flex between'>
                                <label>Password</label>
                                {hide &&
                                    <>
                                        <EyeInvisibleOutlined onClick={togglePassword} style={{ fontSize: "18px", color: "#807D7E" }} />
                                    </>}
                                {!hide &&
                                    <>
                                        <EyeOutlined onClick={togglePassword} style={{ fontSize: "18px", color: "#807D7E" }} />
                                    </>}
                            </div>
                            <Form.Item name="password" rules={[{ required: true, message: 'Please input your Password' }]}>
                                <Input name='password' onChange={handleValues} type={type} style={{ height: "40px", margin: "5px 0" }} />
                            </Form.Item>
                            <p style={{ textAlign: "right", color: "#3C4242", cursor: "pointer" }} onClick={() => setStatus("reset")}> Forget Your Password </p>
                            <Form.Item>
                                <Button onClick={handleSubmit} htmlType="submit" className="bgpurple" style={{ width: "150px", height: "50px", fontSize: "18px" }}>
                                    Sign In
                                </Button>
                            </Form.Item>
                            <p>Don’t have an account? <Link style={{ borderBottom: "1px solid #3C4242", color: '#000' }} href="/Signup"> Sign up  </Link> </p>
                        </Form>
                    </div>
                </section>
            </>}
            {status === "reset" && <>
                <Reset onBack={() => handleStatusChange("checkemail")} />
            </>}
            {status === "checkemail" && <>
                <CheckEmail onBack={() => handleStatusChange("verify")} />
            </>}
            {status === "verify" && <>
                <Verification onBack={() => handleStatusChange("login")} />
            </>}
        </div>
    )
}

export default page
