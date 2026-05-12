import React, { memo, useContext } from 'react'
import './ProductCard.css'
import config from '../../config.json'
import iphone from '../../assets/iphone.jpg'
import star from '../../assets/white-star.png'
import basket from '../../assets/basket.png'
import { NavLink } from 'react-router-dom'
import CartContext from '../../contexts/CartContext'
import UserContext from '../../contexts/UserContext'

const ProductCard = ({ product, id, image, price, title, rating, ratingCounts, stock }) => {
    const { addToCart } = useContext(CartContext)
    const user = useContext(UserContext)
    return (
        <article className='product_card'>
            <div className='product_image'>
                <NavLink to={`/products/${id}`}>
                    <img src={`${config.backendURL}/products/${image}`} alt="Product image" />
                </NavLink>
            </div>

            <div className="product_details">
                <h3 className="product_price">${price}</h3>
                <p className="product_title">{title}</p>

                <footer className="align_center product_info_footer">
                    <div className="align_center">
                        <p className='align_center product_rating'>
                            <img src={star} alt="star" /> {rating}
                        </p>
                        <p className='product_review_count'>{ratingCounts}</p>
                    </div>

                    {stock > 0 && user && <button className="add_to_cart" onClick={() => addToCart(product, 1)}>
                        <img src={basket} alt="basket button" />
                    </button>}
                </footer>
            </div>
        </article>
    )
}

export default memo(ProductCard)