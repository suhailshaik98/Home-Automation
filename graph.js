const MongoClient=require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'; // Replace with your MongoDB server URL
const dbname='distancesensor'

async function graphformatdata(){
    try{
        const client = await MongoClient.connect(url,{});
        console.log('Connected successfully to server');
        const db=client.db(dbname);
        // Get present time
        const now_time= new Date();
        now_time.setUTCHours(now_time.getUTCHours() -4);

        const today= new Date();
        today.setHours(0, 0, 0, 0);

        const minValueAsString="180"

        const minValue = parseFloat(minValueAsString);

        const result= await db.collection('sensorvalues').find({
            timestamp: {
                $gte: today, $lte: now_time
            }
        });
        const array = await result.toArray();
        // console.log(array)
        await client.close();


        // Manipulate the data using this array
        const hours_data={}
        for (const document of array){
            const time=document.timestamp
            const get_hours=time.getUTCHours()
            // console.log(get_hours)
            if (parseInt(document.value)<180){
                if (hours_data[get_hours]){
                    hours_data[get_hours]++
                }else{
                    hours_data[get_hours]=1
                }
            }


        }
        // console.log(hours_data)
        const graph_data=[]
        for (let hr=0; hr<24 ; hr++){
            graph_data.push({
                hour:hr,
                count: hours_data[hr.toString()] || 0
            })
        }
        return graph_data
        // console.log(graph_data)

    }catch(err){
        console.error('Error ',err);
    }
}

async function getlatestactivity(){
    
    try{
        const client = await MongoClient.connect(url,{})
        console.log("Connected successfully to server")
        const db=client.db(dbname);
        const result = await db.collection('sensorvalues').find().sort({['timestamp']:-1}).limit(1).toArray()
        console.log(result)
        await client.close()
        return result
        
    }catch(err){
        console.error(err)
    }
}

async function old_graph_data(date){
    try{
        const client = await MongoClient.connect(url,{})
        console.log("Connected to database")
        const db = client.db(dbname)
        const [year, month, day] = date
        const get_date = new Date(year, month - 1, day)
        const end_day = new Date (year, month - 1 ,day)
        get_date.setHours(0, 0, 0, 0)
        end_day.setHours(23, 59, 59, 0)

        console.log(end_day)

        const result = await db.collection('sensorvalues').find(
           {
            timestamp : {
                $gte: get_date,
                $lte: end_day
            }
           } 
        )

        const answer =  await result.toArray()
        // console.log(answer)
        await client.close()
        const hours_data={}
        for (const document of answer){
            const time=document.timestamp
            const get_hours=time.getUTCHours()
            // console.log(get_hours)

            if (hours_data[get_hours]){
                hours_data[get_hours]++
            }else{
                hours_data[get_hours]=1
            }
        }
        // console.log(hours_data)
        const graph_data=[]
        for (let hr=0; hr<24 ; hr++){
            graph_data.push({
                hour:hr,
                count: hours_data[hr.toString()] || 0
            })
        }
        console.log(graph_data)        

        return graph_data
    } catch (err) {
        console.error(err)
    }
}

async function suspicious_act(){
    try{
        const client = await MongoClient.connect(url,{})
        const db = client.db(dbname)
        const result = await db.collection('suspicious_activity').find().sort({['timestamp']:-1}).limit(1).toArray()
        console.log(result)
        await client.close()
        return result
    }catch(error){
        console.error(error)
    }
}
  
module.exports={suspicious_act,graphformatdata, getlatestactivity, old_graph_data}  

// getlatestactivity()
// old_graph_data([2023,9,12])