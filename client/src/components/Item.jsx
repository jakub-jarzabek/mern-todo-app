import React, {useState} from 'react'
import Form from './Form';
import { deleteItem, doneItem } from '../actions/appActions';
import { useDispatch } from 'react-redux';
import axios from 'axios';






const Item = ({title,date,done, id}) => {
    const [isVisible, setIsVisible] = useState(false)
    const dispatch = useDispatch()
    const changeIsVisible = () => {
        setIsVisible(prevState=>!prevState)
    }
    
    function deleteItemFromDB(id){
        console.log('deleting id' + id)
        axios.delete(`/api/todos/${id}`) 
    }

    function toggleDoneState(id){
        axios.put(`/api/todos/${id}`,{done:!done}) 
    }

    function handleDeleteOnClick(id){
         deleteItemFromDB(id);
        dispatch(deleteItem(id))
    }

    function handleDoneOnClick(id){
        dispatch(doneItem(id))
        toggleDoneState(id)
    }

    const elementToRender = isVisible
    ?
    (
        <Form
        callback={changeIsVisible}
        title={title}
        date={date}
        id={id}
        done={done}
        />

    ):
    (
        <button onClick={changeIsVisible}>
            EDIT
        </button>
    )
    return (
            <li>
                <p>   
                <span className="__title">{title}</span> | <span clasName="__date">{date}</span> | <span style={{color:`${done? 'green' : 'black'}`}}>{done ? "Done" : "ToDo"}</span>
                <button onClick={()=>handleDeleteOnClick(id)}>Delete</button>
                {done ? false : <button onClick={()=>handleDoneOnClick(id)}>Done</button> }
                {done? null : elementToRender} 
                </p>
            </li>
    )
};
export default Item;