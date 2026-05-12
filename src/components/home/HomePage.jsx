import React from 'react'
import './HomePage.css'
import config from '../../config.json'
import iphone from '../../assets/iphone-14-pro.webp'
import mac from '../../assets/mac-system-cut.jfif'
import HeroSection from './HeroSection'
import FeaturedProducts from './FeaturedProducts'


const HomePage = () => {
    return (
        <div>
            <HeroSection
                title="Buy iPhone 14 Pro"
                subtitle="Experience the power of latest iPhone 14 with our most Pro camera ever."
                link="/products/69f73e052755178c0175aa4d"
                image={iphone}
            />
            <FeaturedProducts />
            <HeroSection
                title="Build the ultimate setup"
                subtitle="You can add Studio Display and color-matched Magic accessories to your bag after configure your Mac mini."
                link={`${config.backendURL}/products/69f73e052755178c0175aa4f`}
                image={mac}
            />
        </div>
    )
}

export default HomePage