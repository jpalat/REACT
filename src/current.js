import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Badge } from 'antd';
import { Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import history from './History'


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

export default function CurrentCard(props) {
    const classes = useStyles();

    let vol = parseFloat(props.latest['current'])
    vol = vol.toFixed(2)
    let time_stamp = props.latest['time']
    let len = time_stamp.length
    time_stamp = time_stamp.substr(1,len-2)
    let amount = props.data.length
    let percentage = 0

    if (props.data[amount-2]['current'] != 0){
        percentage = (props.data[amount-1]['current']-props.data[amount-2]['current'])/props.data[amount-2]['current']
    }

    const handleOnclick = function(){
        history.push({pathname:'/Chart',state:props.data, dataKey:'current'})
    }


    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleOnclick}>
                {/*<CardMedia*/}
                {/*    className={classes.media}*/}
                {/*    image="/voltage.jpg"*/}
                {/*    title="Voltage"*/}
                {/*/>*/}
                <CardContent style={{position:'relative', width:'95%', height:'95%'}}>
                    <Typography style={{marginTop:10}} gutterBottom variant="h5" component="h1">
                        Current {vol}
                    </Typography>
                    {/*<Typography variant="body2" color="textSecondary" component="p">*/}
                    {/*    Updated:{time_stamp}*/}
                    {/*</Typography>*/}
                </CardContent>
                <Statistic
                    className={classes.stat}
                    value={percentage}
                    precision={2}
                    valueStyle={{ fontSize:35, color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                />

            </CardActionArea>
            <CardActions>

            </CardActions>
        </Card>
    );
}