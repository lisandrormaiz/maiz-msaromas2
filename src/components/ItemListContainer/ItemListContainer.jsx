import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {getFirestore} from '../../services/GetFirestore';
import ItemList from '../ItemList/ItemList';
import './ItemListContainer.css';

const ItemListContainer = () => {

    const [itemList, setItemList] = useState([]);
    const [loading, setLoading] = useState(true);

    const {categoryId} = useParams();

    useEffect(() => {

        const dataBase = getFirestore() 
        
        if (categoryId) {

            const dataBaseByCategory= dataBase.collection("items").where("category", "==", categoryId).get()

            dataBaseByCategory
            .then(response => setItemList(response.docs.map(item => ({id:item.id, ...item.data()}))))
            .catch (error => alert("Error:", error))
            .finally(()=> setLoading(false))
        }

        else {

            const totalDataBase = dataBase.collection("items").orderBy("category").get()

            totalDataBase
            .then(response => setItemList(response.docs.map(item => ({id:item.id, ...item.data()}))))
            .catch (error => alert("Error:", error))
            .finally(()=> setLoading(false))
        } 

    },[categoryId])

    return (
            <div className="item-list-container">
                {loading
                ? <h2 className="loading">Los productos se están cargando</h2>
                : <ItemList itemList={itemList}/>
                }
            </div>
    )
}

export default ItemListContainer