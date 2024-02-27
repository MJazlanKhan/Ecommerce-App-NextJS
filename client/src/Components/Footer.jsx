"use client"
import React from 'react'
import "./Style.css"
import { ArrowDownOutlined, FacebookFilled, FacebookOutlined, InstagramFilled, LinkedinFilled, TwitterSquareFilled } from '@ant-design/icons'
import { Dropdown } from 'antd'

const Footer = () => {
  return (
    <div className='footer flex center column' style={{ width: '100%', backgroundColor: "#3C4242", padding: "50px 0", }}>
      {/* Menus */}
      <div className='flex center' style={{ width: '80%', placeItems: "flex-start" }}>
        <div style={{ width: "20%" }}>
          <ul>
            <h2>Need Help</h2><br /><br />
            <li>Contact Us</li>
            <li>Track Order</li>
            <li>Returns & Refunds</li>
            <li>FAQ's</li>
            <li>Career</li>
            <br />
            <br />
            <br />
            <br />
            <div className='flex' style={{ gap: "10px" }}>
              <FacebookFilled style={{ fontSize: "30px" }} />
              <InstagramFilled style={{ fontSize: "30px" }} />
              <TwitterSquareFilled style={{ fontSize: "30px" }} />
              <LinkedinFilled style={{ fontSize: "30px" }} />
            </div>
          </ul>
        </div>
        <div style={{ width: "20%" }}>
          <ul>
            <h2>Company</h2><br /><br />
            <li>About Us</li>
            <li>euphoria Blog</li>
            <li>euphoriastan</li>
            <li>Collaboration</li>
            <li>Media</li>
          </ul>
        </div>
        <div style={{ width: "20%" }}>
          <ul>
            <h2>More Info</h2><br /><br />
            <li>Term and Conditions</li>
            <li>Privacy Policy</li>
            <li>Shipping Policy</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div style={{ width: "40%" }}>
          <ul>
            <h2>Location</h2><br /><br />
            <li>support@euphoria.in</li>
            <li>Eklingpura Chouraha, Ahmedabad Main Road</li>
            <li>(NH 8- Near Mahadev Hotel) Udaipur, India- 313002</li>
            <li>FAQ's</li>
            <li>Career</li><br /><br /><br /><br />
            <h2>Download The App </h2><br />
            <div className='flex' style={{ gap: "25px" }}>
              <img src='images/Downloads/Group.png' />
              <img src='images/Downloads/Group2.png' />
            </div>
          </ul>
        </div>
        <br />
        <br />
        <br />
        <hr />
      </div>
      <br/>
      <br/>
      <div className='flex' style={{ width: "80%", borderTop:"2px solid #BEBCBD", borderBottom:"2px solid #BEBCBD" , padding:'25px 0'}}>
        <Dropdown trigger={['click']} >
          <h2 className='flex between' style={{ width: "100%" }}>Popular Categories
            <ArrowDownOutlined />

          </h2>
        </Dropdown>
      </div>
        <p style={{textAlign:"center", paddingTop:"25px"}}>Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.</p>
    </div>
  )
}

export default Footer