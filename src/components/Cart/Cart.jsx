import {useState} from 'react';
import {useCartContext} from '../../context/CartContext';
import {getFirestore} from '../../services/GetFirestore';
import {Link} from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import './Cart.css'; 

const Cart = () => {
    
    const [orderId, setOrderId] = useState("");
    const [userForm, setUserForm] = useState({name:"", surname:"", phone:"", email:""});
    const {cartList, removeItem, removeCart, cartTotal} = useCartContext();

    const createOrder = (e) => {

        e.preventDefault()

        let order = {}
        order.date = firebase.firestore.Timestamp.fromDate(new Date());
        order.buyer = userForm;
        order.total = cartTotal;
        order.items = cartList.map(itemAdded => {
            const id = itemAdded.itemDetail.id;
            const title = itemAdded.itemDetail.title;
            const subtotal = itemAdded.itemDetail.price * itemAdded.quantity;
            return {id, title, subtotal}
        })

        const dataBase = getFirestore()

        dataBase.collection("orders").add(order)
        .then(response => setOrderId(response.id))
        .catch (error => alert("Error:", error))
        .finally(() => removeCart())

        const updateStock = dataBase.collection("items").where
        (firebase.firestore.FieldPath.documentId(), "in", cartList.map(idToUpdate => idToUpdate.itemDetail.id))

        const batch = dataBase.batch();

        updateStock.get()
        .then(response => {
            response.docs.forEach(docSnapshot => {
                batch.update(docSnapshot.ref, {
                stock: docSnapshot.data().stock - cartList.find(idToUpdate => idToUpdate.itemDetail.id === docSnapshot.id).quantity
                })
            })
        
        batch.commit()
            .then(response => {console.log("Stock actualizado", response)
            })
        })
    }

    const handleChange = (e) => {
        setUserForm({
            ...userForm, 
            [e.target.name]: e.target.value
        })
    }

    return (

        <div>
            {cartList.length
            ? <button className="remove-cart" onClick={() => removeCart()}>Vaciar carro</button>
            : orderId===""
                ? <div>
                <p className="empty-cart">Su carro está vacío</p>
                <Link className="go-to-home" to="/"> Ir al Home</Link>
                </div>
                : <div>
                <p className="empty-cart">Gracias por su compra!</p>
                <p className="order-id">Tu código de operación es: {orderId}</p>
                <Link className="go-to-home" to="/"> Ir al inicio</Link>
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
                    <p className="cart-total">Total de la compra: $ {cartTotal}</p>
                </div>
                <form onSubmit={createOrder} onChange={handleChange}>
                    <legend className="form-legend">Ingresá tus datos</legend>
                    <div>
                        <label htmlFor="name" className="form-label">Nombre</label>
                        <input type="text" name="name" placeholder="Nombre" value={userForm.name}/>
                    </div>
                    <div>
                        <label htmlFor="surname" className="form-label">Apellido</label>
                        <input type="text" name="surname" placeholder="Apellido" value={userForm.surname}/>
                    </div>
                    <div>
                        <label htmlFor="phone" className="form-label">Teléfono</label>
                        <input type="text" name="phone" placeholder="Teléfono sin el 0 y sin el 15" value={userForm.phone}/> 
                    </div>
                    <div>
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" name="email" placeholder="Mail" value={userForm.email}/>
                    </div>
                    <button className="buy-buttom">Comprar</button>
                </form>
            </div>
        </div>
    )
}

export default Cart