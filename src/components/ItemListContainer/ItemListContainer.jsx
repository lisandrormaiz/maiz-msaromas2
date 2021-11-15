import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getFirestore} from '../../services/GetFirestore';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';
import swal from 'sweetalert';

const ItemListContainer = () => {

    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(true);

    const {categoryId} = useParams();

    useEffect(() => {

        const dataBase = getFirestore() 
        
        if (categoryId) {

            const dataBaseQuery = dataBase.collection("items").where("category", "==", categoryId).get()

            dataBaseQuery
            .then(response => setItemList(response.docs.map(item => ({id:item.id, ...item.data()}))))
            .catch (error => swal("Error:", error))
            .finally(()=> setLoading(false))
        }

        else {

            const dataBaseQuery = dataBase.collection("items").orderBy("category").get()

            dataBaseQuery
            .then(response => setItemList(response.docs.map(item => ({id:item.id, ...item.data()}))))
            .catch (error => swal("Error:", error))
            .finally(()=> setLoading(false))
        } 

    },[categoryId])

    return (
            <div className="item-list-container">
                {loading
                ? <h2 className="loading">Cargando</h2>
                : <ItemList itemList={itemList}/>
                }
            </div>
    )
}

export default ItemListContainer