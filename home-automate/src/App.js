import './App.css';
import {Getdata,Latestactivity} from './components/graph';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, CardContent, Typography } from '@mui/material';
import CardBody from 'react-bootstrap/esm/CardBody';
import Grid from '@mui/material/Grid'
// import Item from '@mui/material/Item'// import Getdata from 'components/graph'
// const {graphdata} = require('./Graph')



function App() {
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
            <Getdata/>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card>
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Card 3
            </Typography>
          </CardContent>
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
            <Typography variant="body2" color="text.secondary">
              Card 4
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    </>
  );
}


export default App;
