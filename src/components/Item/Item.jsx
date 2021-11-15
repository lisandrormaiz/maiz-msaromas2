import {Link} from "react-router-dom";
import './Item.css'; 

const Item = ({item}) => {
    
    return (
            <div className="item-card" >
                <Link to={`/producto/${item.id}`}><img className="item-img" src={item.pictureUrl} alt={item.title}/></Link>
                <h5 className="item-title">{item.title}</h5>
                <p className="item-price">$ {item.price}</p>
                <Link to={`/producto/${item.id}`}><button className="item-buttom">Detalle</button></Link>
            </div>
    )
}

export default Item