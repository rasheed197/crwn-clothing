import { useContext } from 'react';

import './checkout-item.styles.scss';
import { CartContext } from '../../contexts/cart.context';

const CheckoutItem = ({ cartItem }) => {
    const { name, imageUrl, price, quantity } = cartItem;
    const { clearItemFromCart, addItemtoCart, removeItemFromCart } = useContext(CartContext)

    const clearCartHandler = () => {
        return clearItemFromCart(cartItem);
    }

    const addItemHandler = () => {
        return addItemtoCart(cartItem);
    }

    const removeItemHandler = () => {
        return removeItemFromCart(cartItem);
    }

    return (
            <div className='checkout-item-container'>
                <div className='image-container'>
                    <img src={ imageUrl } alt={`${name}`}/>
                </div>
                <span className='name'>{ name }</span>

                <span className='quantity'>
                    <div className='arrow' onClick={ removeItemHandler }>&#10094;</div>
                        <span className='value'>{ quantity }</span>
                    <div className='arrow' onClick={ addItemHandler }>&#10095;</div>
                </span>

                <span className='price'>&#36;{ price }</span>
                <div className='remove-button' onClick={ clearCartHandler }>&#10005;</div>
            </div>
    )
}

export default CheckoutItem;