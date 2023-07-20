const express=require('express');
const app=express();

app.get('/',(req,res)=>{
    res.send(`hello world from the server`)
});
app.get('/about',(req,res)=>{
    res.send(`hello About world from the server`)
});
app.get('/contact',(req,res)=>{
    res.send(`hello contact world from the server`)
});
app.get('/signin',(req,res)=>{
    res.send(`hello Login world from the server`)
});
app.get('/signup',(req,res)=>{
    res.send(`hello Registration world from the server`)
});

app.listen(3000,()=>{
    console.log(`server is running at port no 3000`)
})