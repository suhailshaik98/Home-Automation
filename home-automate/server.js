const express = require('express')
const app = express()
const port = 3000
const { storeValueWithTimestamp } = require('./database');
const {graphformatdata} = require('./graph')
const path = require('path');
app.use(express.static('public'));

const htmlFilePath = path.join(__dirname, '/public');


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
            // console.log(date)
            const year = date.slice(0,4)
            console.log(year)
            const data=await graphformatdata()
            res.send(data)

        }
        // console.log(data)
    }catch(err){
        console.error(err)
    }
});

app.get('/old_graph',async(req,res) => {
    const {data} = req.query
})

app.get('/updatesensor', async (req, res) => {
    res.send("Recieved Data")
    const {distance}=req.query
    console.log(`The recieved distance was: ${distance}`)
    await storeValueWithTimestamp(distance)
})


app.listen(port, () => {
    console.log(`App running at ${port}`)
})
