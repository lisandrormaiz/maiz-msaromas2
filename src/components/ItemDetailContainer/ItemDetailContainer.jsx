import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getFirestore} from '../../services/GetFirestore';
import ItemDetail from '../ItemDetail/ItemDetail';
import swal from 'sweetalert';

const ItemDetailContainer = () => {

    const [itemDetail, setItemDetail] = useState([]);
    const [loading, setLoading] = useState(true);

    const {itemId} = useParams();

    useEffect(() => {

        const dataBase = getFirestore()

        const dataBaseQuery = dataBase.collection("items").doc(itemId).get()

        dataBaseQuery
        .then(item => setItemDetail({id:item.id, ...item.data()}))
        .catch (error => swal("Error:", error))
        .finally(()=> setLoading(false))

    },[itemId])

    return (
            <div>
                {loading
                ? <h2 className="loading">Cargando</h2>
                : <ItemDetail itemDetail={itemDetail}/>
                }
            </div>
    )
}

export default ItemDetailContainer