import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {addItem,editItem } from '../actions/appActions';
import axios from 'axios'



const Form = ({title = '',date,done=false,id, callback}) => {

    //Dispatch Declaration
    const dispatch = useDispatch()

    //State
    const [titleInput, setTitleInput] = useState(title);
    const [dateInput,setDateInput] = useState(date);

    //DB Manipulation Functions
    function addItemToDB(item){
        axios.post('/api/todos',item)
        .then(res=>dispatch(addItem({
            title:res.data.title,
            date:res.data.date,
            done:res.data.done,
            id:res.data._id})
            ))
    }
    function editItemInDB(item){
       axios.put(`/api/todos/${id}`,{title:item.title,date:title.date})
       .then(res=>dispatch(editItem({
           title:res.data.title,
           date:res.data.date,
           id:res.data._id,
           done:res.data.done})
           ))
    }


   
    //Form change handling
    const handleOnChange = (e)=>{
        switch(e.target.id)
        
        {
            case 'title':
                setTitleInput(e.target.value)
                break;

            case 'date':
                setDateInput(e.target.value)
                break;
            
            default:
            console.log(`${e.target.id} input does not exist`)
        }
        }
    
    const handleOnSubmit = (e)=>{
        console.log('submitting')
        e.preventDefault()

        const newItem = {
            title:titleInput,
            date:dateInput,
            done:false
        }

        if(id){
            editItemInDB(newItem)
             
        }else{
            addItemToDB(newItem)
            
        }
        if (id){
            callback();
        }

        }
    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    placeholder="Title"
                    type="text"
                    id="title"
                    onChange = {handleOnChange}
                    value={titleInput}
                />
                <label htmlFor="date">Date:</label>
                <input 
                type="date"  
                id="date"
                onChange = {handleOnChange}
                value = {dateInput}
                />
                <button 
                type="submit"
                className="__formBtn"
                >
                    {id? 'Edit' : 'ADD'}
                </button>
            </form>
        </div>
    )
};

export default Form;
