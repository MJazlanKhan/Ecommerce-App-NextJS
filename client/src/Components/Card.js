"use client"

import React from 'react';

const imgs = ["/images/card1.png", "/images/card2.png"];
import "./Style.css"
const Card = () => {
    return (
        <div>
            <div className='flex center' style={{ marginTop: "10px", gap: "25px" }}>
                {imgs.map((img, index) => (
                    <div key={index} style={{ height: "300px", width: "500px", backgroundImage: `url(${img})`, borderRadius: "25px", backgroundSize: "cover", color:"#fff" }}>
                        {index === 0 ? (
                            <>
                                <div style={{ paddingLeft: "50px", justifyContent: "center", height: "100%" }} className='flex column'>
                                    <h3>Low Price</h3><br />
                                    <h2 style={{ fontSize: "35px" }}>High Coziness</h2><br />
                                    <h3>UPTO 50% OFF</h3><br /><br />
                                    <h3>Explore Items</h3>
                                </div>
                            </>
                        ) : (
                            <div style={{ paddingLeft: "50px", justifyContent: "center", height: "100%" }} className='flex column'>
                                <h2>Beyoung Presents</h2><br />
                                <h2 style={{ fontSize: "35px" }}>Breezy Summer</h2>
                                <h2 style={{ fontSize: "35px" }}>Style</h2>

                                <br />
                                <h2>UPTO 50% OFF</h2><br /><br />
                                <h2>Explore Items</h2>
                            </div>
                        )}
                    </div>
                ))}
            </div><br />
        </div>
    );
};

export default Card;
