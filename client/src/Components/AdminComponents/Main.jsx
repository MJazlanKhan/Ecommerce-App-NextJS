import React, { useState } from 'react';
import {
  ApartmentOutlined,
  ApiOutlined,
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  PlusSquareOutlined,
} from '@ant-design/icons';
import { Button, Menu } from 'antd';
import Form from './SmallComponents/NewPost';
import AllPosts from './SmallComponents/AllPosts';
import AllCategories from './SmallComponents/AllCategories';
import AllOrders from './SmallComponents/AllOrders';
import Dashboard from './Dashboard';

const Main = () => {
  const [isMenuCollapsed, setIsMenuCollapsed] = useState(false);
  const [Selected, SetSelected] = useState('Dashboard');

  const items = [
    {
      key: '1',
      icon: <PieChartOutlined />,
      label: 'Dashboard',
    },
    {
      key: '2',
      icon: <PlusSquareOutlined />,
      label: 'Add New Post',
    },
    {
      key: '3',
      icon: <ApartmentOutlined />,
      label: 'All Posts',
    },
    {
      key: '4',
      icon: <ApiOutlined />,
      label: 'Categories',
    },
    {
      key: '5',
      icon: <DesktopOutlined />,
      label: 'Orders',
    },
  ];
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);// Notify Main component about menu state
  };
  const handleMenuToggle = (collapsed) => {
    setIsMenuCollapsed(collapsed);
    // You can perform additional actions when the menu is toggled
  };

  return (
    <div className='flex '>
      <div style={{maxWidth:'20%'}}>
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          style={{ minHeight: '100vh', backgroundColor: "#1D1D2D" }}
        >
          {items.map(item => (
            <Menu.Item onClick={() => SetSelected(item.label)} key={item.key} icon={item.icon}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      </div>
      <div style={{width:'90%', border:"1px solid #fff", padding:'25px'}}>
        {Selected === 'Dashboard' && <>
            <Dashboard/>
        </>}
        {Selected === 'Add New Post' && <>
            <><Form/></>
        </>}
        {Selected === 'All Posts' && <>
            <><AllPosts/></>
        </>}
        {Selected === 'Categories' && <>
            <AllCategories/>
        </>}
        {Selected === 'Orders' && <>
            <AllOrders/>
        </>}
      </div>
    </div>
  );
};

export default Main;
