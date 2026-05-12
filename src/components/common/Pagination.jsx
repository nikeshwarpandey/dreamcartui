import React from 'react'
import './Pagination.css'

const Pagination = ({ totalPosts, postsPerPage, handlePageChange, currentPage }) => {
    let pages = []
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i)
    }
    return (
        <>
            {
                pages.length > 1 && <ul className='pagination'>
                    {pages.map((page) => (<li key={page}>
                        <button
                            className={parseInt(currentPage) === page ? 'pagination_button active' : 'pagination_button'}
                            onClick={() => { handlePageChange(page) }}>
                            {page}
                        </button>
                    </li>))}
                </ul>
            }
        </>
    )
}

export default Pagination