import React from 'react';
import {Card} from 'antd';
import Typography from '@material-ui/core/Typography';
import history from './History'
import './Card.css'

export default function SOHRCard(props) {

    let vol = parseFloat(props.latest['SOHR'])
    vol = vol.toFixed(2)

    const handleOnclick = function(){
        history.push({pathname:'/Chart',range:props.bound,state:props.data, dataKey:'SOHR'})
    }


    return (
        <Card className="card" onClick={handleOnclick} hoverable bordered>
            <Typography gutterBottom variant="h5" component="h1">
                SOHR
            </Typography>
            <Typography style={{marginTop:10}} variant="h4" component="h1">
                {vol} %
            </Typography>
        </Card>
    );
}