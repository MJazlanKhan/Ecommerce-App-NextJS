
"use client"
import React, { useState } from 'react'
import './style.css'
import { Button, Form, Input, message } from 'antd'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const page = () => {
    const [Values, setValues] = useState()

    const [messageApi, contextHolder] = message.useMessage();
    const router = useRouter()

    const handleValues = (e) => {
        setValues({ ...Values, [e.target.name]: e.target.value })
    }
    const submitValues = async () => {
        try {
            const res = await axios.post('http://localhost:9000/api/v1/AdminLogin', Values)
            console.log(res)
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('id', res.data.Id)
            localStorage.setItem('type', res.data.type)
            message.success('Login Sucessfull')
            router.push('/Admin', { scroll: false })

        } catch (error) {
            console.log(error)
            message.error(error.response.data.message)

        }
    }
    return (
        <div>
            <div className='adminbg'>
                <div className='formbox'>
                    <p className='m8'>Admin Email :</p>
                    <Input name='email' onChange={(e) => handleValues(e)} placeholder='Please Input Admin Email' /><br /><br />
                    <p className='m8'>Admin Password :</p>
                    <Input name='password' onChange={(e) => handleValues(e)} placeholder='Please Input Admin Password' /><br /><br />
                    <Button type='primary' onClick={submitValues}>Login</Button>
                </div>
            </div>
        </div>
    )
}

export default page