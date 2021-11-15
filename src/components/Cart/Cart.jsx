import {useCartContext} from '../../context/CartContext';
import {Link} from "react-router-dom";import './Cart.css'; 

const Cart = () => {
    
    const {cartList, removeItem, removeCart, cartTotal} = useCartContext()

    return (
        <div>
            {cartList.length
            ? <button className="remove-cart" onClick={() => removeCart()}>Vaciar carro</button>
            : <div>
                <p className="empty-cart">El carro está vacío</p>
                <Link className="go-to-home" to="/"> Volver al home</Link>
            </div>
            }
            <div className=
                {cartList.length
                ? "filled-cart"
                : "not-filled-cart"
                }
                > 
                {cartList.map(itemAdded => 
                    <div className="item-added-card" key={itemAdded.itemDetail.id} >
                        <img className="item-added-img" src={itemAdded.itemDetail.pictureUrl} alt={itemAdded.itemDetail.title}/>
                        <div className="item-added-info">
                            <h5 className="item-added-title">{itemAdded.itemDetail.title}</h5>
                            <h6 className="item-added-brand">{itemAdded.itemDetail.brand}</h6>
                            <p className="item-added-description">{itemAdded.itemDetail.description}</p>
                            <p className="item-added-price">$ {itemAdded.itemDetail.price}</p>
                            <p className="item-added-quantity">Cantidad: {itemAdded.quantity}</p>
                        </div>
                        <div>
                            <button className="remove-item" onClick={() => removeItem(itemAdded.itemDetail.id)}>Eliminar producto</button>
                        </div>
                    </div>
                )}
                <div>
                    <p className="cart-total">Total: $ {cartTotal}</p>
                </div>
            </div>
        </div>
    )
}

export default Cart