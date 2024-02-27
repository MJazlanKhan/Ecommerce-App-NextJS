"use client"
import { SearchOutlined, StockOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import React from 'react'

const Header = () => {
    return (
        <div className='flex between' style={{width:"100%", height:"50px"}}>
            <h2>Dashboard</h2>
            <div className='flex acenter' style={{gap:'22px'}}>
                <SearchOutlined style={{fontSize:"23px"}} />
                <StockOutlined style={{fontSize:"23px"}}/>
                <Avatar size="large" icon={<UserOutlined />} />
            </div>
        </div>
    )
}

export default Header