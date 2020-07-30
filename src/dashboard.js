import React, {PureComponent} from 'react';
import './dashboardCSS.css'
import Grid from "@material-ui/core/Grid";
import VoltageCard from "./Voltage";
import CurrentCard from "./current";
import SOCCard from "./SOC";
import SOHRCard from "./SOHR";
import SOHCCard from "./SOHC";
import TimePicker from "./Picker";
import {Battery} from 'react-little-icon'
import moment from "moment";
import ChartPaper from "./ChartPaper";



export default class Dashboard extends PureComponent {

    constructor(props) {
        super(props);
        this.state={
            bound:[0,0],
            isLoading:false,
            latestData:{},
            voltage:[],
            current:[],
            SOC:[],
            SOHR:[],
            SOHC:[],
            show:false,
        }
        this.chartData = null;
        this.chartKey = '';
    }

    componentWillMount() {
        this.setState({isLoading: true})
        let temp = {}
        let voltageData=[]
        let currentData=[]
        let SOCData = []
        let SOHRData = []
        let SOHCData = []

        fetch("/BMS_Realtime_output.csv")
            .then(v => v.text())
            .then(data => {
                //console.log(data)

                let lines = data.split("\n")
                let len = lines.length

                this.setState({dataLines:lines})

                // Latest data
                let lastCell = lines[len - 1].split(",")
                console.log(lastCell)
                temp = {
                    time: lastCell[0],
                    voltage: lastCell[1],
                    current: lastCell[2],
                    SOC: lastCell[3],
                    SOHR: lastCell[4],
                    SOHC: lastCell[5],
                }
                console.log(temp)
                this.setState({latestData: temp})

                // Voltage data
                // Default is last 6000 data (pass 5 hours)
                for(let i = 1;i<len;i++){
                    let obj = {}
                    let obj2 = {}
                    let obj3 = {}
                    let obj4 = {}
                    let obj5 = {}

                    let cells = lines[i].split(",")
                    //let l = cells[0].length
                    obj['time']=cells[0]
                    obj['voltage']=parseFloat(cells[1])
                    obj2['time'] = cells[0]
                    obj2['current']=parseFloat(cells[2])
                    obj3['time'] = cells[0]
                    obj3['SOC']=parseFloat(cells[3])
                    obj4['time'] = cells[0]
                    obj4['SOHR']=parseFloat(cells[4])
                    obj5['time'] = cells[0]
                    obj5['SOHC']=parseFloat(cells[5])
                    voltageData.push(obj)
                    currentData.push(obj2)
                    SOCData.push(obj3)
                    SOHRData.push(obj4)
                    SOHCData.push(obj5)
                }
                JSON.stringify(voltageData)
                JSON.stringify(currentData)
                console.log(voltageData)
                this.setState({voltage:voltageData, current:currentData, SOC:SOCData, SOHR:SOHRData, SOHC:SOHCData,bound:[0,0],show:false})
                this.setState({isLoading:false})
            })
    }

    filterData(d,data){
        let newData = []
        let lb = d[0]
        let ub = d[1]
        let flag = false
        const dateFormat = "YYYY-MM-DD HH:mm:ss"
        let dateLength = data[0]['time'].length
        for (let i = 0;i<data.length;i++){
            if (flag == true){
                break
            }
            let m = moment(data[i]['time'].substr(1,dateLength-2),dateFormat)
            if (m.isAfter(lb)){
                if (m.isBefore(ub)) {
                    // let temp = {}
                    // temp['time'] = data[i]['time'].substr(1,dateLength-2).replace(/\s/g,"\n")
                    // temp[key] = data[i][key]
                    // newData.push(temp)
                    newData.push(data[i])
                }
                else{
                    flag = true
                }
            }
        }
        return newData
    }

    getData(d) {
        this.setState({bound:d})
        console.log('d',d)
        let {voltage,current,SOC,SOHR,SOHC} = this.state
        let newVol = this.filterData(d,voltage)
        let newCur = this.filterData(d,current)
        let newSOC = this.filterData(d,SOC)
        let newSOHR = this.filterData(d,SOHR)
        let newSOHC = this.filterData(d,SOHC)
        this.setState({
            voltage:newVol,
            current:newCur,
            SOC:newSOC,
            SOHR:newSOHR,
            SOHC:newSOHC,
        })
        // change latestData (Showing the immediate data at the time selected)
        let latestIndex = newVol.length-1
        let newLatest = {
            time: newVol[latestIndex]['time'],
            voltage: newVol[latestIndex]['voltage'],
            current: newCur[latestIndex]['current'],
            SOC: newSOC[latestIndex]['SOC'],
            SOHR: newSOHR[latestIndex]['SOHR'],
            SOHC: newSOHC[latestIndex]['SOHC'],
        }
        this.setState({latestData: newLatest})
    }

