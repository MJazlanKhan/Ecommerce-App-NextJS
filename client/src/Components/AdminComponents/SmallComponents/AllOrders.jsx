import { Table, Pagination, Space, Popconfirm, Button, Modal, message, Spin } from 'antd';
import Column from 'antd/es/table/Column';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllOrders = () => {
    const [ordersData, setOrdersData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [ProductPrice, setProductPrice] = useState(null);
    const [loading, setloading] = useState(false);
    const [pageSize] = useState(5);

    const [messageApi, contextHolder] = message.useMessage();

    const fetchOrdersData = async () => {
        setloading(true)
        try {
            const res = await axios.get(`http://localhost:9000/api/v1/allOrders`);
            console.log(res);
            // Ensure res.data is an array of orders
            if (Array.isArray(res.data)) {
                const formattedOrders = res.data.map(order => ({
                    ...order,
                    key: order._id, // Add a unique key to each order
                }));
                setOrdersData(formattedOrders);
                setloading(false)

            } else {
                console.error('Response data is not an array:', res.data);
                setloading(false)

            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchOrdersData();
    }, []);

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const sortedData = [...ordersData].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });

    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const displayedData = sortedData.slice(start, end);
    const showOrder = (record) => {
        setSelectedOrder(record)
        calculateTotalPrice()
    }

    const handleStatus = async (record) => {
        const res = await axios.put(`http://localhost:9000/api/v1/UpdateOrder/${record._id}`)
        message.success("Congrats on Completing Order")
        fetchOrdersData()
    }

    const columns = [
        {
            title: 'User Name',
            dataIndex: ['cartDetails'], // Access nested property
            key: 'userName',
            render: (_, record) => (
                <ul style={{ width: "100px" }}>
                    {record.cartDetails && Array.isArray(record.cartDetails) && record.cartDetails.map(item => (
                        <li className='typenone m8' key={item._id}>{item.userDetail.firstName + " " + item.userDetail.lastName}</li>
                        // console.log(item.userDetail.firstName)
                    ))}
                </ul>
            ),

        },
        {
            title: 'User Email',
            dataIndex: ['userDetails', 'email'], // Access nested property
            key: 'userEmail',
            render: (_, record) => (
                <ul>
                    {record.cartDetails && Array.isArray(record.cartDetails) && record.cartDetails.map(item => (
                        <li className='typenone m8 acenter' key={item._id}>{item.userDetail.email}</li>
                        // console.log(item.userDetail.firstName)
                    ))}
                </ul>
            ),
        },
        {
            title: 'Product Title',
            dataIndex: 'cartDetails',
            key: 'title',
            render: (_, record) => (
                <ul>
                    {record.cartDetails && Array.isArray(record.cartDetails) && record.cartDetails.map(item => (
                        <li className='typenone m8 acenter' key={item._id}>{item.title}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Quantity',
            dataIndex: 'cartDetails',
            key: 'quantity',
            render: (_, record) => (
                <ul>
                    {record.cartDetails && Array.isArray(record.cartDetails) && record.cartDetails.map(item => (

                        <li className='typenone m8' key={item._id}>{item.quantity ? item.quantity : 1}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Color',
            dataIndex: 'cartDetails',
            key: 'selectedColor',
            render: (_, record) => (
                <ul>
                    {record.cartDetails && Array.isArray(record.cartDetails) && record.cartDetails.map(item => (
                        <li className='flex typenone m8' key={item._id}>
                            <div style={{ backgroundColor: item.selectedColor ? item.selectedColor : "#fff", width: 20, height: 20, border: '1px solid #000' }}></div>
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Featured Image',
            dataIndex: 'cartDetails',
            key: 'featuredImage',
            render: (_, record) => (
                <ul className='flex' style={{ width: '120px', flexWrap: 'wrap', gap: "10px" }}>
                    {record.cartDetails && Array.isArray(record.cartDetails) && record.cartDetails.map(item => (
                        <li className='typenone' key={item._id}>
                            <img src={item.featuredImage} alt="Featured" style={{ width: 50, height: 50 }} />
                        </li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'cartDetails',
            key: 'Status',
            render: (_, record) => (
                <p>{record.Status}</p>
            ),
        },
        {
            title: 'Order Details',
            dataIndex: 'OrderDetails',
            key: 'OrderDetails',
            render: (_, record) => (
                <div className='flex' style={{ gap: '15px' }}>
                    <Button type='primary' onClick={() => showOrder(record)}>See Order Details</Button>
                    <Popconfirm title="Are You Sure Order is Completed???" onConfirm={() => handleStatus(record)}>
                        <Button>Change Status</Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];
    const calculateTotalPrice = () => {

        let totalPrice = 0;

        if (selectedOrder) {

            // Access cart details array 
            selectedOrder.cartDetails.forEach(item => {
                console.log(item)
                totalPrice += parseFloat(item.price) * item.quantity;
            });

        }

        setProductPrice(totalPrice);

    };

    return (
        <div>
            {console.log(selectedOrder)}
            {loading &&
                <>
                    <div className='flex jcenter'>
                        <Spin size='large' />
                    </div><br />
                </>
            }
            <Table
                dataSource={displayedData}
                columns={columns}
                pagination={false}
            />
            {selectedOrder && (
                <Modal
                    visible={!!selectedOrder}
                    onCancel={() => setSelectedOrder(null)}
                // other modal props
                >
                    <p className='m8'>
                        <b>Order Id:</b> {selectedOrder._id}
                    </p>

                    <p className='m8'>
                        {/* <b>User:</b> {selectedOrder.cartDetails.userDetail.firstName} {selectedOrder.cartDetails.userDetail.lastName} */}
                        {selectedOrder.cartDetails.map((item) => {
                            return (
                                <>
                                    {/* <b>User:</b> <span>{ item.userDetail.firstName } { item.userDetail.firstName }</span> */}
                                    {console.log(item)}
                                </>
                            )

                        })}
                    </p>

                    <p className='m8'>
                        {/* <b>Email:</b> {selectedOrder.cartDetails.userDetail.email} */}
                    </p>

                    <p className='m8'>
                        {/* <b>Total Price:</b> {selectedOrder.totalPrice} */}
                    </p>
                    <br />
                    <h3 className='m8'>Products</h3>
                    {/* {selectedOrder.cartDetails.map(item => (
                        <div key={item._id}>
                            <p className='m8'>
                                <b>Product:</b> {item.title}
                            </p>
                            <p className='m8'>
                                <b>Quantity:</b> {item.quantity ? item.quantity : 1}
                            </p>
                            <p className='flex m8' style={{gap:'15px'}}>
                                <b>Color:</b> <div style={{ backgroundColor: item.selectedColor, width: 20, height: 20 }}></div>
                            </p>
                        </div>
                    ))} */}
                    {selectedOrder.cartDetails.map((item) => {
                        return (
                            <>
                                <div key={item._id}>
                                    <p className='m8'>
                                        <b>Product:</b> {item.title}
                                    </p>
                                    <p className='m8'>
                                        <b>Quantity:</b> {item.quantity ? item.quantity : 1}
                                    </p>
                                    <p className='flex m8' style={{ gap: '15px' }}>
                                        <b>Color:</b> <div style={{ backgroundColor: item.selectedColor ? item.selectedColor : "#fff", width: 20, height: 20, border: '1px solid #000' }}></div>
                                    </p>
                                </div>
                            </>
                        )

                    })}
                    <br />
                    <p>
                        <h3>Payment Details</h3>

                        <b className='m8'>Card Number:</b> {selectedOrder.paymentDetails.cardNumber}<br />
                        <b className='m8'>Owner Name:</b> {selectedOrder.paymentDetails.OwnerName}<br />
                        <b className='m8'>Card EXP:</b> {selectedOrder.paymentDetails.ExpDate}<br />
                        <b className='m8'>CVV:</b> {selectedOrder.paymentDetails.CVV}<br />
                    </p>
                </Modal>
            )}

            <Pagination
                onChange={onPageChange}
                defaultCurrent={1}
                total={sortedData.length}
                pageSize={pageSize}
            />
        </div>
    );
};

export default AllOrders;
