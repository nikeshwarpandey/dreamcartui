import React, { useEffect, useState } from 'react';
import Axios from '../../utils/api_client.js'
import './ProductsList.css';
import ProductCard from './ProductCard.jsx';
import useData from '../../hooks/useData.js';
import ProductCardSkeleton from './ProductCardSkeleton.jsx';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../common/Pagination.jsx';

const ProductsList = () => {
    const [page, setPage] = useState(1)
    const [search, setSearch] = useSearchParams()
    const category = search.get("category")
    // const page = search.get("page")

    const { data: resData, error, isLoading } = useData('/products', {
        params: {
            category: category,
            perPage: 10,
            page: page
        }
    }, [category, page]);

    useEffect(() => {
        setPage(1)
    }, [category])

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

            if (scrollTop + clientHeight >= scrollHeight - 1 && !isLoading && resData && page < resData.totalPages) {
                console.log("Reached to bottom!")
                setPage((prev) => prev + 1);
            }
            console.log("Scroll Top", scrollTop)
            console.log("Client Height", clientHeight);
            console.log("Scroll Height", scrollHeight);
        }
        window.addEventListener("scroll", handleScroll)

        return () => { return window.removeEventListener("scroll", handleScroll) }
    }, [resData, isLoading])


    return (
        <section className='products_list_section'>
            <header className='align_center products_list_header'>
                <h2>Products</h2>
                <select name="sort" id="" className='products_sorting'>
                    <option value="">Relevance</option>
                    <option value="price desc">Price HIGH to LOW</option>
                    <option value="price asc">Price LOW to HIGH</option>
                    <option value="rate desc">Rate HIGH to LOW</option>
                    <option value="rate asc">Rate LOW to HIGH</option>
                </select>
            </header>
            <div className='products_list'>
                {error && <em className='form_error'>{error}</em>}
                {/* {isLoading && <ProductCardSkeleton />} */}
                {isLoading && skeletons.map(item => <ProductCardSkeleton key={item} />)}
                {resData?.products && resData?.products.map(product => (
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
                ))}

            </div>
            {/* 
            //pagination with page nuber
            {resData && (<Pagination
                totalPosts={resData?.totalProducts}
                postsPerPage={1}
                handlePageChange={handlePageChange}
                currentPage={page}
            />)}
             */}
        </section>
    )
}

export default ProductsList