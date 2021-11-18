import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getFirestore} from '../../services/GetFirestore';
import ItemDetail from '../ItemDetail/ItemDetail';

const ItemDetailContainer = () => {

    const [itemDetail, setItemDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    const {itemId} = useParams();

    useEffect(() => {

        const dataBase = getFirestore()

        dataBase.collection("items").doc(itemId).get()
        .then(item => setItemDetail({id:item.id, ...item.data()}))
        .catch (error => alert("Error:", error))
        .finally(()=> setLoading(false))

    },[itemId])

    return (
            <div>
                {loading
                ? <h2 className="loading">El detalle del producto se está cargando</h2>
                : <ItemDetail itemDetail={itemDetail}/>
                }
            </div>
    )
}

export default ItemDetailContainer