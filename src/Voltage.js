import React from 'react';
import { Card } from 'antd';
import Typography from '@material-ui/core/Typography';
import history from './History'
import './Card.css'


export default function VoltageCard(props) {

    let vol = parseFloat(props.latest['voltage'])
    vol = vol.toFixed(2)


    const handleOnclick = function(){
        // console.log("in vol,bound", props.bound)
        // history.push({pathname:'/Chart',state:props.data,dataKey:'voltage',range:props.bound})
        props.callback()
    }


    return (
        <Card className="card" onClick={handleOnclick} hoverable bordered>
                <Typography gutterBottom variant="h5" component="h1">
                    Voltage
                </Typography>
                <Typography style={{marginTop:10}} variant="h4" component="h1">
                    {vol} V
                </Typography>
        </Card>
    );
}