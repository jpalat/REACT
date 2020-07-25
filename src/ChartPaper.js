import React, {PureComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Linechart from "./lineChart";
import TimePicker from "./Picker";
import Dropdown from "./Drop";
import { Button, Tooltip, Slider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from "moment"


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
    button:{
        marginLeft:10
    },
}));

export default function ChartPaper(props) {
    const classes = useStyles();

    // console.log("In chartPaper: ",props.voltage)
    let data = props.location.state;
    let len = data.length;
    let iniData = data.slice(len-20,len)
    let key = props.location.dataKey

    const [range,setRange] = React.useState("1min")
    const [date,setDate] = React.useState([])
    const [showData,setShowData] = React.useState(iniData)
    const dateFormat = "YYYY-MM-DD HH:mm:ss"

    const getDate=(d)=>{
        console.log("selected range is",d)
        //setDate(d)
        const newData=[]
            // console.log("choose:",date)
            let dateLength = data[0]['time'].length

            // console.log("lb",lb)

            //console.log(data)
            // let lb = date.subtract(1,'minutes').toDate();
            // let ub = date.add(1,'minutes').toDate()
            let lb = d[0]
            let ub = d[1]
            let flag = false
            for (let i = 0;i<len;i++){
                if (flag == true){
                    break
                }
                let m = moment(data[i]['time'].substr(1,dateLength-2),dateFormat)
                // console.log(m)
                // console.log("lb",lb)
                // console.log(m.isAfter(lb))
                // console.log("ub",ub)
                // console.log(m.isBefore(ub))
                if (m.isAfter(lb)){
                    if (m.isBefore(ub)) {
                        newData.push(data[i])
                    }
                    else{
                        flag = true
                    }
                }
            }
            console.log("newData is :",newData)
        setShowData(newData)

    }

    const getRange=(r)=>{
        setRange(r)
    }


    const onclick=()=>{
        // const newData=[]
        // if (date == []){
        //     if (range == "5min"){
        //         for (let i = len-100; i<len;i++){
        //             newData.push(data[i])
        //         }
        //     }
        // }
        // else {
        //     // console.log("choose:",date)
        //     let dateLength = data[0]['time'].length
        //
        //     // console.log("lb",lb)
        //
        //     //console.log(data)
        //     // let lb = date.subtract(1,'minutes').toDate();
        //     // let ub = date.add(1,'minutes').toDate()
        //     let lb = date[0]
        //     let ub = date[1]
        //     let flag = false
        //     for (let i = 0;i<len;i++){
        //         if (flag == true){
        //             break
        //         }
        //         let m = moment(data[i]['time'].substr(1,dateLength-2),dateFormat)
        //         // console.log(m)
        //         // console.log("lb",lb)
        //         // console.log(m.isAfter(lb))
        //         // console.log("ub",ub)
        //         // console.log(m.isBefore(ub))
        //         if (m.isAfter(lb)){
        //             if (m.isBefore(ub)) {
        //                 newData.push(data[i])
        //             }
        //             else{
        //                 flag = true
        //             }
        //         }
        //     }
        // console.log("newData is :",newData)
        // }
        // setShowData(newData)
    }

    return (
        <div className={classes.root}>
            <Paper>
                <div>
                    <TimePicker callback={getDate}/>
                    {/*<Dropdown callback={getRange}/>*/}
                    {/*<Tooltip title="search" className={classes.button}>*/}
                    {/*    <Button type="primary" shape="circle" onClick={onclick} icon={<SearchOutlined/>}/>*/}
                    {/*</Tooltip>*/}
                </div>
                <br></br>
                <Linechart style={{position:'relative',left:'5%',top:'10%',transform:[`translate(-5%,-10%)`]}} data={showData} showKey={key}/>
                {/*<Slider range defaultValue={[0, 24]} max={24} min={0} step={0.5} style={{position:'relative',width:'60%',left:'20%'}}/>*/}
            </Paper>

        </div>
    )
}