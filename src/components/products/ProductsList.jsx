import React, { useEffect, useState } from 'react';
import Axios from '../../utils/api_client.js'
import './ProductsList.css';
import ProductCard from './ProductCard.jsx';
// import useData from '../../hooks/useData.js';
import ProductCardSkeleton from './ProductCardSkeleton.jsx';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../common/Pagination.jsx';
import useProductList from '../../hooks/useProductList.js';

const ProductsList = () => {
    const [sortBy, setSortBy] = useState("")
    const [sortedProducts, setSortedProducts] = useState([])
    const [search, setSearch] = useSearchParams()
    const category = search.get("category")
    const searchQuery = search.get("search")
    // const page = search.get("page")

    const { data, error, isFetching, hasNextPage, fetchNextPage } = useProductList({
        search: searchQuery,
        category: category,
        perPage: 10
    });

    const skeletons = [1, 2, 3, 4, 5, 6, 7, 8]

    /* //pagination with page number
    const handlePageChange = (page) => {
        const currentParams = Object.fromEntries([...search])
        setSearch({ ...currentParams, page: page })
    }
*/

    const handlePageChange = (page) => {
        const currentParams = Object.fromEntries([...search])
        setSearch({ ...currentParams, page: parseInt(currentParams.page) + 1 })
    }


    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 1 && !isFetching && hasNextPage && data) {
                // console.log("Reached to bottom!")
                fetchNextPage();
            }
            // console.log("Scroll Top", scrollTop)
            // console.log("Client Height", clientHeight);
            // console.log("Scroll Height", scrollHeight);
        }
        window.addEventListener("scroll", handleScroll)

        return () => { return window.removeEventListener("scroll", handleScroll) }
    }, [data, isFetching])

    useEffect(() => {
        if (data && data.pages) {
            // const products = [...data.products]
            const products = data.pages.flatMap((page) => page.products)

            if (sortBy === "price desc") {
                setSortedProducts(products.sort((a, b) => b.price - a.price))
            } else if (sortBy === "price asc") {
                setSortedProducts(products.sort((a, b) => a.price - b.price))
            } else if (sortBy === "rate desc") {
                setSortedProducts(products.sort((a, b) => b.reviews.rate - a.reviews.rate))
            } else if (sortBy === "rate asc") {
                setSortedProducts(products.sort((a, b) => a.reviews.rate - b.reviews.rate))
            } else {
                setSortedProducts(products)
            }
        }
    }, [sortBy, data])


    return (
        <section className='products_list_section'>
            <header className='align_center products_list_header'>
                <h2>Products</h2>
                <select name="sort" id="" className='products_sorting' onChange={e => setSortBy(e.target.value)}>
                    <option value="">Relevance</option>
                    <option value="price desc">Price HIGH to LOW</option>
                    <option value="price asc">Price LOW to HIGH</option>
                    <option value="rate desc">Rate HIGH to LOW</option>
                    <option value="rate asc">Rate LOW to HIGH</option>
                </select>
            </header>
            <div className='products_list'>
                {error && <em className='form_error'>{error}</em>}
                {
                    sortedProducts.map((product) => (
                        <ProductCard
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
                    ))
                }
                {isFetching && skeletons.map((item) => <ProductCardSkeleton key={item} />)}

            </div>

        </section>
    )
}

export default ProductsList