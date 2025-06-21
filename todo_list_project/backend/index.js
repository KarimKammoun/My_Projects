const express =require("express");
const app =express();

app.get("/hello",(req,res) => {
    res.send("hello");
})

app.put("/test",(req,res) => {
    res.send("test")
})

app.get("/home",(req,res) => {
    res.send("home")
})


app.listen(3000)