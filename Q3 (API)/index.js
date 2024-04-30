const express = require('express')
const app=express()
const port=3000
const mess=require("./mess.json")

app.get('/api/mess',(req,res)=>{
    res.send(res.json(mess))
})
app.get('/api/mess/:type',(req,res)=>{
    const type=req.params.type;
    res.send(res.json(mess[type]))
})
app.get('/api/mess/:type/:order',(req,res)=>{
    const type=req.params.type;
    const order=req.params.order;
    res.send(res.json(mess[type][order]))
})
app.get('/api/mess/:type/:order/:day',(req,res)=>{
    const type=req.params.type;
    const order=req.params.order;
    const day=req.params.day;
    res.send(res.json(mess[type][order][day]))
})
app.get('/api/mess/:type/:order/:day/:time',(req,res)=>{
    const type=req.params.type;
    const time=req.params.time;
    const order=req.params.order;
    const day=req.params.day;
    res.send(res.json(mess[type][order][day][time]))
})
app.get('/api/mess/:type/:order/:day/:time/:food',(req,res)=>{
    const type=req.params.type;
    const food=req.params.food;
    const order=req.params.order;
    const time=req.params.time;
    const day=req.params.day;
    const food_array=mess[type][order][day][time]
    if(food_array.includes(food))
        res.send(res.json("its there"));
    else{
        res.send(res.json("not found"))
    }

})
app.get('/about',(req,res)=>{
   // res.send('about')
//res.sendfile(path.join(__dirname,'index.html'))   
res.json({"harry":19})
})

app.listen(port,()=>{
    console.log(`appListening at http://localhost:${port}`)
})