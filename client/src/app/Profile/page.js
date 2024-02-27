"use client"
import Footer from '@/Components/Footer'
import HomeHeader from '@/Components/HomeHeader'
import ProfileSidebar from '@/Components/ProfileSidebar'
import { ArrowRightOutlined } from '@ant-design/icons'
import React from 'react'

const page = () => {
    return (
        <div>
            <HomeHeader />
            <hr />
            <div className='flex center' style={{width:"100%"}}>
                <div className='flex column' style={{ width: "90%" }} >
                    <div className='flex' style={{ gap: "10px", marginTop: "10px" }}>
                        <p>Home</p><ArrowRightOutlined style={{ fontSize: "14px" }} /><p>My Account</p><ArrowRightOutlined style={{ fontSize: "14px" }} /><p>Personal Info</p>
                    </div><br />
                    <div style={{width:'100%'}}>
                        <ProfileSidebar />
                    </div>
                </div>
            </div><br/><br/>
            <Footer/>
        </div>
    )
}

export default page