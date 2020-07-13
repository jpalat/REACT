import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import VoltageCard from "./Voltage";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        height:300,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card:{
        marginLeft:10,
        marginRight:0,
        marginTop:0,
        marginBottom:0,
    }
}));

export default function CenteredGrid(props) {
    const classes = useStyles();

    //console.log("In grid:",props.latest)

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>

                <Grid item xs={4}>
                    <VoltageCard className={classes.card} latest={props.latest} callback={props.callback}/>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=6</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>xs=3</Paper>
                </Grid>
                <Grid item xs={2}>

                </Grid>
                <Grid item xs={2}>
                    <Paper className={classes.paper}>Click to See All 5 Charts</Paper>
                </Grid>

            </Grid>
        </div>
    );
}