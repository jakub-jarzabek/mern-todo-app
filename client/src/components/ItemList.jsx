import React,{useEffect} from 'react'
import Item from './Item'
import {useSelector} from 'react-redux';
 
const ItemList  = ({getTodos}) => {

    //Getting all items from DB
    useEffect(()=>{
        getTodos()
    },[])

    //Rendering items into view
    const items = useSelector(store=>store.items)
    const Items = items.map(item => 
    <Item key={item.id} {...item}/>
        )
    return (
        <ul>
            {Items}
        </ul>
    )
};


export default ItemList;