    clickVoltageChart(){
        let {voltage} = this.state
        this.setState({show:true})
        this.chartData = voltage
        this.chartKey = 'voltage'
    }

    clickCurrentChart(){
        let {current} = this.state
        this.setState({show:true})
        this.chartData = current
        this.chartKey = 'current'
    }

    clickSOCChart(){
        let {SOC} = this.state
        this.setState({show:true})
        this.chartData = SOC
        this.chartKey = 'SOC'
    }

    clickSOHRChart(){
        let {SOHR} = this.state
        this.setState({show:true})
        this.chartData = SOHR
        this.chartKey = 'SOHR'
    }

    clickSOHCChart(){
        let {SOHC} = this.state
        this.setState({show:true})
        this.chartData = SOHC
        this.chartKey = 'SOHC'
    }

    handleBack(){
        this.setState({show:false})
    }

    render() {
        let {latestData,isLoading,voltage,current,SOC,SOHR,SOHC,bound,show} = this.state
        console.log("in dashboard,SOC",latestData)
        if (isLoading){
            return(
                <div>Please Wait</div>
            )
        }
        if (show){
            console.log("dashboard show data",this.chartData)
            console.log("dashboard show key",this.chartKey)
            return(
                <ChartPaper callback={this.handleBack.bind(this)} data={this.chartData} showKey={this.chartKey} range={bound}/>
            )
        }
        else {
            let updated = latestData['time'];
            const len = updated.length;
            updated = updated.substr(1,len-2);

            return (
                <div id='content'>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} xs={12}>

                            {/*<Progress*/}
                            {/*    type="circle"*/}
                            {/*    strokeColor={{*/}
                            {/*        '0%': '#108ee9',*/}
                            {/*        '100%': '#87d068',*/}
                            {/*    }}*/}
                            {/*    width={140}*/}
                            {/*    percent={parseFloat(latestData['SOC']).toFixed(2)}*/}
                            {/*/>*/}
                            <Battery
                                size={180}
                                percent={parseFloat(latestData['SOC']).toFixed(2)}
                                color="rgb(46,139,87)"
                            ></Battery>
                            <br></br>
                            <h3 style={{fontWeight:800,textAlign:'center'}}>Your battery is under good condition</h3>
                            <h4 style={{textAlign:'center'}}>Updated:{updated}</h4>
                        </Grid>

                        <Grid item lg={12} md={12} xs={12}>
                            <TimePicker callback={this.getData.bind(this)}></TimePicker>
                        </Grid>

                        <Grid item lg={4} md={4} xs={12}>
                            <VoltageCard callback={this.clickVoltageChart.bind(this)} bound={bound} data={voltage} latest={latestData}/>
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                            <CurrentCard callback={this.clickCurrentChart.bind(this)} bound={bound} data={current} latest={latestData}/>
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                            <SOCCard callback={this.clickSOCChart.bind(this)} bound={bound} data={SOC} latest={latestData}/>
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                            <SOHRCard callback={this.clickSOHRChart.bind(this)} bound={bound} data={SOHR} latest={latestData}/>
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                            <SOHCCard callback={this.clickSOHCChart.bind(this)} bound={bound} data={SOHC} latest={latestData}/>
                        </Grid>
                        <Grid item lg={4} md={4} xs={12}>
                            <Grid id="footer" container spacing={1}>
                                <Grid item lg={9} md={9} xs={9}>
                                    <div >
                                        <h3 className="info">
                                            The Smart Battery Gauge
                                        </h3>
                                        <h3 className="info">
                                            North Carolina State University - ADAC LAB -
                                        </h3>
                                        <br></br>
                                        <h3 className="info">
                                            © 2020
                                        </h3>
                                    </div>
                                </Grid>
                                <Grid item lg={3} md={3} xs={3}>
                                    <div>
                                        <div id='pic'>
                                            <a href="https://research.ece.ncsu.edu/adac/" title="Click to visit the offical website">
                                                <img id="logo" src='/ADAC_logo.jpg'/>
                                            </a>
                                        </div>
                                    </div>
                                </Grid>
                            </Grid>

                        </Grid>
                    </Grid>
                </div>
            )
        }
    }
}