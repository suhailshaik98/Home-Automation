import './App.css';
import {Getdata,Latestactivity} from './components/graph';
import { Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid'
import { ToDo } from './components/ToDo';
import {CalenderAct} from './components/calender'
import { useState } from 'react';
// import Item from '@mui/material/Item'// import Getdata from 'components/graph'
// const {graphdata} = require('./Graph')



function App() {
  const [selectedDate,setSelectedDate] =  useState((new Date()))
  const handleDateChange = (newValue) =>{
    setSelectedDate(newValue)
  }
  return (
    <>
    <h1>Welcome to 84 Minnesota</h1>
    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>


      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Activity Graph
            </Typography>
            <Getdata selectedDate = {selectedDate}/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
              <CalenderAct selectedDate={selectedDate} onDateChange={handleDateChange}/>
              {console.log(selectedDate)}
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Last Observed Activity
            </Typography>
            <Latestactivity/>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={6}>
        <Card>
          <CardContent>
              <ToDo />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </>
  );
}


export default App;
