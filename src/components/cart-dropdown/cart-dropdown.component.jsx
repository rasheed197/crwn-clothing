import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import './cart-dropdown.styles.scss';
import Button from '../button/button.component'
import { CartContext } from '../../contexts/cart.context';
import CartItem from '../cart-item/cart-item.component';

const CartDropDown = () => {
    const { cartItems } = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler= () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
            {
                cartItems.map((cartItem) => {
                    return <CartItem key={cartItem.id} cartItem={cartItem} />
                })
            }
            </div>
                <Button onClick={ goToCheckoutHandler }>Go to checkout</Button>
        </div>
    )
}

export default CartDropDown;