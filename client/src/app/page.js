"use client"

import React, { lazy } from 'react';
import Arrivals from '@/Components/Arrivals';
import Card from '@/Components/Card';
import HomeHeader from '@/Components/HomeHeader';
import Productlist from '@/Components/Productlist';
import Saving from '@/Components/Saving';
import Hero from '@/Components/Hero';
import TopBrandAd from '@/Components/TopBrandAd';
import Footer from '@/Components/Footer';
// import "./Style.css"
const page = () => {


    return (
        <div>
            <HomeHeader />
            <Hero /><br /><br /><br /><br /><br /><br /><br />
            <Card /><br /><br />
            <Arrivals />
            <Saving /><br /><br />
            <Productlist data = {"Mens"} /><br /><br />
            <Productlist data = {"Women"} /><br /><br /><br /><br />
            <TopBrandAd/><br/><br/>
            <Productlist data = {"Shoes"} /><br /><br /><br /><br />
            <Footer/>
        </div>
    );
};

export default page;
