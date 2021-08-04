import {
    ADD,EDIT,DELETE,DONE,GET
} from '../actions/appActions'

export const itemReducer = (state=[],action) =>{
 switch(action.type){
     case ADD:{
         console.log('payload' + action.payload.title)
         return [...state, action.payload];
     }

    case EDIT:
        return state.map(item =>{
            console.log( 'payload id' + action.payload)
            console.log('item id'  + item.id)
            if (item.id !== action.payload.id){
               return item;
            }
            const {title,date,done} = action.payload
            return ({
                title,
                date,
                id:item.id,
                done
            });
        });

    case DELETE:
        return state.filter(item => item.id !==action.payload.id);


    case DONE: 
    return state.map(item=>{
        if (item.id !==action.payload.id){
            return item;
        }
        return({
            ...item,
            done:true
        })
        })
    
    default:
    console.log(`${action.type} there is no such action implemented`)
    return state
 }
}