import React, { useEffect, useState } from 'react';
import { Button, ColorPicker, Form, Input, Select, Upload, message } from 'antd';
import './Style.css';
import { UploadOutlined } from '@ant-design/icons';
import 'froala-editor/js/froala_editor.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import FroalaEditor from 'react-froala-wysiwyg';
import axios from 'axios';

const NewPost = () => {
  const [Images, setImages] = useState([]);

  const [FeaturedImage, setFeaturedImage] = useState();
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState();
  const [messageApi, contextHolder] = message.useMessage();
  const [Details, setDetails] = useState({
    description: "",
    featuredImage: "",
    moreImages: [],
    productColors:[]
  });
  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:9000/api/v1/Categories");
    console.log(res.data);
    setCategories(res.data);
  };

  useEffect(() => {
    fetchCategories();
  }, [name]);

  const handleAddColorPicker = () => {
    setColors([...colors, "#1677ff"]);
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
        setDetails({ ...Details, "featuredImage": imageURL })
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
        setDetails(prevState => ({  // Update the moreImages state with the new image URL appended
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

  const category = categories.map(item => {
    return {
      label:item.name,
      value: item._id
    };
  });

  const handleFormData = async (e) => {
    setDetails({ ...Details, [e.target.name]: e.target.value });
  };

  const ProductSize = [
    { value: 'XS', label: 'Extra Small' },
    { value: 'S', label: 'Small' },
    { value: 'M', label: 'Medium' },
    { value: 'L', label: 'Large' },
    { value: 'XL', label: 'Extra Large' }
  ];

  const handleSizeChange = (selectedValues) => {
    setDetails({ ...Details, "productSizes": selectedValues });
  };

  const handleSelectedCategory = (selectedValues) => {
    setDetails({ ...Details, "category": selectedValues });
  };

  const handleContent = (e) => {
    setDetails({ ...Details, ["description"]: e })
  };


  const handleColorChange = (color, index) => {
    console.log(color)
    const newColor = `rgba(${color.metaColor.r}, ${color.metaColor.g}, ${color.metaColor.b}, ${color.metaColor.a})`;
    setDetails(prevState => {
      const updatedColors = [...prevState.productColors]; // Make a copy of the array
      updatedColors[index] = newColor; // Update the color at the specified index
      return { ...prevState, productColors: updatedColors }; // Update the state with the new color array
  });
};


  const submitData = async () => {
    if (Details.productColors.length === 0) {
      setDetails({ ...Details, "productColors": ['rgba(0, 0, 0, 1)'] });
    }
    try {
      const res = await axios.post('http://localhost:9000/api/v1/NewProduct', Details)
      console.log(res)
      message.success("Product Post Created")
    } catch (error) {
      console.log(error.response.data.message)
      message.error(error.response.data.message)
    }
  }
  return (
    <div>
      {/* {console.log(colors)} */}
      <Form>
        <h1 style={{ color: "#fff", textAlign: 'center' }}>Add New Product !!</h1><br />
        <Form.Item label='Product Title' name='Title' rules={[{ required: true, message: 'Please Select Product Title' }]}>
          <Input name='title' onChange={handleFormData} placeholder='Enter Product Title Here!!!' />
        </Form.Item>
        <Form.Item label='Short Summary' name='Summary' rules={[{ required: true, message: 'Please Input Product Summary' }]}>
          <Input name='summary' onChange={handleFormData} placeholder='Enter Short Summary Here!!!' />
        </Form.Item>
        <div className='flex' style={{ gap: "15px" }}>
          <Form.Item label='Featured Image' name='FeaturedImage' rules={[{ required: true, message: 'Please Upload Featured Image' }]}>
            <Upload
              showUploadList={false}
              customRequest={HandleFeaturedImages}
              accept=".jpg, .jpeg, .png"
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
          {Images && (
            <div className='flex' style={{ gap: '15px' }}>
              {Images.map((item, index) => (
                <img key={index} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '100%' }} src={item} alt={`Image ${index + 1}`} />
              ))}
            </div>
          )}
        </div>
        <Form.Item label='Product Size' name='Product Size' rules={[{ required: true, message: 'Please Select Product Size' }]}>
          <Select
            style={{ width: "250px", maxWidth: "500px" }}
            mode="multiple"
            className='select'
            placeholder="Select a Product Size"
            options={ProductSize}
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
            <Select style={{ width: "250px" }} className='select' placeholder="Select a Category" options={category} onChange={handleSelectedCategory} />
            <h2 style={{ color: '#fff' }}>OR</h2>
            <Input placeholder='Create New Category' name='name' onChange={(e) => setName(e.target.value)} style={{ width: '250px' }} />
            <Button type='primary' onClick={addNewCategory}>Create a New Category</Button>
          </div>
        </Form.Item>
        <Form.Item label='Product Rating' name='rating' rules={[{ required: true, message: 'Please input Default Product Rating' }]}>
          <Input name='rating' onChange={handleFormData} style={{ width: "250px" }} placeholder='Product Rating' />
        </Form.Item>
        <Form.Item label='Product Price' name='price' rules={[{ required: true, message: 'Please input Product Price' }]}>
          <Input name='price' onChange={handleFormData} style={{ width: "250px" }} placeholder='Price in USD' />
        </Form.Item>
        <Form.Item label='Description' name='Description' rules={[{ required: true, message: 'Please Input Product Description' }]}>
          <FroalaEditor
            config={{ pluginsEnabled: ['charCounter'], charCounterCount: true, charCounterMax: 15, theme: 'dark' }}
            onModelChange={handleContent}
            model={Details.description}
          />
        </Form.Item>
        <div className='flex center'>
          <Button htmlType='submit' onClick={submitData} size='middle' type='primary'>Upload a New Product</Button>
        </div>
      </Form>
    </div>
  );
}

export default NewPost;
