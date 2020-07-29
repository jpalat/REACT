import React, {PureComponent} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Linechart from "./lineChart";
import TimePicker from "./Picker";
import { Button, Tooltip, Slider } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from "moment"
import ZoomLineChart from "./ZoomLineChart";
import './ChartPaperCSS.css'
import {ResponsiveContainer} from "recharts";


export default function ChartPaper(props) {
    //const classes = useStyles();

    // console.log("In chartPaper: ",props.voltage)
    let data = props.data;
    let showKey = props.showKey;
    console.log("In paper,",data)
    console.log("In paper key", showKey)
    let dateRange = props.range;
    let len = data.length;
    let iniData;
    if (dateRange[0] == 0 && dateRange[1] == 0){
        iniData = data.slice(len-20,len)
    }
    else{
        iniData = data
    }



    let dateLength = data[0]['time'].length

    // const initDataSetup=(d)=>{
    //     let res = []
    //     let arr = d.slice(len-20,len)
    //     for (let i =0;i<arr.length;i++){
    //         let temp = {}
    //         temp['time'] = data[i]['time'].substr(1,dateLength-2).replace(/\s/g,"<br>")
    //         temp[key] = data[i][key]
    //         res.push(temp)
    //     }
    //     console.log("after:",res)
    //     return res
    // }

    // const [range,setRange] = React.useState("1min")
    // const [date,setDate] = React.useState([])
    const [showData,setShowData] = React.useState(iniData)
    const dateFormat = "YYYY-MM-DD HH:mm:ss"



    const getDate=(d)=>{
        console.log("selected range is",d)
        //setDate(d)
        const newData=[]
            // console.log("choose:",date)

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
                        let temp = {}
                        temp['time'] = data[i]['time'].substr(1,dateLength-2).replace(/\s/g,"\n")
                        temp[showKey] = data[i][showKey]
                        newData.push(temp)
                        // newData.push(data[i])
                    }
                    else{
                        flag = true
                    }
                }
            }
            console.log("newData is :",newData)
        setShowData(newData)

    }

    // const getRange=(r)=>{
    //     setRange(r)
    // }


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

    const handleBack=()=>{
        props.callback()
    }

    return (
        <div id='chart'>
                {/*<div>*/}
                {/*    <TimePicker callback={getDate}/>*/}
                {/*</div>*/}
                <ZoomLineChart data={showData} showKey={showKey}/>
            <Button onClick={handleBack}>back</Button>
        </div>
    )
}