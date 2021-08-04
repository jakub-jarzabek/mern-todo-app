const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.json());

const DB_URL = "mongodb://localhost:27017/todo"

//MongoDB Connection
mongoose.connect(DB_URL, ({useNewUrlParser:true}))
    .then(console.log('connected to db'))
    .catch(err=>console.log(err))


//MongoDB Schema
const itemSchema = new mongoose.Schema({
    title:String,
    date:String,
    done:Boolean,
});

const Todo = mongoose.model('todo', itemSchema)

//GET Method
app.get("/api/todos",(req,res)=>{
    Todo.find()
    .then(todo=>res.json(todo))

})


//POST Method
app.post("/api/todos",(req,res)=>{
    const newItem = new Todo({
        title:req.body.title,
        date:req.body.date,
        done:req.body.done
    })
    newItem.save()
    .then(todo=>res.json(todo))
})


//DELETE Method
app.delete("/api/todos/:id",(req,res)=>{
    Todo.findByIdAndDelete(req.params.id)
    .then(()=>res.json({remove:true}))
})


//UPDATE Method
app.put('/api/todos/:id', (req,res)=>{
    Todo.findByIdAndUpdate({_id:req.params.id},req.body)
    .then(function(){
        Todo.findOne({_id:req.params.id})
        .then(function(Todo){
            res.send(Todo)
        })
    })
})


//Listening on port 5k
app.listen(5000,()=>{
    console.log('listening on 5k')
});

