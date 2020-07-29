import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card} from 'antd';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Badge } from 'antd';
import { Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import history from './History'
import './Card.css'


const useStyles = makeStyles({
    root: {
        position:'relative',
        width:'100%',
        height:'100%',
        top:'5%',
        left:'5%',
        transform: `translate(-5%,-5%)`,
        // maxWidth: 400,
        // height: 300,
    },
    media: {
        height: 70,
    },
    stat:{
        marginBottom:10,
    }
});

export default function SOCCard(props) {
    const classes = useStyles();

    let vol = parseFloat(props.latest['SOC'])
    vol = vol.toFixed(2)
    let time_stamp = props.latest['time']
    let len = time_stamp.length
    time_stamp = time_stamp.substr(1,len-2)
    let amount = props.data.length
    let percentage = 0

    if (props.data[amount-2]['SOC'] != 0){
        percentage = (props.data[amount-1]['SOC']-props.data[amount-2]['SOC'])/props.data[amount-2]['SOC']
    }

    const handleOnclick = function(){
        history.push({pathname:'/Chart',state:props.data, dataKey:'SOC'})
    }


    return (
        <Card className="card" onClick={handleOnclick} hoverable bordered>
            <Typography gutterBottom variant="h5" component="h1">
                SOC
            </Typography>
            <Typography style={{marginTop:10}} variant="h4" component="h1">
                {vol}
            </Typography>
        </Card>
    );
}