import React, { useState, useEffect, useContext, use } from 'react'
import UserContext from '../../contexts/UserContext'
import CartContext from '../../contexts/CartContext'
import './CartPage.css'
import config from '../../config.json'
import remove from '../../assets/remove.png'
import user from '../../assets/user.webp'
import Table from '../common/Table'
import QuantityInput from '../singleProduct/QuantityInput'
import { tr } from 'zod/locales'
import { toast } from 'react-toastify'
import { checkoutAPI } from '../../services/orderServices'

const CartPage = ({ }) => {
    // const [subTotal, setSubTotal] = useState(0)
    const userObj = use(UserContext)
    // console.log(userObj)
    const { cart, removeFromCart, updateCart, setCart } = use(CartContext)
    const subTotal = () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.product.price * item.quantity
        })
        // setSubTotal(total);
        return total
    }

    const handleCheckout = () => {
        const oldCart = [...cart];
        checkoutAPI().then(() => {
            setCart([])
            toast.success("Order placed successfully!");
        }).catch(() => {
            toast.error("Something went wrong!");
            setCart(oldCart)
        })
    }

    return (
        <section className='align_center cart_page'>
            <div className="align_center user_info">
                <img src={`${config.backendURL}/profile/${userObj?.profilePic}`} alt="user profile" />
                <div>
                    <p className='user_name'>Name:{userObj?.name}</p>
                    <p className="user_email">Email:{userObj?.email}</p>
                </div>
            </div>
            {/* Cart Table */}
            <Table headings={["Item", "Price", "Quantity", "Total", "Remove"]}>
                <tbody>
                    {cart.map(({ product, quantity }) => (<tr key={product._id}>
                        <td>{product.title}</td>
                        <td>${product.price}</td>
                        <td className='align_center table_quantity_input'>
                            <QuantityInput
                                quantity={quantity}
                                stock={product.stock}
                                setQuantity={updateCart}
                                CartPage={true}
                                productId={product._id}
                            />
                        </td>
                        <td>${quantity * product.price}</td>
                        <td>
                            <img
                                src={remove}
                                alt={'remove icon'}
                                className='cart_remove_icon'
                                onClick={() => removeFromCart(product._id)}
                            />
                        </td>
                    </tr>))}

                </tbody>
            </Table>
            <table className="cart_bill">
                <tbody>
                    <tr>
                        <td>Subtotal</td>
                        <td>${subTotal()}</td>
                    </tr>
                    <tr>
                        <td>Shipping Charge</td>
                        <td>$5</td>
                    </tr>
                    <tr className='cart_bill_final'>
                        <td>Total</td>
                        <td>${subTotal() + 5}</td>
                    </tr>
                </tbody>
            </table>

            <button className="search_button checkout_button" onClick={handleCheckout}>Checkout</button>
        </section>
    )
}

export default CartPage