import React, { useEffect, useState } from 'react'
import './Style.css'
import { Table } from 'antd'
import axios from 'axios';
import Column from 'antd/es/table/Column';
const Dashboard = () => {
    const [Products, setProducts] = useState()
    const [Users, setUsers] = useState()
    const [Orders, setOrders] = useState()
    const [CompletedOrders, setCompletedOrders] = useState()
    const columns = [
        { title: 'First Name', dataIndex: 'First Name', key: 'First Name', render: <p>hi</p> },
        { title: 'Last Name', dataIndex: 'Last Name', key: 'Last Name' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        { title: 'Phone', dataIndex: 'Phone', key: 'Phone' },
        { title: 'Role', dataIndex: 'role', key: 'role' },
    ];

    const fetchProducts = async () => {
        const res = await axios.get('http://localhost:9000/api/v1/Products')
        console.log(res.data.length)
        setProducts(res.data)
    }
    const fetchUsers = async () => {
        const res = await axios.get('http://localhost:9000/api/v1/Users')
        console.log(res.data.length)
        setUsers(res.data)
    }
    const fetchOrders = async () => {
        try {
            const res = await axios.get('http://localhost:9000/api/v1/allOrders')
            setOrders(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    const fetchCompletedOrders = async () => {
        try {
            const res = await axios.get('http://localhost:9000/api/v1/allCompletedOrders')
            setCompletedOrders(res.data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProducts()
        fetchUsers()
        fetchOrders()
        fetchCompletedOrders()
    }, [])

    return (
        <div>
            <div className='flex jcenter' style={{ gap: "15px" }}>
                <div className='card flex column acenter jcenter' >
                    <p style={{ fontSize: "22px" }}>Number of Order <br /> You Got !!!</p><br />
                    <p>{Orders ? Orders.length : 0}</p>

                </div>
                <div className='card flex column acenter jcenter' >
                    <p style={{ fontSize: "22px" }}>Number of Completed <br /> Orders !!!</p><br />
                    <p>{CompletedOrders ? CompletedOrders.length : 0}</p>

                </div>
                <div className='card flex column acenter jcenter' >
                    <p style={{ fontSize: "22px" }}>Number of Users <br /> Registered !!!</p><br />
                    {/* <p>{Users.length}</p> */}
                    <p>{Users ? Users.length : 0}</p>
                </div>
                <div className='card flex column acenter jcenter' >
                    <p style={{ fontSize: "22px" }}>Number of Product <br /> Listed !!!</p><br />

                    <p>{Products ? Products.length : 0}</p>
                </div>

            </div>
            <br /><br />
            <div>
                <h2>Recent Products</h2><br />
                {Products && <>

                    {Products.slice(0, 5).map(product => (<>
                        <a href={`/Product/${product._id}`} style={{ color: "#fff", marginBottom: "8px", textDecoration: 'none' }} key={product._id}>{product.title}</a><br /></>
                    ))}
                </>}
                {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum culpa beatae ducimus possimus vero sapiente in velit, vitae iusto assumenda quasi accusamus mollitia soluta atque quidem. Pariatur sint commodi doloribus laborum. Fuga, ipsam perspiciatis.</p> */}
            </div>
            <br /><br />
            <div>
                <h2>New Users</h2><br />
                <p>
                    <Table dataSource={Users}>
                        <Column
                            title="First Name"
                            dataIndex="First Name"
                            render={(text, record) => (
                                <p style={{ width: "200px" }}>{record.firstName? record.firstName : "User First Name is Not Set Yet"}</p>
                            )}
                        />
                        <Column
                            title="Last Name"
                            dataIndex="Last Name"
                            render={(text, record) => (
                                <p style={{ width: "200px" }}>{record.lastName ? record.lastName : "User Last Name is Not Set Yet"}</p>
                            )}
                        />
                        <Column
                            title="Email"
                            dataIndex="Email"
                            render={(text, record) => (
                                <p style={{ width: "200px" }}>{record.email?record.email : "User Email is Not Set Yet"}</p>
                            )}
                        />
                        <Column
                            title="Phone"
                            dataIndex="Phone"
                            render={(text, record) => (
                                <p style={{ width: "200px" }}>{record.phone?record.phone : "User Phone is Not Set Yet"}</p>
                            )}
                        />
                        <Column
                            title="Role"
                            dataIndex="Role"
                            render={(text, record) => (
                                <p style={{ width: "200px" }}>User</p>
                            )}
                        />
                    </Table>
                </p>
            </div>
        </div>
    )
}

export default Dashboard