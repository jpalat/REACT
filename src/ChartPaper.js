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
            width: 850,
            height: 650,
            zIndex:100,
            top:'50%',
            left:'50%',
            marginTop:-325,
            marginLeft:-425,
            backgroundColor:'#ffffff',
        },
    },
}));

export default function ChartPaper(props) {
    const classes = useStyles();

    // console.log("In chartPaper: ",props.voltage)
    let data = props.location.state;

    return (
        <div className={classes.root}>
            <Paper>
                <Linechart callback={props.callback} data={data}/>
                {/*<h1>Hello World</h1>*/}
            </Paper>
        </div>
    );
}