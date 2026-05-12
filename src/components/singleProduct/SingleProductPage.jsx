import React, { memo, useContext, useState } from 'react'
import './SingleProductPage.css'
import config from '../../config.json'
import iphone from '../../assets/iphone.jpg'
import star from '../../assets/white-star.png'
import basket from '../../assets/basket.png'
import QuantityInput from './QuantityInput'
import { useParams } from 'react-router-dom'
import useData from '../../hooks/useData'
import CartContext from '../../contexts/CartContext'
import UserContext from '../../contexts/UserContext'


const SingleProductPage = () => {
    const [selectedImage, setSelectedImage] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const { addToCart } = useContext(CartContext)
    const user = useContext(UserContext)
    const { id } = useParams();
    const { data: product, error, isLoading } = useData(`/products/${id}`, null, ["products", id])

    const handleAddToCart = () => {
        console.log('u clicked handleAddToCart....product,quantity...', product, quantity)
        addToCart(product, quantity)
    }
    return (
        <section className='align_center single_product'>
            {error && <em className='form_error'>{error}</em>}
            {isLoading && <em> Please wait. Loading...</em>}
            {product && <><div className='align_center'>
                <title>{"CartWish - " + product.title}</title>
                <meta name="description" content={product.description} />
                <div className='single_product_thumbnails'>
                    {
                        product.images.map((image, index) => (
                            <img
                                key={index}
                                src={`${config.backendURL}/products/${image}`}
                                alt={product.title}
                                className={selectedImage === index ? 'selected_image' : ''}
                                onClick={() => setSelectedImage(index)}
                            />
                        ))
                    }
                </div>
                <img
                    src={`${config.backendURL}/products/${product.images[selectedImage]}`}
                    alt={product.title}
                    className='single_product_display'
                />
            </div>
                <div className='single_product_details'>
                    <h1 className='single_product_title'>
                        {product.title}
                    </h1>
                    <p className='single_product_description'>{product.description}</p>
                    <p className='single_product_price'>${product.price.toFixed(2)}</p>
                    {user && <>
                        <h2 className='quantity_title'>Quantity:</h2>
                        <div className='align_center quantity_input'>
                            <QuantityInput quantity={quantity} setQuantity={setQuantity} stock={product.stock} />
                        </div>
                        <button className="search_button add_cart" onClick={handleAddToCart}>Add to cart</button>
                    </>
                    }
                </div></>}
        </section>
    )
}

export default memo(SingleProductPage)