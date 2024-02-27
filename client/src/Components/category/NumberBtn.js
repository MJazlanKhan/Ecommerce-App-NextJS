import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import React, { useState } from 'react'

const NumberBtn = ({ defaultValue, onChange }) => {
    const [currentNumber, setCurrentNumber] = useState(defaultValue);

    const handleAdd = () => {
        const updatedNumber = currentNumber + 1;
        setCurrentNumber(updatedNumber);
        onChange(updatedNumber);
    };
    // const fetchProducts = async () => {
    //     try {
    //         const cart = localStorage.getItem('cart')
    //         const connvertedCart = JSON.stringify(cart)
    //     } catch (error) {
    //         console.error('Error fetching product:', error);
    //     }
    // };
    // useEffect(() => {
    //     fetchProducts()
    // }, [])
    const handleMinus = () => {
        const updatedNumber = Math.max(currentNumber - 1, 0);
        setCurrentNumber(updatedNumber);
        onChange(updatedNumber);
    };

    return (
        <div className='flex center' style={{ gap: "10px", backgroundColor: "#F6F6F6", width: "100px", padding: "8px 5px", borderRadius: "8px" }}>
            <MinusOutlined onClick={handleMinus} />
            <p>{currentNumber}</p>
            <PlusOutlined onClick={handleAdd} />
        </div>
    );
}

export default NumberBtn;