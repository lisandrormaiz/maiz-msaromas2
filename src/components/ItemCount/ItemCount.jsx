import {useState} from 'react';
import {Link} from "react-router-dom";
import { Button } from 'reactstrap';
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
                <Button  color="success" outline onClick={decreaseQuantity} disabled={(quantity<=initial) ? true : false}>-</Button>
                <div className="quantity-display">{quantity}</div>
                <Button  color="success" outline onClick={increaseQuantity} disabled={(quantity>=stock) ? true : false}>+</Button>
            </div>
            {changeButtom 
            ? <Link to="/cart"><Button  color="success" outline>Finalizar compra</Button></Link>
            : <Button  color="success" outline onClick={addToCartHandler}>Agregar al carro</Button>
            }
        </div>
    )
}

export default ItemCount