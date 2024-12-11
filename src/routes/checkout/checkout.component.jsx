import { useContext, Fragment } from 'react';

import './checkout.styles.scss';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext)
    return (
        <Fragment>
            <div className="checkout-container">
                <div className='checkout-header'>
                    <div className='header-block'><span>product</span></div>
                    <div className='header-block'><span>name</span></div>
                    <div className='header-block'><span>quantity</span></div>
                    <div className='header-block'><span>price</span></div>
                    <div className='header-block'><span>remove</span></div>
                </div>
                {
                    cartItems.map((cartItem) => {
                        return (
                            <CheckoutItem key={cartItem.id} cartItem={ cartItem }/>
                        )
                    })
                }
            </div>
            <div className='checkout-total-container'>
                <span className='checkout-total'>total: &#36;{ cartTotal }</span>
            </div>
        </Fragment>
    )
}

export default Checkout;