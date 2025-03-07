import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';

import './product-card.styles.scss';
import Button from '../button/button.component';

const ProductCard = ({ product }) => {
    const { name, price, imageUrl } = product;
    const { addItemtoCart } = useContext(CartContext)

    const addProductToCart = () => {
        addItemtoCart(product)
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${ name }`} />
            <div className='footer'>
                <span className='name'>{ name }</span>
                <span className='price'>&#36;{ price }</span>
            </div>
            <Button onClick={ addProductToCart } buttonType='inverted'>Add to cart</Button>
        </div>
    )
}

export default ProductCard;