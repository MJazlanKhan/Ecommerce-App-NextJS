import React from 'react'

const AddressCard = ({data}) => {
    return (
        <div>
            {console.log(data)}
            <div style={{ backgroundColor: "#F6F6F6", width: "420px", height: "230px", padding: "30px", borderRadius: "10px" }}>
                <h3>Jhanvi shah</h3><br />
                <p>8980252445</p><br />
                <p>{data.Apt + " " + data.streetAddress + " " + data.city  + " " + data.state}<br />
                    {data.country} </p><br />
                <div  className='flex' style={{gap:"25px"}}>
                    <div className='flex center' style={{ padding: "15px", border: "1px solid #807D7E", minWidth: "80px", height: "30px", borderRadius: "10px" }}><p>Home</p>
                    </div>
                    <div className='flex center' style={{ padding: "15px", border: "1px solid #807D7E", minWidth: "80px", height: "30px", borderRadius: "10px" }}><p>Default billing address</p>
                    </div>

                </div><br />
                <div className='flex' style={{ gap: "25px" }}>
                    <p className='bold'>Remove</p>
                    <p className='bold'>Edit</p>
                </div>
            </div>
        </div>
    )
}

export default AddressCard