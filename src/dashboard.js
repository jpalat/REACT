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
                    let cells = lines[i].split(",")
                    //let l = cells[0].length
                    obj['time']=cells[0]
                        //.substr(12,l-13)
                    obj['voltage']=parseFloat(cells[1])
                    voltageData.push(obj)
                }
                JSON.stringify(voltageData)
                console.log(voltageData)
                this.setState({voltage:voltageData})
                this.setState({isLoading:false})
            })
    }


    render() {
        let {latestData,isLoading,voltage} = this.state
        let {Header, Content, Footer} = Layout;
        if (isLoading){
            return(
                <div>Please Wait</div>
            )
        }
        else {
            return (
                <div>
                    <Layout>
                        <div><img className="logo" src='/ADAC_logo.jpg' style={{position: 'fixed', zIndex: 10}}/></div>
                        <Content className="site-layout" style={{padding: '0 50px', marginTop: 0}}>
                            <div className="site-layout-background"
                                 style={{padding: 24, minHeight: 700, marginTop: 20, marginLeft: 60}}>
                                <ContentPage voltageData={voltage} latest={latestData}/>
                            </div>
                        </Content>
                        <Footer style={{textAlign: 'center'}}>ADAC LAB 2020</Footer>
                    </Layout>
                </div>
            )
        }
    }
}
