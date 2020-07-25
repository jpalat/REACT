import React, {PureComponent} from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import './dashboardCSS.css'
import ContentPage from "./Content";



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
        let {Header, Content, Footer} = Layout;
        if (isLoading){
            return(
                <div>Please Wait</div>
            )
        }
        else {
            return (
                <div>
                    {/*<Layout>*/}
                        <div><img className="logo" src='/ADAC_logo.jpg' style={{position: 'fixed',zIndex: 10}}/></div>
                        <Content className="site-layout" style={{padding: '0 50px', marginTop: 0}}>
                            <div className="site-layout-background"
                                 style={{top:'50%', left:'50%',position:'absolute',transform:[`translate(-50%,-50%)`]}}>
                                <ContentPage currentData={current} voltageData={voltage} SOCData={SOC} SOHRData={SOHR} SOHCData={SOHC} latest={latestData}/>
                            </div>
                        </Content>
                        {/*<Footer style={{textAlign: 'center'}}>ADAC LAB 2020</Footer>*/}
                    {/*</Layout>*/}
                </div>
            )
        }
    }
}