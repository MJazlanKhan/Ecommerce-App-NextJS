import { Button, Input, Popconfirm, Space, Table, message } from 'antd';
import Column from 'antd/es/table/Column';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AllCategories = () => {
    const [Categories, setCategories] = useState([]);
    const [editmode, setEditmode] = useState(false);
    const [editCategoryName, setEditCategoryName] = useState();
    const [messageApi, contextHolder] = message.useMessage();

    const fetchCategories = async () => {
        try {
            const res = await axios.get('http://localhost:9000/api/v1/Categories');
            console.log(res.data);
            setCategories(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleDelete = async (record) => {
        try {
            const res = await axios.delete(`http://localhost:9000/api/v1/Category/${record._id}`)
            console.log(res)
            message.success(record.name + ` Category Deleted`)
            fetchCategories();
        } catch (error) {
            console.log(error)
            message.success(`Facing Error on Deleting Category ${record.name}`)
        }
    };

    const handleEdit = async (record) => {
        console.log(record)
        try {
            const res = await axios.put(`http://localhost:9000/api/v1/Category/${record._id}`,editCategoryName
            )
            console.log(res)
            message.success(record.name + ` Category Updated`)
            setEditmode(false)
            fetchCategories();

        } catch (error) {
            console.log(error)
            message.success(`Facing Error on Deleting Category ${record.name}`)
        }
    };

    return (
        <div>
            <div className='flex' style={{ gap: "50px", justifyContent: "space-between" }}>
                <div>
                    <h2>Create a New Category</h2><br />
                    <Input placeholder='Create a new Category' /><br /><br />
                    <Button type='primary'>Create a New Category</Button>
                </div>
                <div>
                    <Table dataSource={Categories}>
                        <Column
                            title="Category name"
                            dataIndex="name"
                            key="name"
                            render={(text, record) => (
                                <>
                                    {!editmode && <span>{record.name}</span>}
                                    {editmode && <Input onChange={(e)=>setEditCategoryName({'name':e.target.value})} defaultValue={record.name} />}
                                </>
                            )}
                        />
                        <Column
                            title="Creation Date"
                            dataIndex="createdAt"
                            key="createdAt"
                            render={createdAt => new Date(createdAt).toLocaleDateString()}
                        />
                        <Column
                            title="Number of Products in It"
                            key="numOfProducts"
                            render={(text, record) => (
                                <span>{record.products.length}</span>
                            )}
                        />
                        <Column
                            title="Action"
                            key="Action"
                            render={(text, record) => (
                                <div className='flex' style={{ gap: "10px" }}>
                                    {editmode && <>
                                        <Button type='primary' onClick={()=>handleEdit(record)}>Update</Button>
                                        <Button onClick={() => setEditmode(false)}>Cancel</Button>
                                    </>}
                                    {!editmode && <>
                                        <Button onClick={() => setEditmode(true)}>Edit</Button>
                                        <Popconfirm
                                            title="Delete the Category"
                                            description="Are you sure to delete this Category?"
                                            okText="Yes"
                                            cancelText="No"
                                            onConfirm={() => handleDelete(record)}
                                        >
                                            <Button danger>Delete</Button>
                                        </Popconfirm>
                                    </>}
                                </div>
                            )}
                        />
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default AllCategories;
