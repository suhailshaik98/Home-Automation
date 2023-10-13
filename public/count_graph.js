// import Chart from 'https://unpkg.com/browse/chart.js@4.4.0/dist/chart.umd.js';
// const { Chart } = require('chart.js');
// import {Chart, registerables} from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.js';

// const { Chart } = require("chart.js");

// Chart.register(registerables); // Or import and register only the parts you need
async function get_graph_data(){
    try {
        const response = await fetch ('http://192.168.1.253:3000/count_graph');
        const data = await response.json()
        var graph_element=document.getElementById('graph_data')
        var chart= new Chart(graph_element,{
            type:'bar',
            data:{
                labels: data.map(row=>row.hour),
                datasets:[
                    {
                        label: 'No. of Times Alarm Triggered per hour',
                        data: data.map(row=>row.count)
                    }
                ]
            }
        })
    }catch (err){
        console.error(err)
    }

}
get_graph_data()