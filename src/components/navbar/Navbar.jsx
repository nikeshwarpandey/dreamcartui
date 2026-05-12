import React, { use, useContext, useEffect, useState } from 'react'
import { motion } from "framer-motion"
import './Navbar.css'
import rocket from '../../assets/rocket.png'
import start from '../../assets/glowing-star.png'
import idButton from '../../assets/id-button.png'
import memo from '../../assets/memo.png'
import order from '../../assets/package.png'
import lock from '../../assets/locked.png'
import LinkWithIcon from './LinkWithIcon'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../../contexts/UserContext'
import CartContext from '../../contexts/CartContext'
import { getSuggestionsAPI } from '../../services/productServices'

const Navbar = () => {
    const [search, setSearch] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [selectedItem, setSelectedItem] = useState(-1)

    const navigate = useNavigate();
    // console.log('Navbar user...', user)
    const user = use(UserContext);
    let cartArr = [];
    if (use) {
        const { cart } = use(CartContext);
        cartArr = cart;
    }
    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault()

        if (search.trim() !== "") {
            navigate(`/products?search=${search.trim()}`);
        }
        setSuggestions([])
    }

    const handleKeyDown = (e) => {
        console.log(e.key)
        if (selectedItem < suggestions.length) {
            if (e.key === 'ArrowDown') {
                setSelectedItem(current => current === suggestions.length - 1 ? 0 : current + 1)
            }
            else if (e.key === 'ArrayUp') {
                setSelectedItem(current => current === 0 ? suggestions.length - 1 : current - 1)
            }
            else if (e.key === 'Enter' && selectedItem > -1) {
                const suggestion = suggestions[selectedItem]
                navigate(`/products?search=${suggestion.title}`)
                setSearch('')
                setSuggestions([])
            }
        } else {
            setSelectedItem(-1)
        }
    }

    useEffect(() => {
        const delaySuggestions = setTimeout(() => {
            if (search.trim() !== "") {
                getSuggestionsAPI(search)
                    .then((res) => {
                        setSuggestions(res.data)
                    })
                    .catch((error) => {
                        console.log(error)
                    })
            } else {
                setSuggestions([])
            }
        }, 500)
        return () => clearTimeout(delaySuggestions)
    }, [search])

    console.log('suggestions...', suggestions);


    return (
        <motion.nav
            className='align_center navbar'
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
        >
            <div className='align_center'>
                <h1 className='navbar_heading'>DreamCart</h1>
                <form className='align_center navbar_form' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        className='navbar_search'
                        placeholder='Search products'
                        value={search}
                        onChange={handleSearchChange}
                        onKeyDown={handleKeyDown}
                    />
                    <button type="submit" className='search_button'>Search</button>
                    {suggestions.length > 0 && <ul className="search_result">
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={suggestion._id}
                                className={selectedItem === index ? 'search_suggestion_link active' : 'search_suggestion_link'}
                            >
                                <Link
                                    to={`/products?search=${suggestion.title}`}
                                    onClick={() => {
                                        setSearch(suggestion.title);
                                        setSuggestions([])
                                    }}
                                >
                                    {suggestion.title}
                                </Link>
                            </li>))}

                    </ul>}
                </form>
            </div>
            <div className="align_center navbar_links">
                <LinkWithIcon title="Home" link="/" emoji={rocket} />
                <LinkWithIcon title="Products" link="/products" emoji={start} />
                {!user && <><LinkWithIcon title="Login" link="/login" emoji={idButton} />
                    <LinkWithIcon title="SignUp" link="/signup" emoji={memo} /></>}
                {user && <>
                    <LinkWithIcon title="My Orders" link="/myorders" emoji={order} />
                    <LinkWithIcon title="Logout" link="/logout" emoji={lock} />
                    <NavLink to='/cart' className='align_center'>
                        Cart <p className='align_center cart_counts'>{cartArr.length}</p>
                    </NavLink>
                </>}
            </div>
        </motion.nav>
    )
}

export default Navbar