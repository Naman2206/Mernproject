const dotnev=require('dotenv')
const mongoose=require('mongoose');
const express=require('express');
const app=express();

dotnev.config({path:'./config.env'});
require('./db/conn');
app.use(express.json());
app.use(require('./router/auth'));
// const User=require('./model/userSchema');

const PORT=process.env.PORT;



const middleware =(req,res,next)=> {
    console.log(" hello my middleware");
    next();
}


app.get('/',(req,res)=>{
    res.send(`hello world from the server`)
});
app.get('/about',middleware,(req,res)=>{
    res.send(`hello About world from the server`);
});
app.get('/contact',(req,res)=>{
    res.cookie("test", "Thapa");
    res.send(`hello contact world from the server`);
});
// app.get('/signin',(req,res)=>{
//     res.send(`hello Login world from the server`);
// });
app.get('/signup',(req,res)=>{
    res.send(`hello Registration world from the server`)
});

app.listen(PORT,()=>{
    console.log(`server is running at port no 3000`)
})