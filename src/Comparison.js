import React from 'react';
import {Card} from 'antd';
import Typography from '@material-ui/core/Typography';
// import history from './History'
import './Card.css'
import { LineChartOutlined } from '@ant-design/icons';

export default function CompCard(props) {

    const handleOnclick = function(){
        // history.push({pathname:'/Chart',range:props.bound, state:props.data, dataKey:'SOC'})
        props.callback()
    }


    return (
        <Card className="card" onClick={handleOnclick} hoverable bordered>
            <Typography gutterBottom variant="h5" component="h1">
                See Comparison Page
            </Typography>
            <LineChartOutlined style={{fontSize:41}}/>
        </Card>
    );
}