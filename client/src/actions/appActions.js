export const ADD = 'ADD';
export const DELETE = 'DELETE';
export const EDIT = 'EDIT';
export const DONE = 'DONE' 

export const addItem = ({title, date,id}) =>({
    type: ADD,
    payload:{
        title,
        date,
        done:false,
        id
    }
})

export const deleteItem = id => ({
    type: DELETE,
    payload:{
        id
    }
})

export const editItem = ({title,date,id,done}) =>({
    type:EDIT,
    payload:{
        title,
        date,
        id,
        done
    }
})

export const doneItem = id=>({
    type:DONE,
    payload:{
       id
    }
})
