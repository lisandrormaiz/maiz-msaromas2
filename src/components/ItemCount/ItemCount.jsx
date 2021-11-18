import {useState} from 'react';
import {Link} from "react-router-dom";
import './ItemCount.css';

const ItemCount = ({initial, stock, addToCart}) =>{

    const [quantity, setQuantity] = useState(initial);
    const [changeButtom, setChangeButtom] = useState(false);
    
    const decreaseQuantity = () => {
        setQuantity(quantity-1);     
    }   
    const increaseQuantity = () => {
        setQuantity(quantity+1);     
    }

    const addToCartHandler = () => {
    addToCart (quantity);
    setChangeButtom(true);
    }

    return (
        <div className="quantity-container">
            <div className="quantity-selectors">
                <button className="quantity-buttom"onClick={decreaseQuantity} disabled={(quantity<=initial) ? true : false}>-</button>
                <div className="quantity-display">{quantity}</div>
                <button className="quantity-buttom" onClick={increaseQuantity} disabled={(quantity>=stock) ? true : false}>+</button>
            </div>
            {changeButtom 
            ? <Link to="/cart"><button className="purchase-buttom">Finalizar compra</button></Link>
            : <button className="quantity-add" onClick={addToCartHandler}>Agregar al carrito</button>
            }
        </div>
    )
}

export default ItemCount