import React, { useEffect, useState } from 'react'
import AddressCard from './AddressCard'
import { Button, Checkbox, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import axios from 'axios'

const MyInfo = () => {
    const [action, setAction] = useState("Details")
    const [User, setUser] = useState([])
    const userid = localStorage.getItem('id')

    const fetchUser =async()=>{
        const res = await axios.get(`http://localhost:9000/api/v1/user/${userid}`)
        setUser(res.data)
    }
    useEffect(() => {
        fetchUser()
    }, [])
    
    return (
        <div style={{ paddingLeft: "50px" }}>
            <h1>MyInfo</h1><br />
            {action === 'Details' &&
                <>
                {User &&
                <>
                    <h2>Contact Details</h2>
                    <div style={{ marginTop: "20px" }}>
                        <div style={{ paddingBottom: "10px" }}>
                            <p>Your Name</p>
                            <div className='flex between' style={{ marginTop: "5px" }}>
                                <p className='bold'>{User.firstName + " " + User.lastName}</p>
                                <p className='bold'>Change</p>
                            </div>
                        </div>
                        <hr /><br />
                        <div style={{ paddingBottom: "10px" }}>
                            <p>Email Address</p>
                            <div className='flex between' style={{ marginTop: "5px" }}>
                                <p className='bold'> {User.email}</p>
                                <p className='bold'>Change</p>
                            </div>
                        </div><hr /><br />

                        <div style={{ paddingBottom: "10px" }}>
                            <p>Phone Number</p>
                            <div className='flex between' style={{ marginTop: "5px" }}>
                                <p className='bold'> {User.phone}</p>
                                <p className='bold'>Change</p>
                            </div>
                        </div><hr /><br />

                        <div style={{ paddingBottom: "10px" }}>
                            <p>Password</p>
                            <div className='flex between' style={{ marginTop: "5px" }}>
                                <p className='bold'> *********</p>
                                <p className='bold'>Change</p>
                            </div>
                        </div><hr /><br />
                        <div className='flex between'>
                            <h2>Address</h2>
                            <p className='bold' onClick={() => setAction("newAddress")}>Add New</p>
                        </div><br />
                        <div className='flex column' style={{ alignItems: "center" }}>
                            <div className='flex' style={{ gap: "20px", flexWrap: "wrap", justifyContent: "center" }}>
                                <AddressCard data={User}/>

                            </div>
                        </div>
                    </div></>}
                </>}
            {action === 'newAddress' && <>

                <h2>Add Address</h2><br />
                <div className='flex' style={{ gap: "20px" }}>
                    <div>
                        <p className='bold'>First Name*</p><br />
                        <Form.Item>
                            <Input placeholder='First Name' style={{ width: "400px", backgroundColor: "#F6F6F6" }} />
                        </Form.Item>
                    </div>
                    <div>
                        <p className='bold'>Last Name*</p><br />
                        <Form.Item>
                            <Input placeholder='Last Name' style={{ width: "400px", backgroundColor: "#F6F6F6" }} />
                        </Form.Item>
                    </div>
                </div><br />
                <div className='flex' style={{ gap: "20px" }}>
                    <div>
                        <p className='bold'>Country / Region*</p><br />
                        <Form.Item>
                            <Input placeholder='First Name' style={{ width: "400px", backgroundColor: "#F6F6F6" }} />
                        </Form.Item>
                    </div>
                    <div>
                        <p className='bold'>Company Name</p><br />
                        <Form.Item>
                            <Input placeholder='Last Name' style={{ width: "400px", backgroundColor: "#F6F6F6" }} />
                        </Form.Item>
                    </div>
                </div><br />
                <div className='flex' style={{ gap: "20px" }}>
                    <div>
                        <p className='bold'>Street Address*</p><br />
                        <Form.Item>
                            <Input placeholder='First Name' style={{ width: "400px", backgroundColor: "#F6F6F6" }} />
                        </Form.Item>
                    </div>
                    <div>
                        <p className='bold'>Apt, suite, unit</p><br />
                        <Form.Item>
                            <Input placeholder='Last Name' style={{ width: "400px", backgroundColor: "#F6F6F6" }} />
                        </Form.Item>
                    </div>
                </div><br />
                <div className='flex' style={{ gap: "20px" }}>
                    <div>
                        <p className='bold'>City*</p><br />
                        <Form.Item>
                            <Input placeholder='First Name' style={{ width: "400px", backgroundColor: "#F6F6F6" }} />
                        </Form.Item>
                    </div>
                    <div>
                        <p className='bold'>State*</p><br />
                        <Form.Item>
                            <Input placeholder='Last Name' style={{ width: "400px", backgroundColor: "#F6F6F6" }} />
                        </Form.Item>
                    </div>
                </div><br />
                <div className='flex' style={{ gap: "20px" }}>
                    <div>
                        <p className='bold'>Phone*</p><br />
                        <Form.Item>
                            <Input placeholder='First Name' style={{ width: "400px", backgroundColor: "#F6F6F6" }} />
                        </Form.Item>
                    </div>
                    <div>
                        <p className='bold'>Postal Code*</p><br />
                        <Form.Item>
                            <Input placeholder='Last Name' style={{ width: "400px", backgroundColor: "#F6F6F6" }} />
                        </Form.Item>
                    </div>
                </div><br />
                <div>
                    <p>Delivery Instruction</p><br/>
                    <Form.Item>
                        <TextArea style={{minHeight:"150px"}} placeholder='Delivery Instruction'/>
                    </Form.Item>
                </div><br/>
                <div>
                    <Checkbox>Set as default shipping address</Checkbox><br/>
                    <Checkbox>Set as default billing address</Checkbox>
                </div><br/>
                <div className='flex' style={{gap:"25px"}}>
                    <Button style={{backgroundColor:"#8A33FD", color:'#fff'}}>Save</Button>
                    <Button style={{backgroundColor:"#F6F6F6", color:'#807D7E'}} >Cancel</Button>
                </div>
            </>}
        </div>
    )
}

export default MyInfo