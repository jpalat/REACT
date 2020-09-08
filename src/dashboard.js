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
import CompCard from "./Comparison";
//import {run} from "./GoogleGet"

export default class Dashboard extends PureComponent {

    constructor(props) {
        super(props);
        this.state={
            bound:[0,0],
            isLoading:false,
            latestData:{},
            voltage:[],
            data:[],
            show:false,
        }
        this.chartData = null;
        this.chartKey = '';
        this.lastUpdate = '';
    }

    componentWillMount() {
        this.setState({isLoading: true})
        let temp = {}
        let tempData=[]

        // fetch("/BMS_Realtime_output.csv")
        //         .then(v => v.text())
        //         .then(data => {
        //         //console.log(data)

        fetch("https://api.smart-battery-gauge.xyz/init")
            .then(v => v.json())
            .then(data => {

                console.log("data is",data)
                data = data.data

                // let lines = data.split("\n")
                let len = data.length

                // Latest data
                let lastCell = data[len - 1]
                temp = {
                    time: lastCell['time'],
                    voltage: lastCell['voltage'],
                    current: lastCell['current'],
                    SOC: lastCell['SOC'],
                    SOHR: lastCell['SOHR'],
                    SOHC: lastCell['SOHC'],
                }
                console.log("temp is",temp)
                this.lastUpdate = lastCell['time']
                this.setState({latestData: temp})

                // Voltage data
                for(let i = 0;i<len;i++){
                    let obj = {}

                    let cells = data[i]
                    obj['time']=cells['time']
                    obj['voltage']=parseFloat(cells['voltage']).toFixed(2)
                    obj['current']=parseFloat(cells['current']).toFixed(2)
                    obj['SOC']=parseFloat(cells['SOC']).toFixed(2)
                    obj['SOHR']=parseFloat(cells['SOHR']).toFixed(2)
                    obj['SOHC']=parseFloat(cells['SOHC']).toFixed(2)
                    tempData.push(obj)
                }
                JSON.stringify(tempData)
                // JSON.stringify(currentData)
                console.log("temp data is ",tempData)
                //this.setState({voltage:voltageData, current:currentData, SOC:SOCData, SOHR:SOHRData, SOHC:SOHCData,bound:[0,0],show:false})
                this.setState({data:tempData})
                this.setState({isLoading:false})
                setInterval(this.handleNewData.bind(this), 15000)
            })
    }

    handleNewData(){
        let url = "https://api.smart-battery-gauge.xyz/update?time="+this.lastUpdate.replace(/\s+/g,"-").replace(/:/g,"-");
        let temp = {}
        let pastData = this.state.data
        let newData = []



        console.log("url is",url)
        fetch(url)
            .then(response=>response.json())
            .then(data => {
                data = data.data
                if (data.length === 0){
                    return;
                }

                for (let i = 0; i < pastData.length; i++){
                    let t = {
                        time: pastData[i]['time'],
                        voltage: pastData[i]['voltage'],
                        current: pastData[i]['current'],
                        SOC: pastData[i]['SOC'],
                        SOHR: pastData[i]['SOHR'],
                        SOHC: pastData[i]['SOHC'],
                    }
                    newData.push(t)
                }

                // let lines = data.split("\n")
                let len = data.length

                // Latest data
                let lastCell = data[len - 1]
                console.log("last cell is,",lastCell)
                temp = {
                    time: lastCell['time'],
                    voltage: lastCell['voltage'],
                    current: lastCell['current'],
                    SOC: lastCell['SOC'],
                    SOHR: lastCell['SOHR'],
                    SOHC: lastCell['SOHC'],
                }
                console.log("temp is",temp)
                this.lastUpdate = lastCell['time']
                this.setState({latestData: temp})

                // Append data
                for(let i = 0;i<len;i++){
                    let obj = {}

                    let cells = data[i]
                    obj['time']=cells['time']
                    obj['voltage']=parseFloat(cells['voltage']).toFixed(2)
                    obj['current']=parseFloat(cells['current']).toFixed(2)
                    obj['SOC']=parseFloat(cells['SOC']).toFixed(2)
                    obj['SOHR']=parseFloat(cells['SOHR']).toFixed(2)
                    obj['SOHC']=parseFloat(cells['SOHC']).toFixed(2)
                    newData.push(obj)
                }
                JSON.stringify(newData)
                // JSON.stringify(currentData)
                console.log("temp data is ",newData)
                //this.setState({voltage:voltageData, current:currentData, SOC:SOCData, SOHR:SOHRData, SOHC:SOHCData,bound:[0,0],show:false})
                this.setState({data:newData})
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
        // let {voltage,current,SOC,SOHR,SOHC} = this.state
        // let newVol = this.filterData(d,voltage)
        // let newCur = this.filterData(d,current)
        // let newSOC = this.filterData(d,SOC)
        // let newSOHR = this.filterData(d,SOHR)
        // let newSOHC = this.filterData(d,SOHC)
        let {data} = this.state
        let newData = this.filterData(d,data)
        this.setState({
            data:newData
        })
        // change latestData (Showing the immediate data at the time selected)
        let latestIndex = newData.length-1
        let newLatest = {
            time: newData[latestIndex]['time'],
            voltage: newData[latestIndex]['voltage'],
            current: newData[latestIndex]['current'],
            SOC: newData[latestIndex]['SOC'],
            SOHR: newData[latestIndex]['SOHR'],
            SOHC: newData[latestIndex]['SOHC'],
        }
        this.setState({latestData: newLatest})
    }

    clickVoltageChart(){
        let {data} = this.state
        this.setState({show:true})
        this.chartData = data
        this.chartKey = 'voltage'
    }

    clickCurrentChart(){
        let {data} = this.state
        this.setState({show:true})
        this.chartData = data
        this.chartKey = 'current'
    }

    clickSOCChart(){
        let {data} = this.state
        this.setState({show:true})
        this.chartData = data
        this.chartKey = 'SOC'
    }

    clickSOHRChart(){
        let {data} = this.state
        this.setState({show:true})
        this.chartData = data
        this.chartKey = 'SOHR'
    }

    clickSOHCChart(){
        let {data} = this.state
        this.setState({show:true})
        this.chartData = data
        this.chartKey = 'SOHC'
    }

    handleBack(){
        this.setState({show:false})
    }

    clickSeeAllChart(){
        let {data} = this.state
        this.setState({show:true})
        this.chartData = data
        this.chartKey = 'all'
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

            if (bound[0]!==0 && bound[1]!==0){
                updated = bound[0].format("YYYY-MM-DD HH:mm:ss")+' to '+bound[1].format("YYYY-MM-DD HH:mm:ss")
            }
            else{
                let temp = 'Updated: '+updated
                updated = temp
            }

            return (
                <div id='content'>
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} xs={12}>
                            <Battery
                                size={180}
                                percent={parseFloat(latestData['SOC']).toFixed(2)}
                                color="rgb(46,139,87)"
                            ></Battery>
                            <h3 style={{fontWeight:800,textAlign:'center'}}>Your battery is under good condition</h3>
                            <h3 style={{textAlign:'center'}}>{updated}</h3>
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
                            <CompCard callback={this.clickSeeAllChart.bind(this)} />
                        </Grid>
                        <Grid item lg={12} md={12} xs={12}>
                            <Grid id="footer" container spacing={1}>
                                <Grid item lg={9} md={9} xs={9}>
                                    <div >
                                        <h3 className="info">
                                            The Smart Battery Gauge
                                        </h3>
                                        <h3 className="info">
                                            North Carolina State University - ADAC LAB -
                                        </h3>
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
