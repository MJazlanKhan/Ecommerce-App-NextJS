import Footer from '@/Components/Footer'
import HomeHeader from '@/Components/HomeHeader'
import React from 'react'

const page = () => {
    return (
        <div>
            <HomeHeader />
            <div className='flex center' style={{ width: "100%" }}>
                <div style={{ width: "90%", display:"grid", placeItems:"center" }}>
                    <img style={{ objectFit: "contain", width: "100%", height: "570px" }} src="images/confirmed.png" />
                <p style={{ marginTop: '-412px' , marginLeft: '266px', color:"#fff"}} >Continue Shopping</p>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default page