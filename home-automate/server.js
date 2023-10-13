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
        const data=await graphformatdata();
        console.log(data)
        res.send(data)
    }catch(err){
        console.error(err)
    }
});

app.get('/updatesensor', async (req, res) => {
    res.send("Recieved Data")
    const {distance}=req.query
    // if (distance!==undefined){
    console.log(`The recieved distance was: ${distance}`)
    await storeValueWithTimestamp(distance)
    //     res.status(200)
    // }else{
    //     res.status(400)
    // }
});


app.listen(port, () => {
    console.log(`App running at ${port}`)
})
