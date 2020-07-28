import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import VoltageCard from "./Voltage";
import { Card } from 'antd';
import { Progress, Row, Col } from 'antd';
import CurrentCard from "./current";
import SOCCard from "./SOC";
import SOHRCard from "./SOHR";
import SOHCCard from "./SOHC";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        height:180,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    card:{
        marginLeft:10,
        marginRight:0,
        marginTop:0,
        marginBottom:0,
        height:180,
    }
}));

export default function CenteredGrid(props) {
    const classes = useStyles();

    //console.log("In grid:",props.latest)
    let updated = props.latest['time'];
    const len = updated.length;
    updated = updated.substr(1,len-2);

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={12}>

                    <Card bordered={false} style={{width:'60%',position:'relative',left:'50%',top:'50%',transform:[`translate(-50%,-50%)`]}}>

                        <Grid container spacing={3}>
                            <Grid container item xs={6} style={{position:'relative',left:'10%'}}>
                                <Progress
                                    type="circle"
                                    strokeColor={{
                                        '0%': '#108ee9',
                                        '100%': '#87d068',
                                    }}
                                    percent={90}
                                />
                            </Grid>
                            <Grid container item xs={6} style={{textAlign:'center',position:'relative',right:'10%'}}>
                                <h3 style={{fontWeight:800,textAlign:'center'}}>Your battery is under good condition</h3>
                                <h4 style={{position:'relative',left:'10%', textAlign:'center'}}>Updated:{updated}</h4>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <VoltageCard className={classes.card} data={props.voltage} latest={props.latest}/>
                </Grid>
                <Grid item xs={4}>
                    <CurrentCard className={classes.card} data={props.current} latest={props.latest}/>
                </Grid>
                <Grid item xs={4}>
                    <SOCCard className={classes.card} data={props.SOC} latest={props.latest}/>
                </Grid>
                <Grid item xs={4}>
                    <SOHRCard className={classes.card} data={props.SOHR} latest={props.latest}/>
                </Grid>
                <Grid item xs={4}>
                    <SOHCCard className={classes.card} data={props.SOHC} latest={props.latest}/>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>
                        <br></br>
                        <p3>Visit Our Website For More Information</p3>
                        <p3> research.ece.ncsu.edu/adac/sbg/</p3>
                        <br></br>
                        <br></br>
                        <p3>Email Us: adac_lab@ncsu.edu </p3>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}