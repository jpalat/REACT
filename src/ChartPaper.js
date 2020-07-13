import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Linechart from "./lineChart";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            position:'absolute',
            width: 550,
            height: 350,
            zIndex:100,
            top:'50%',
            left:'50%',
            marginTop:-175,
            marginLeft:-275,
            backgroundColor:'#ffffff',
        },
    },
}));

export default function ChartPaper(props) {
    const classes = useStyles();

    console.log("In chartPaper: ",props.voltage)

    return (
        <div className={classes.root}>
            <Paper>
                <Linechart callback={props.callback} data={props.voltage}/>
            </Paper>
        </div>
    );
}