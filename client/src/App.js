import './styles/style.css';
import {useDispatch} from 'react-redux'
import axios from 'axios'
import { addItem } from './actions/appActions';

import Form from './components/Form'
import ItemList from './components/ItemList'
import Header from './components/Header'

function App() {
  const dispatch = useDispatch()
  function getItemsFromDB(TodoItemsArray){
     TodoItemsArray.forEach(todo => {    
         const newItem={
           title:todo.title,
           date:todo.date,
           id:todo._id,
           done:todo.done
         }
         dispatch(addItem(newItem))
       });
 
  }
   async function getTodos(){
   try{
     const response = await axios.get('/api/todos')
     getItemsFromDB(response.data)
    
   }catch(error){
     console.log(error)
   }
 }
  return (
      <div className="__appWrapper">
        <Header/>
        <Form getTodos={getTodos}/>
        <ItemList getTodos={getTodos}/>
      </div>
  );
}

export default App;
