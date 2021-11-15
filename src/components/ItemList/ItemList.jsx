import {memo} from "react";
import Item from "../Item/Item";
import './ItemList.css';

const ItemList = memo (

({itemList}) => {
    
    return (
        <div className="item-container">
            {itemList.map(item => <Item key={item.id} item={item}/>
            )}
        </div>
    )
}
)

export default ItemList