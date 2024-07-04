"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Input, Icon, Button, Select, Dropdown, Menu, message } from 'antd';
import "./Style.css"
import { HeartOutlined, LogoutOutlined, SearchOutlined, ShoppingCartOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import { useRouter } from 'next/navigation'

// import { Link } from 'react-router-dom';
const { Search } = Input;
const HomeHeader = () => {
  
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter()
  const [menu, setMenu] = useState([])
  const [searchWord, setSearchWord] = useState()
  const token = localStorage.getItem('token')

  const handleLogout =()=>{
    localStorage.removeItem('token')
    router.push('/')
    message.success("Good Bye..!!")
  }
  const items = [
    {
      key: '1',
      label: (
        <Link rel="noopener noreferrer" href="/Signin">
          Signin
        </Link>
      ),
      icon: <UserAddOutlined />

    },
    {
      key: '2',
      label: (
        <a rel="noopener noreferrer" href="/Signup">
          Signup
        </a>
      ),
      icon: <UserAddOutlined />
    }
  ];
  const signed = [
    {
      key: '11',
      label: (
        <Link rel="noopener noreferrer" href="/Signin">
          My List
        </Link>
      ),
      icon: <UserAddOutlined />

    },
    {
      key: '22',
      label: (
        <a rel="noopener noreferrer" href="/Profile">
          Profile
        </a>
      ),
      icon: <UserAddOutlined />
    },
    {
      key: '23',
      label: (
        <p onClick={()=>handleLogout()}>
          Logout
        </p>
      ),
      icon: <LogoutOutlined />
    }
  ];
  const fetchCategories = async () => {
    try {
      const res = await axios.get('https://ecommerce-app-nextjs.onrender.com/api/v1/Categories')
      setMenu(res.data)
    } catch (error) {
      console.log(error)

    }
  }
  // const handleInputChange = (e) => {
  //   setSearchWord(e.target.value);
  // };
  // const SearchProduct = async () => {
  //   try {
  //     const response = await axios.get(`https://ecommerce-app-nextjs.onrender.com/api/v1/SearchProduct?word=${searchWord}`);
  //     setSearchWord(response.data || []);
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  useEffect(() => {
    fetchCategories()
  }, [])
  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     if (searchWord !== '') {
  //       SearchProduct();
  //     } else {
  //       setSearchWord([]);
  //     }
  //   }, 300); // Adjust the delay according to your needs

  //   return () => clearTimeout(delayDebounceFn);
  // }, [searchWord]);
  return (
    <div className='flex center' style={{ width: "100%", padding: "15px 0" }}>
      <header style={{ width: "80%" }} className='Header HomeHeader flex between'>
        <div style={{ width: "50%", alignItems: "center" }} className='flex between'>
          <Link style={{ textDecoration: "none" }} href='/'><img src="/images/Logo.png" alt='logo' /></Link>
          <div>
            <ul style={{ color: "#807D7E" }}>
              {/* <li>Shop</li> */}
              {menu.map((item => {
                return (
                  <Link style={{ color: "#807D7E" }} href={`/category/${[item._id]}`} as={`/category/${[item._id]}`}> <li>{item.name}</li></Link>

                )
              }))}
            </ul>
          </div>
        </div>
        <div style={{ gap: "50px" }} className='flex center'>

          <div style={{ gap: "10px", height: "32px", padding: '0 10px', borderRadius: "5px", backgroundColor: "#F6F6F6" }} className='search flex center'>
            <SearchOutlined style={{ color: "#807D7E" }} />
            <Input placeholder='Search .. ' value={searchWord} onChange={(e)=>handleInputChange(e)} style={{ width: "200px", border: "none", background: "none", color: "#807D7E" }} />
          </div>
          <div style={{ gap: "10px" }} className='flex center'>
            <HeartOutlined className='icon' />
            {!token && (
              <Dropdown
                overlay={
                  <Menu>
                    {items.map(item => (
                      <Menu.Item key={item.key}>
                        {item.label}
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <UserOutlined className='icon' />
                </a>
              </Dropdown>
            )}
            {token && (
              <Dropdown
                overlay={
                  <Menu>
                    {signed.map(item => (
                      <Menu.Item key={item.key}>
                        {item.label}
                      </Menu.Item>
                    ))}
                  </Menu>
                }
              >
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                  <UserOutlined className='icon' />
                </a>
              </Dropdown>
            )}
            <Link href='/Cart'>
              <ShoppingCartOutlined className='icon' /></Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default HomeHeader
