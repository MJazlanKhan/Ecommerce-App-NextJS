"use client"
import React from 'react'
// import Logo from "images/Logo.png"
import { SearchOutlined } from '@ant-design/icons';

import { Input, Icon, Button, Select } from 'antd';
import "./Style.css"
import Link from 'next/link';
const { Search } = Input;
const Header = () => {
    return (
        <div className='flex center' style={{ width: "100%", padding: "15px 0" }}>
            <header style={{ width: "80%" }} className='Header flex between'>
                <div style={{ width: "40%", alignItems: "center" }} className='flex between'>
                    <img src="images/Logo.png" />
                    <div style={{ gap: "10px", border: "1px solid #d9d9d9", height: "32px", padding: '0 5px', borderRadius: "5px" }} className='search flex center'>
                        <SearchOutlined />
                        <Input placeholder='Search .. ' style={{ width: "200px", border: "none", background: "none" }} />
                    </div>
                </div>
                <div style={{ width: "60%", gap: "40px" }} className="flex center">
                    <Select
                        labelInValue
                        defaultValue={{ value: 'English', label: 'English (United States)' }}
                        style={{ width: 200, border: "none" }}
                        options={[
                            {
                                value: 'EnglishUK',
                                label: 'English (United Kingdom)',
                            },
                            {
                                value: 'French',
                                label: 'French (France)',
                            },
                        ]}
                    />
                    {}
                  <Link href="/Signin">  <Button className='bgpurple' style={{ width: "120px" }}>  Login </Button></Link>
                  <Link href="/Signup">  <Button className='borderpurple' style={{ width: "120px" }}> Signup </Button></Link>
                </div>
            </header>
        </div>
    )
}

export default Header