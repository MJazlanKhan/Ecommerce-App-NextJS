"use client"

import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import MyInfo from './MyInfo';
import Wishlist from './Wishlist';

const { Sider, Content } = Layout;
const { SubMenu } = Menu;

const ProfileSidebar = () => {
    const [activeTab, setActiveTab] = useState('myOrders');

    const handleMenuClick = ({ key }) => {
      setActiveTab(key);
    };
    return (
        <div>
            <h1 style={{ borderLeft: "5px solid #8A33FD", paddingLeft: "25px" }}>Hello Jhanvi</h1><br />
            <p>Welcome to your Account</p>
            <br />
            <Layout style={{ minHeight: '100vh', width:"100%",background:"none" }}>
                <Sider theme="light">
                    <Menu
                        mode="vertical"
                        onClick={handleMenuClick}
                        selectedKeys={[activeTab]}
                    >
                        <Menu.Item key="myOrders">My Orders</Menu.Item>
                        <Menu.Item key="wishlist">Wishlist</Menu.Item>
                        <Menu.Item key="myInfo">My Info</Menu.Item>
                        <Menu.Item key="signOut">Sign Out</Menu.Item>
                    </Menu>
                </Sider>

                <Layout style={{width:"100%",background:"none"}} >
                    <Content >
                        {activeTab === 'myOrders' && <p>Content of My Orders</p>}
                        {activeTab === 'wishlist' && <Wishlist/>}
                        {activeTab === 'myInfo' && <MyInfo/>}
                        {activeTab === 'signOut' && <p>Content of Sign Out</p>}
                    </Content>
                </Layout>
            </Layout>
            
        </div>
    )
}

export default ProfileSidebar