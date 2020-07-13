import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 400,
        height: 300,
    },
    media: {
        height: 140,
    },
});

export default function VoltageCard(props) {
    const classes = useStyles();

    let vol = parseFloat(props.latest['voltage'])
    vol = vol.toFixed(2)
    let time_stamp = props.latest['time']
    let len = time_stamp.length
    time_stamp = time_stamp.substr(1,len-2)

    const handleOnclick = function(){
            props.callback(true) // true to show graph
    }

    return (
        <Card className={classes.root}>
            <CardActionArea onClick={handleOnclick}>
                <CardMedia
                    className={classes.media}
                    image="/voltage.jpg"
                    title="Voltage"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Voltage:{vol}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Latest update:{time_stamp}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                {/*<Button size="medium" color="primary">*/}
                {/*    Learn More*/}
                {/*</Button>*/}
                {/*<Button size="small" color="primary">*/}
                {/*    Learn More*/}
                {/*</Button>*/}
            </CardActions>
        </Card>
    );
}