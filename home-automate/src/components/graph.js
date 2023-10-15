
import React, {useState,useEffect,PureComponent} from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
// import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { VictoryBar, VictoryChart } from 'victory';


export function Latestactivity(){
        // Graph code
        const [abhidataaayani,abhidataayanikabooleanfxn]=useState(true)
        const [dataaagaya,somestupiddatafxn]=useState([])
        useEffect(()=>{
            abhidataayanikabooleanfxn(true);
            fetch("http://192.168.1.253:3000/latest_activity")
            .then((response)=>{
                return response.json()
            })
            .then((data)=>{
                // return data
                const helper=[]
                console.log(data)
                for (const key in data){
                    const object={
                        timestamp: data[key].timestamp
                    }
                    helper.push(object)
                }
                console.log(helper)
                console.log(helper[0].timestamp)
                abhidataayanikabooleanfxn(false)
                somestupiddatafxn(helper)
            })

        },[])
        if (abhidataaayani){
            return <p>...Loading</p>
        }
        return (
            <p>This latest activity was around {dataaagaya[0].timestamp.slice(11,-8)}</p>
        )
}

export function Getdata({selectedDate}){
    const [isLoading,setIsLoading]=useState(true)
    const [loadeddata,setloadeddata]=useState([])
    console.log(selectedDate)
    useEffect(()=>{
        setIsLoading(true)
        fetch(`http://192.168.1.253:3000/count_graph?date=${selectedDate.toISOString()}`)
        .then((response)=>{
            return response.json()
        })
        .then((data)=>{
            const array=[]
            for (const key in data){
                // console.log(data[key].hour)
                if (data[key].count>600){
                    const graph_obj={
                        hours: data[key].hour.toString(),
                        count: 0
                    }
                    array.push(graph_obj)
                }else{
                    const graph_obj={
                        hours: data[key].hour.toString(),
                        count: data[key].count
                    }
                    array.push(graph_obj)
                }

                
            }
            console.log(array)
            setIsLoading(false);
            setloadeddata(array)
        })

    },[selectedDate])
    
    

    if (isLoading){
        return <p>Loading ...</p>
    }
    const data = {
        labels: loadeddata.map((item) => item.hours),
        datasets: [
          {
            label: `No of times the alarm triggered on ${selectedDate.toString().slice(0,10)}`,
            data: loadeddata.map((item) => item.count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            xLabel: "Time in hours"
          },
        ],
      };
      const options = {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Hours', // X-axis label
            },
          },
          y: {
            title: {
              display: true,
              text: 'Number of Alarm Triggers', // Y-axis label
            },
          },
        },
      };
    return (
        <Bar data={data} options={options}/>
      );
  }



export function Oldgetdata(){
    return <p>Loading...</p>
}

//   export default Getdata;