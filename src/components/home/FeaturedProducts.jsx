import React from 'react'
import { motion } from 'framer-motion'
import './FeaturedProducts.css'
import ProductCard from '../products/ProductCard'
import useData from '../../hooks/useData'
import ProductCardSkeleton from '../products/ProductCardSkeleton'


const FeaturedProducts = () => {
    const { data: featuredProducts, error, isLoading } = useData("/products/featured", null, ["products", "featured"], 6 * 1000)
    const skeletons = [1, 2, 3];
    console.log('featuredProducts...', featuredProducts)
    console.log('error...', error)
    console.log('isLoading...', isLoading)
    return (
        <section className='featured_products'>
            <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeInOut" }}
            >Featured Products</motion.h2>

            <div className='align_center featured_products_list'>
                {error && <em className='form_error'>{error}</em>}
                {isLoading && skeletons.map(item => <ProductCardSkeleton key={item} />)}
                {featuredProducts && featuredProducts.map((product, index) => (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeInOut" }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <ProductCard
                            key={product._id}
                            product={product}
                            key={product._id}
                            id={product._id}
                            image={product.images[0]}
                            price={product.price}
                            title={product.title}
                            rating={product.reviews.rate}
                            ratingCounts={product.reviews.counts}
                            stock={product.stock}
                        />
                    </motion.div>
                ))}

                {/* <ProductCard { product, id, image, price, title, rating, ratingCounts, stock } /> */}
                {/* <ProductCard />
                <ProductCard /> */}
            </div>
        </section>
    )
}

export default FeaturedProducts