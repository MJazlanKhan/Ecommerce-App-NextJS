"use client"
import { ArrowRightOutlined, ArrowUpOutlined, SlidersFilled, SlidersTwoTone } from '@ant-design/icons'
import { Dropdown, Slider } from 'antd'
import React, { useState } from 'react'
import "./Style.css"
const Sidebar = () => {
  const [sliderValues, setSliderValues] = useState([20, 80]);

  const handleSliderChange = (newValues) => {
    setSliderValues(newValues);
  };
  return (
    <div>
      <div><br /><br />
        <div className='flex between'>
          <h3 className='sidebaritems'>Filter</h3>
          <SlidersFilled style={{ color: "#8A8989" }} />
        </div><br /><hr style={{ backgroundColor: "pink" }}></hr><br /><br />
        <Dropdown>
          <p className='flex between sidebaritems' style={{ width: "100%" }}>Tops <ArrowRightOutlined /></p>
        </Dropdown><br />
        <Dropdown>
          <p className='flex between sidebaritems' style={{ width: "100%" }}>Printed T-shirts <ArrowRightOutlined /></p>
        </Dropdown><br />
        <Dropdown>
          <p className='flex between sidebaritems' style={{ width: "100%" }}>Plain T-shirts <ArrowRightOutlined /></p>
        </Dropdown><br />
        <Dropdown>
          <p className='flex between sidebaritems' style={{ width: "100%" }}>Kurti<ArrowRightOutlined /></p>
        </Dropdown><br />
        <Dropdown>
          <p className='flex between sidebaritems' style={{ width: "100%" }}>Boxers<ArrowRightOutlined /></p>
        </Dropdown><br />
        <Dropdown>
          <p className='flex between sidebaritems' style={{ width: "100%" }}>Full sleeve T-shirts<ArrowRightOutlined /></p>
        </Dropdown><br />
        <Dropdown>
          <p className='flex between sidebaritems' style={{ width: "100%" }}>Joggers<ArrowRightOutlined /></p>
        </Dropdown><br />
        <Dropdown>
          <p className='flex between sidebaritems' style={{ width: "100%" }}>Payjamas<ArrowRightOutlined /></p>
        </Dropdown><br />
        <Dropdown>
          <p className='flex between sidebaritems' style={{ width: "100%" }}>Jeans<ArrowRightOutlined /></p>
        </Dropdown><br /><br /><br />
        <div className='flex between'>
          <h3 className='sidebaritems'>Price</h3>
          <ArrowUpOutlined style={{ color: "#8A8989" }} />
        </div><br /><hr style={{ backgroundColor: "pink" }}></hr><br />
        <div>
          <Slider
            range={{ draggableTrack: true }}
            defaultValue={sliderValues}
            onChange={handleSliderChange}
          />
          <div className='flex between'>
            <p style={{ padding: '5px 30px', border: "1px solid #8A8989", borderRadius: "8px" }}>$ {sliderValues[0]}</p>
            <p style={{ padding: '5px 30px', border: "1px solid #8A8989", borderRadius: "8px" }}>$ {sliderValues[1]}</p>
          </div>
        </div>
        <br />
        <br />
        <div className='flex between'>
          <h3 className='sidebaritems'>Colors</h3>
          <ArrowUpOutlined style={{ color: "#8A8989" }} />
        </div><br /><hr style={{ backgroundColor: "pink" }}></hr><br />
        <div className='colorsdiv'>
          <div className='flex center' style={{ gap: "20px" }}>
            <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#8434E1", borderRadius: "10px" }}></div>
              <p>Purple</p>
            </div>
            <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#252525", borderRadius: "10px" }}></div>
              <p>Black</p>
            </div>
            <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#F35528", borderRadius: "10px" }}></div>
              <p>Red</p>
            </div>
            <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#F16F2B", borderRadius: "10px" }}></div>
              <p>Orange</p>
            </div>
          </div><br />
          <div className='flex center' style={{ gap: "20px" }}>
            <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#345EFF", borderRadius: "10px" }}></div>
              <p>Navy</p>
            </div>
            <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#FFFFFF", borderRadius: "10px" }}></div>
              <p>White</p>
            </div>

            <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#D67E3B", borderRadius: "10px" }}></div>
              <p>Broom</p>
            </div>
            <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#48BC4E", borderRadius: "10px" }}></div>
              <p>Green</p>
            </div>
          </div><br />
          <div className='flex center' style={{ gap: "20px" }}>
            <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#FDC761", borderRadius: "10px" }}></div>
              <p>Yellow</p>
            </div> <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#E4E5E8", borderRadius: "10px" }}></div>
              <p>Grey</p>
            </div> <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#E08D9D", borderRadius: "10px" }}></div>
              <p>Pink</p>
            </div> <div className='flex center column'>
              <div className='color' style={{ backgroundColor: "#3FDEFF", borderRadius: "10px" }}></div>
              <p>Blue</p>
            </div>
          </div><br />

        </div><br />
        <div className='flex between'>
          <h3 className='sidebaritems'>Size</h3>
          <ArrowUpOutlined style={{ color: "#8A8989" }} />
        </div><br /><hr style={{ backgroundColor: "pink" }}></hr><br />
        <div>
          <div className='size flex center' style={{ gap: "15px" }}>
            <div>XXS</div>
            <div>XL</div>
            <div>XS</div>
          </div><br />
          <div className='size flex center' style={{ gap: "15px" }}>
            <div>S</div>
            <div>M</div>
            <div>L</div>
          </div><br />
          <div className='size flex center' style={{ gap: "15px" }}>
            <div>XXL</div>
            <div>3XL</div>
            <div>4XL</div>
          </div>
        </div>
        <br />
        <div className='flex between'>
          <h3 className='sidebaritems'>Dress Style</h3>
          <ArrowUpOutlined style={{ color: "#8A8989" }} />
        </div><br /><hr style={{ backgroundColor: "pink" }}></hr><br />
        <div>
          <Dropdown>
            <p className='flex between sidebaritems' style={{ width: "100%" }}>Classic<ArrowRightOutlined /></p>
          </Dropdown><br />
          <Dropdown>
            <p className='flex between sidebaritems' style={{ width: "100%" }}>Casual<ArrowRightOutlined /></p>
          </Dropdown><br />
          <Dropdown>
            <p className='flex between sidebaritems' style={{ width: "100%" }}>Business<ArrowRightOutlined /></p>
          </Dropdown><br />
          <Dropdown>
            <p className='flex between sidebaritems' style={{ width: "100%" }}>Sport<ArrowRightOutlined /></p>
          </Dropdown><br />
          <Dropdown>
            <p className='flex between sidebaritems' style={{ width: "100%" }}>Elegant<ArrowRightOutlined /></p>
          </Dropdown><br />
          <Dropdown>
            <p className='flex between sidebaritems' style={{ width: "100%" }}>Formal (evening)<ArrowRightOutlined /></p>
          </Dropdown><br />
        </div>
      </div>
    </div>
  )
}

export default Sidebar