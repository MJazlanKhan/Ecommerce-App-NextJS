import React, { useEffect, useState } from 'react'
import { Button, Popconfirm, Space, Spin, Table, Tag, message, Form, Input, Upload, Pagination, Select, ColorPicker } from 'antd';
import axios from 'axios';
import FroalaEditor from 'react-froala-wysiwyg';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
// import { useNavigate } from 'react-router-dom';

const { Column, ColumnGroup } = Table;

const AllPosts = () => {
    const [Images, setImages] = useState([]);

    const [FeaturedImage, setFeaturedImage] = useState();
    const [colors, setColors] = useState([]);
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState();
    const [postData, setPostData] = useState([])
    const [editMode, setEditMode] = useState(false)
    const [EditingPost, setEditingPost] = useState({
        moreImages: []
    })
    const [messageApi, contextHolder] = message.useMessage();
    const [Loading, setLoading] = useState(false)
    const [UploadedImg, setUploadedImg] = useState(null)
    const [PostDetails, setPostDetails] = useState({
        content: "",
    })
    // const navigate = useNavigate()
    const [form] = Form.useForm();
    const fetchCategories = async () => {
        const res = await axios.get("http://localhost:9000/api/v1/Categories");
        console.log(res.data);
        setCategories(res.data);
    };
    useEffect(() => {
        fetchCategories()
    }, [name])

    const loadPosts = async () => {
        try {
            setLoading(true)
            const res = await axios.get("http://localhost:9000/api/v1/Products")
            setPostData(res.data)
            setLoading(false)

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }
    useEffect(() => {
        loadPosts()
    }, [])
    const sortedData = [...postData].sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    const data = sortedData.map(post => ({
        key: post._id,
        pic: post.featuredImage || '',  // Assuming image is the property you want to display for 'pic'
        Name: post.title || '',
        Summary: post.summary || '',
        content: post.description || '',
        PublishingDate: post.createdAt ? post.createdAt.split('T')[0] : '',
        price: post.price || '',
        category: post.category || ''
    }))
    const handleColorChange = (color, index) => {
        console.log(color)
        const newColor = `rgba(${color.metaColor.r}, ${color.metaColor.g}, ${color.metaColor.b}, ${color.metaColor.a})`;
        setEditingPost(prevState => {
            const updatedColors = [...prevState.productColors]; // Make a copy of the array
            updatedColors[index] = newColor; // Update the color at the specified index
            return { ...prevState, productColors: updatedColors }; // Update the state with the new color array
        });
    };

    const handleDelete = async (record) => {
        // console.log(record)
        const postId = record._id
        try {
            const res = await axios.delete(`http://localhost:9000/api/v1/Product/${postId}`)
            if (res.status === 200) {
                message.success("Post Has Been Deleted !!")
                loadPosts()
            }
        } catch (error) {
            console.log(error)
            message.error("Post Delete Failed !!")
        }
    }
    const editPost = async (record) => {
        console.log(record)
        setEditingPost(record)
        setEditMode(true)
    }


    const cloudinaryConfiguration = {
        cloudName: 'dcnam8mwd',
        apiKey: 'gNB3SUQcqpoCyWaeXDFGExjwhZM',
    };
    const addNewCategory = async () => {
        console.log(name);
        try {
            const res = await axios.post('http://localhost:9000/api/v1/NewCategory', { name });
            console.log(res);
            message.success(name + " Created Sucessfully");
            setName(null);
        } catch (error) {
            console.log(error);
        }
    };

    const HandleFeaturedImages = async ({ file, onSuccess, onError }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'usersimage');

            const response = await axios.post('https://api.cloudinary.com/v1_1/dcnam8mwd/image/upload', formData);

            if (response.status === 200) {
                const imageURL = response.data.secure_url;
                setFeaturedImage(imageURL);
                setEditingPost({ ...EditingPost, "featuredImage": imageURL })
            } else {
                console.log('Error')
            }
        } catch (error) {
            console.error('Error uploading featured image: ', error);
        }
    }


    const HandleImages = async ({ file, onSuccess, onError }) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'usersimage');

            const response = await axios.post('https://api.cloudinary.com/v1_1/dcnam8mwd/image/upload', formData);

            if (response.status === 200) {
                const imageURL = response.data.secure_url;
                setImages([...Images, imageURL]);
                setEditingPost(prevState => ({  // Update the moreImages state with the new image URL appended
                    ...prevState,
                    moreImages: [...prevState.moreImages, imageURL]
                }));

            } else {
                console.log('Error');
            }
        } catch (error) {
            console.error('Error uploading image: ', error);
        }
    };

    const handleValues = (e) => {
        setEditingPost({ ...EditingPost, [e.target.name]: e.target.value })
        // console.log(EditingPost)
    }
    const handleContent = (e) => {
        setEditingPost({ ...EditingPost, "description": e })
    }
    const ProductSize = [
        { value: 'XS', label: 'Extra Small' },
        { value: 'S', label: 'Small' },
        { value: 'M', label: 'Medium' },
        { value: 'L', label: 'Large' },
        { value: 'XL', label: 'Extra Large' }
    ];
    const handleSizeChange = (selectedValues) => {
        setEditingPost({ ...EditingPost, "productSizes": selectedValues });
    };
    const category = categories.map(item => {
        return {
            label: item.name,
            value: item._id
        };
    });
    const submitEditedValues = async () => {
        console.log(EditingPost)
        const postId = EditingPost._id
        try {
            setLoading("editpost")
            const values = await form.validateFields()
            const res = await axios.put(`http://localhost:9000/api/v1/Product/${postId}`, EditingPost)
            console.log(res)
            if (res.status === 200) {
                message.success("Post Updated SucessFully")
                setLoading(false)
                setEditMode(false)
                loadPosts()
            }

        } catch (error) {
            console.log(error)
            message.error("Error Updating Failed")

            setLoading(false)
            setEditMode(false)
        }
    }
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(5);

    const onPageChange = (page, pageSize) => {
        setCurrentPage(page);
    };
    
    const removeImage = async (image) => {
        console.log(image)
        try {
            const response = await axios.put(`http://localhost:9000/api/v1/product/${EditingPost._id}/images`, {
                image
            });

        } catch (error) {
            console.error('Error removing image:', error);
            // setLoading(false);
        }

    };
    const handleSelectedCategory = (selectedValues) => {
        setEditingPost({ ...EditingPost, "category": selectedValues });
    };
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    const displayedData = sortedData.slice(start, end);
    return (
        <div>
            {editMode ? (<>
                {console.log(EditingPost)}

                <div className='newpost'>
                    <h2 style={{ textAlign: "center", paddingBottom: "20px" }}>Editing A Movie !!</h2>


                    <Form >
                        {Loading === "editpost" && <>
                            <div style={{ display: "flex", justifyContent: "center" }}>
                                <Spin size='large' /><br /><br /><br />
                            </div>
                        </>}
                        <h1 style={{ color: "#fff", textAlign: 'center' }}>Add New Product !!</h1><br />
                        <Form.Item label='Product Title' name='Title' rules={[{ required: true, message: 'Please Input Product Title' }]}>
                            <Input name='title' defaultValue={EditingPost.title} onChange={handleValues} placeholder='Enter Product Title Here!!!' />
                        </Form.Item>
                        <Form.Item label='Short Summary' name='Summary' rules={[{ required: true, message: 'Please Input Product Summary' }]}>
                            <Input name='summary' defaultValue={EditingPost.summary} onChange={handleValues} placeholder='Enter Short Summary Here!!!' />
                        </Form.Item>
                        <div className='flex' style={{ gap: "15px" }}>
                            <Form.Item label='Featured Image' name='FeaturedImage' rules={[{ required: true, message: 'Please Upload Featured Image' }]}>
                                <Upload
                                    showUploadList={false}
                                    customRequest={HandleFeaturedImages}
                                    accept=".jpg, .jpeg, .png"
                                    value={EditingPost.summary}
                                >
                                    <Button className='uploadbtn' style={{ color: "#fff" }} >
                                        <UploadOutlined style={{ fontSize: "25px", color: "#fff" }} />
                                        <br />
                                        Upload</Button>
                                </Upload>
                            </Form.Item>
                            {FeaturedImage && <img style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '100%' }} src={FeaturedImage} />}
                        </div>
                        <div className='flex' style={{ gap: "15px" }}>
                            <Form.Item className='flex' label='Images' name='Images' rules={[{ required: true, message: 'Please Upload Images' }]}>
                                <Upload
                                    showUploadList={false}
                                    customRequest={HandleImages}
                                    accept=".jpg, .jpeg, .png"
                                >
                                    <Button className='uploadbtn' style={{ color: "#fff" }} >
                                        <UploadOutlined style={{ fontSize: "25px", color: "#fff" }} />
                                        <br />
                                        Upload</Button>
                                </Upload>
                            </Form.Item>
                            {EditingPost.moreImages && EditingPost.moreImages.map((image, index) => (
                                <div key={index} className="image-container">
                                    <img src={image} alt={`Image ${index}`} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '100%' }} />
                                    <button onClick={() => removeImage(image)}>Remove</button>
                                    {/* {console.log(image)} */}
                                </div>
                            ))}
                        </div>
                        <Form.Item label='Product Size' name='Product Size' rules={[{ required: true, message: 'Please Select Product Size' }]}>
                            <Select
                                style={{ width: "250px", maxWidth: "500px" }}
                                mode="multiple"
                                className='select'
                                placeholder="Select a Product Size"
                                options={ProductSize}
                                defaultValue={EditingPost.productSizes}
                                onChange={handleSizeChange}
                            />
                        </Form.Item>
                        <Form.Item label='Product Colors' name='productColors' rules={[{ required: true, message: 'Please Select Product Colors' }]}>
                            <Form.List name="productColors">
                                {(fields, { add, remove }) => (
                                    <>
                                        <div className='flex' style={{ gap: "15px" }}>
                                            {fields.map((field, index) => (
                                                <Form.Item {...field} key={field.key} name={[field.name, 'color']} fieldKey={[field.fieldKey, 'color']}
                                                    rules={[{ required: true, message: 'Please Select Product Color' }]}>

                                                    <ColorPicker
                                                        defaultValue={{ alpha: 'ff', red: '16', green: '77', blue: 'ff' }}
                                                        onChange={(color) => handleColorChange(color, index)}
                                                    />
                                                </Form.Item>
                                            ))}
                                        </div>
                                        <Button type="dashed" onClick={() => add()} icon={<UploadOutlined />} style={{ width: '100%' }}>
                                            Add Color Picker
                                        </Button>
                                    </>
                                )}
                            </Form.List>
                        </Form.Item>
                        <Form.Item label='Category' name='category' rules={[{ required: true, message: 'Please Select Product Category' }]}>
                            <div className='flex acenter' style={{ gap: "50px" }}>
                                <Select style={{ width: "250px" }} defaultValue={EditingPost.category} className='select' placeholder="Select a Category" options={category} onChange={handleSelectedCategory} />
                                <h2 style={{ color: '#fff' }}>OR</h2>
                                <Input placeholder='Create New Category' name='name' onChange={(e) => setName(e.target.value)} style={{ width: '250px' }} />
                                <Button type='primary' onClick={addNewCategory}>Create a New Category</Button>
                            </div>
                        </Form.Item>
                        <Form.Item label='Product Rating' name='rating' rules={[{ required: true, message: 'Please input Default Product Rating' }]}>
                            <Input name='rating' defaultValue={EditingPost.rating} onChange={handleValues} style={{ width: "250px" }} placeholder='Product Rating' />
                        </Form.Item>
                        <Form.Item label='Product Price' name='price' rules={[{ required: true, message: 'Please input Product Price' }]}>
                            <Input name='price' defaultValue={EditingPost.price} onChange={handleValues} style={{ width: "250px" }} placeholder='Price in USD' />
                        </Form.Item>
                        <Form.Item label='Description' name='Description' rules={[{ required: true, message: 'Please Input Product Description' }]}>
                            <FroalaEditor
                                config={{ pluginsEnabled: ['charCounter'], charCounterCount: true, charCounterMax: 15, theme: 'dark' }}
                                onModelChange={handleContent}
                                model={EditingPost.description}
                            />
                        </Form.Item>
                        <div className='flex center'>
                            <Button htmlType='submit' onClick={submitEditedValues} size='middle' type='primary'>Upload a New Product</Button>
                        </div>
                    </Form>

                </div>
            </>) : (<>
                {Loading && <>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Spin size='large' /><br /><br /><br />
                    </div>
                </>}
                <Table pagination={false} dataSource={displayedData}>
                    <Column
                        title="Featured Image"
                        dataIndex="pic"
                        render={(text, record) => (
                            <img style={{ width: "75px" }} src={record.featuredImage} />
                        )}
                    />
                    <Column
                        title="Name"
                        dataIndex="Name"
                        render={(text, record) => (
                            <p style={{ width: "200px" }}>{record.title}</p>
                        )}
                    />
                    <Column
                        title="Summary"
                        dataIndex="Summary"

                        render={(text, record) => (
                            <p style={{ width: "300px" }}>{record.summary}</p>
                        )}
                    />
                    <Column
                        title="Price (USD)"
                        dataIndex="price"
                        render={(text, record) => (
                            <p>{record.price} USD</p>
                        )}
                    />
                    <Column
                        title="Publishing Date"
                        dataIndex="PublishingDate"
                        render={(text, record) => (
                            <p>{record.createdAt.split("T")[0]}</p>
                        )}
                    />

                    <Column
                        title="Action"
                        key="action"
                        render={(text, record) => (
                            <Space size="middle">
                                <Button primary onClick={() => editPost(record)}>Edit</Button>

                                <Popconfirm
                                    title="Delete the task"
                                    description="Are you sure to delete this task?"
                                    okText="Yes"
                                    cancelText="No"
                                    onConfirm={() => handleDelete(record)}
                                >
                                    <Button danger>Delete</Button>
                                </Popconfirm>
                            </Space>
                        )}
                    />
                </Table><br />
                <Pagination
                    onChange={onPageChange}
                    defaultCurrent={1}
                    total={sortedData.length}
                    pageSize={pageSize}
                />
            </>)}
        </div>
    )
}

export default AllPosts