import React, { useEffect, useState } from 'react'
import './ProductsSidebar.css'
import config from '../../config.json'
import rocket from '../../assets/rocket.png'
import LinkWithIcon from '../navbar/LinkWithIcon'
import Axios from '../../utils/api_client'
import useData from '../../hooks/useData'


const ProductsSidebar = () => {
    // const [categories, setCategories] = useState([]);
    // const [error, setError] = useState('')
    const { data: categories, error, isLoading } = useData('/category', null, ["categories"], 60 * 1000)
    // useEffect(() => {
    //     // Axios.get('/products')
    //     Axios.get('/category')
    //         .then((resData) => {
    //             console.log('resData...', resData)
    //             setCategories(resData?.data || [])
    //         })
    //         .catch((err) => {
    //             setError(err.message)
    //         })
    // }, [])

    return (
        <aside className='products_sidebar'>
            <h2>Category</h2>
            <div className='category_links'>
                {error && <em className='form_error'>{error}</em>}
                {isLoading && <em>Please wait. Loading....</em>}
                {categories && categories.map((category) => (
                    <LinkWithIcon
                        key={category._id}
                        id={category._id}
                        title={category.name}
                        link={`/products?category=${category.name}`}
                        emoji={`${config.backendURL}/category/${category.image}`}
                        sidebar={true}
                    />
                ))}

            </div>
        </aside>
    )
}

export default ProductsSidebar