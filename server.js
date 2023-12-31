const express = require('express')
const app = express()
const port = 3000
const {storeValueWithTimestamp } = require('./database');
const {graphformatdata, getlatestactivity, old_graph_data} = require('./graph')
const {parseDatetimeAndRunPython} =  require('./node_ml_algo')
const path = require('path');
var cors = require("cors");
app.use(express.static('public'));

const htmlFilePath = path.join(__dirname, '/public');
app.use(cors());

app.get('/', (req, res) => {
    // Use path.join to construct the absolute path to your HTML file
    const main_page=path.join(htmlFilePath,"index.html")
    // Send the HTML file as a response
    res.sendFile(main_page);
});

app.get('/count_graph', async (req, res) => {
    try{
        const {date} = req.query
        if (date == null){
            const data=await graphformatdata();
            res.send(data)
        }else{
            console.log(date)
            const year = date.slice(0,4)
            const month = date.slice(5,7)
            const day =  date.slice(8,10)
            console.log("This is the year " , year)
            console.log("This is the month ",month)
            console.log("This is the day ",day)
            const data=await old_graph_data([year,month,day])
            res.send(data)
        }
        // console.log(data)
        
    }catch(err){
        console.error(err)
    }
});

app.get('/latest_activity',async(req,res)=>{
    try{
        const data=await getlatestactivity();
        // console.log(data)
        res.send(data)
    }catch(err){
        console.error(err)
    }
})

app.get('/updatesensor', async (req, res) => {
    res.send("Recieved Data")
    const {distance}=req.query
    console.log(`The recieved distance was: ${distance}`)
    await storeValueWithTimestamp(distance)
    await parseDatetimeAndRunPython(distance)
});


app.listen(port, () => {
    console.log(`App running at ${port}`)
})
