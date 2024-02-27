"use client"
import React, { useEffect, useState } from 'react'
import Header from '../../Components/Header'
// import img from "images/signup.png"
import { Input, Form, Button, Checkbox, Switch, message } from 'antd'
import Link from 'next/link';

import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import axios from 'axios';
import { useRouter } from 'next/navigation'

const page = () => {
    const [hide, setHide] = useState(true)
    const [checked, setChecked] = useState(false)
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
 
    const validatePassword = (rule, value, callback) => {
        const upperRegex = /^(.*[A-Z].*)$/;
        const lowerRegex = /^(.*[a-z].*)$/;
        const numRegex = /^(.*[0-9].*)$/;
        const specialCharRegex = /^(.*[@$!%*?&].*)$/;
        if (!value) {
            callback("Please Enter a Password")
        }
        if (!value.match(upperRegex) && !value.match(lowerRegex) && !value.match(numRegex) && !value.match(specialCharRegex)) {
            callback("Use 8 or more characters with a mix of letters, numbers & symbols");

        }
        if (!value.match(upperRegex)) {
            callback("Need uppercase letter");
        }
        if (!value.match(lowerRegex)) {
            callback("Need Lower letter");
        }
        if (!value.match(numRegex)) {
            callback("Need Number in The Password");
        }

        if (!value.match(specialCharRegex)) {
            callback("Need Special Charachters in The Password");
        }
        if (value.length < 8) {
            return callback("Minimum 8 characters required");
        }

        if (value.length > 10) {
            return callback("Cannot exceed 10 characters");
        }


    }
    const validateTerms = () => {
        if (!checked) {
            return Promise.reject('Please agree to terms');
        }
    }
    const handleCheck = () => {
        if (!checked) {
            setChecked(true)
        } else {
            setChecked(false)
        }
    }
    const handleValues =(e)=>{
        setDetails({...Details , [e.target.name] : e.target.value})
        console.log(Details)
    }
    const handleSubmit = async()=>{
        try {
            const res = await axios.post('http://localhost:9000/api/v1/Signup', Details)
            console.log(res)
            message.success(res.data.message)
            router.push('/Signin', { scroll: false })

        } catch (error) {
            console.log(error)
            message.error(error.response.data.message)

        }
    }
    return (
        <div>
            <Header />
            <section className='flex hero' style={{ height: "89vh", width: "100%" }}>
                <div className='cover' style={{ width: "50%", height: "100%", backgroundImage: `url(images/signup.png)` }}>
                </div>
                <div style={{ width: "50%", padding: '50px' }}>
                    <h2 style={{ fontSize: "30px" }}>Sign up Page</h2>      <br /><br />
                    <Form validateTrigger="onSubmit">
                        <label>User name or email address</label>
                        <Form.Item  name="Email" value='email' rules={[{ required: true, message: 'Please input your Email' }]}>
                            <Input name='email' onChange={handleValues}  style={{ height: "40px", marginTop: "5px" }} />
                        </Form.Item>

                        <div className='flex between' >
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
                        <Form.Item
                            name="password"
                            rules={[{ validator: validatePassword }]}
                        >
                            <Input name='password'  onChange={handleValues} style={{ height: "40px", marginTop: "5px" }} type={type} />
                        </Form.Item>
                        <p>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                        <Form.Item
                            style={{ marginBottom: "0" }}
                            name="terms"
                            rules={[{ validator: validateTerms }]}
                        >
                            <Checkbox
                                onChange={handleCheck}
                            >
                                Agree to Terms
                            </Checkbox>
                        </Form.Item>

                        <Checkbox  >Subscribe to our monthly newsletter</Checkbox>;
                        <br />
                        <br />
                        <Form.Item>
                            <Button onClick={handleSubmit} htmlType='submit' className="bgpurple" style={{ width: "150px", height: "50px", fontSize: "18px" }}>
                                Sign up
                            </Button>
                        </Form.Item>
                        <p>Already have an  account? <Link style={{ borderBottom: "1px solid #3C4242", color: '#000' }} href="/Signin"> Log in  </Link> </p>
                    </Form>
                </div>
            </section>
        </div>
    )
}

export default page