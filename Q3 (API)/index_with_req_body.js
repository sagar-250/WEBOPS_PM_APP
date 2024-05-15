const express = require('express')
const app=express()
const port=3000
const mess=require("./mess.json")

app.use(express.text())
app.use(express.json())
app.get('/mess',(req,res)=>{res.json(mess)})
app.post('/mess/info',(req,res)=>{
    const body=req.body;//json data type input  by client
    var x=mess
    if(body["type"]!=undefined){
        x=x[body["type"]]
        if(body["order"]!=undefined){
            x=x[body["order"]]
            if(body["day"]!=undefined){
                x=x[body["day"]]
                if(body["time"]!=undefined){
                    x=x[body["time"]]
                }    
            }
        }
    }
    res.json(x)
})

app.post('/mess/food',(req,res)=>{
    const food=req.body//string type input by client
    let L=[]
    var found='F'
    type=["South Veg","South Non-Veg","North Veg", "North Non-Veg"]
    order=["odd","even"]
    day=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    time=["Breakfast","Lunch","Dinner"]
    for(let i=0;i<type.length;i++){
        for(let j=0;j<order.length;j++){
            for(let k=0;k<day.length;k++){
                for(let l=0;l<time.length;l++){
                let food_array=mess[type[i]][order[j]][day[k]][time[l]]
                if(food_array.includes(food))
                L.push(`${type[i]},${order[j]},${day[k]},${time[l]}  `);
                found='T';
            }}}} 
    if(found=='T'){
        res.json({"availibility":L})
    }    

})




app.listen(port,()=>{
    console.log(`appListening at http://localhost:${port}`)
})