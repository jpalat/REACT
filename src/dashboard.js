import React, {PureComponent} from 'react';
import {Layout, Menu, Breadcrumb, Progress} from 'antd';
import './dashboardCSS.css'
import ContentPage from "./Content";
import Grid from "@material-ui/core/Grid";
import VoltageCard from "./Voltage";
import CurrentCard from "./current";
import SOCCard from "./SOC";
import SOHRCard from "./SOHR";
import SOHCCard from "./SOHC";
import Paper from "@material-ui/core/Paper";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';



export default class Dashboard extends PureComponent {

    constructor(props) {
        super(props);
        this.state={
            isLoading:false,
            latestData:{},
            voltage:[],
        }
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
                for(let i = len-6000;i<len;i++){
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
                this.setState({voltage:voltageData, current:currentData, SOC:SOCData, SOHR:SOHRData, SOHC:SOHCData})
                this.setState({isLoading:false})
            })
    }


    render() {
        let {latestData,isLoading,voltage,current,SOC,SOHR,SOHC} = this.state
        if (isLoading){
            return(
                <div>Please Wait</div>
            )
        }
        else {
            let updated = latestData['time'];
            const len = updated.length;
            updated = updated.substr(1,len-2);

            return (
                <div id='content'>
                    {/*<Layout>*/}
                    {/*    <div><img className="logo" src='/ADAC_logo.jpg' style={{position: 'fixed',zIndex: 10}}/></div>*/}
                    {/*    <Content className="site-layout" style={{padding: '0 50px', marginTop: 0}}>*/}
                    {/*        <div className="site-layout-background"*/}
                    {/*             style={{top:'50%', left:'50%',position:'absolute',transform:[`translate(-50%,-50%)`]}}>*/}
                    {/*            <ContentPage currentData={current} voltageData={voltage} SOCData={SOC} SOHRData={SOHR} SOHCData={SOHC} latest={latestData}/>*/}
                    {/*        </div>*/}
                    {/*    </Content>*/}
                        {/*<Footer style={{textAlign: 'center'}}>ADAC LAB 2020</Footer>*/}
                    {/*</Layout>*/}
                    <Grid container spacing={3}>
                        <Grid item lg={12} md={12} xs={12}>

                            {/*<Card bordered={false} >*/}
                            {/*    /!*style={{position:'relative',left:'10%'}}*!/*/}
                            {/*    /!*style={{textAlign:'center',position:'relative',right:'10%'}}*!/*/}
                            {/*    <Grid container spacing={3}>*/}
                            {/*        <Grid id="status" container item lg={6} md={6} xs={9} >*/}
                                        <Progress
                                            type="circle"
                                            strokeColor={{
                                                '0%': '#108ee9',
                                                '100%': '#87d068',
                                            }}
                                            percent={parseFloat(latestData['SOC']).toFixed(2)}
                                        />
                            {/*        </Grid>*/}
                            {/*        <Grid container item lg={6} md={6} xs={9} >*/}
                                        <br></br>
                                        <br></br>
                                        <h3 style={{fontWeight:800,textAlign:'center'}}>Your battery is under good condition</h3>
                                        <h4 style={{textAlign:'center'}}>Updated:{updated}</h4>
                            {/*        </Grid>*/}
                            {/*    </Grid>*/}
                            {/*</Card>*/}
                        </Grid>
                        <Grid className="card" item lg={4} md={8} xs={12}>
                            <VoltageCard  data={voltage} latest={latestData}/>
                        </Grid>
                        <Grid item lg={4} md={8} xs={12}>
                            <CurrentCard  data={current} latest={latestData}/>
                        </Grid>
                        <Grid item lg={4} md={8} xs={12}>
                            <SOCCard  data={SOC} latest={latestData}/>
                        </Grid>
                        <Grid item lg={4} md={8} xs={12}>
                            <SOHRCard  data={SOHR} latest={latestData}/>
                        </Grid>
                        <Grid item lg={4} md={8} xs={12}>
                            <SOHCCard  data={SOHC} latest={latestData}/>
                        </Grid>
                        <Grid item lg={4} md={8} xs={12}>
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
                                        <br></br>
                                        <h3 className="info">
                                            © 2020
                                        </h3>
                                    </div>
                                </Grid>
                                <Grid item lg={3} md={3} xs={3}>
                                    <div>
                                        <div id='pic'>
                                            <a href="https://research.ece.ncsu.edu/adac/" title="Click to visit the offical website"><img id="logo" src='/ADAC_logo.jpg'/></a>
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