import {Link} from 'react-router-dom';
import {useCartContext} from '../../context/CartContext';
import './CartWidget.css';

const CartWidget = () => {

        const {itemQuantity} = useCartContext()

            return (
                <Link to="/cart" className="cartwidget-container">
                    <button className="cartwidget">
                    <p className="cartwidget-quantity">{itemQuantity}</p>
                    <img src="../assets/shopping-bag.svg" alt="Carro"/>
                    </button>
                </Link>
            )
        }

export default CartWidget