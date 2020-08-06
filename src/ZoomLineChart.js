import React, { PureComponent } from 'react';
import {
    Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, Legend,
} from 'recharts';
import { Button } from 'antd';
import './ChartPaperCSS.css'
import { CloseOutlined } from '@ant-design/icons';
import DefaultTooltipContent from 'recharts/lib/component/DefaultTooltipContent';

export default class ZoomLineChart extends PureComponent {
    // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nhpemhgs/';

    constructor(props) {
        super(props);
        this.data = props.data
        this.firstData = props.data
        this.initialState = {
            data:props.data,
            refAreaLeft: '',
            refAreaRight: '',
            animation: true,
        };
        this.state = this.initialState;
        this.key = props.showKey;
        this.x_arr = {}
        for (let i = 1; i<props.data.length;i++){
            this.x_arr[props.data[i]['time']] = i
        }
        this.width = 0
        this.height = 0
        if (document.body.clientWidth < 450){
            this.width = document.body.clientWidth
            this.height= document.body.clientHeight*0.6
        }
        else{
            this.width = document.body.clientWidth*0.9
            this.height = document.body.clientHeight*0.4
        }


        console.log("chart",this.initialState['data'])
        console.log("chart key",this.key)
        console.log("chart x_arr", this.x_arr)
    }

    componentWillReceiveProps(nextProps,nextContext){
        let newData = nextProps.data
        this.initialState = {
            data:newData,
            refAreaLeft: '',
            refAreaRight: '',
            animation: true,
        };
        this.setState({
            data:nextProps.data,
            refAreaLeft: '',
            refAreaRight: '',
            animation: true,
        })
        this.key = nextProps.showKey
        let next_arr = {}
        for (let i = 1; i<newData.length;i++){
            next_arr[newData[i]['time']] = i
        }
        this.x_arr = next_arr
        this.data = newData
        console.log("next_arr", this.x_arr)
    }

    zoom() {
        let { refAreaLeft, refAreaRight, data } = this.state;

        if (refAreaLeft === refAreaRight || refAreaRight === '') {
            this.setState(() => ({
                refAreaLeft: '',
                refAreaRight: '',
            }));
            return;
        }

        refAreaLeft = this.x_arr[refAreaLeft]
        refAreaRight = this.x_arr[refAreaRight]

        // xAxis domain
        if (refAreaLeft > refAreaRight) [refAreaLeft, refAreaRight] = [refAreaRight, refAreaLeft];

        this.setState(() => ({
            refAreaLeft: '',
            refAreaRight: '',
            data: this.data.slice(refAreaLeft, refAreaRight + 1)
        }));
    }

    zoomOut() {
        const { data } = this.state;
        this.setState(() => ({
            data: this.initialState['data'],
            refAreaLeft: '',
            refAreaRight: '',
        }));
    }

    back(){
        this.setState(() => ({
            data: this.firstData,
            refAreaLeft: '',
            refAreaRight: '',
        }));
        this.initialState['data'] = this.firstData
    }

    handleAreaLeft(e){
        // try{
        //     this.setState({ refAreaLeft: e.activeLabel })
        // }
        // catch (err) {
        //     console.log(err)
        // }
        this.setState({ refAreaLeft: e.activeLabel })
    }

    handleAreaRight(e){
        // try{
        //     this.setState({ refAreaRight: e.activeLabel })
        // }
        // catch (err) {
        //     console.log(err)
        // }
        this.setState({ refAreaRight: e.activeLabel })
    }

    render() {
        const {
            data, left, right, refAreaLeft, refAreaRight
        } = this.state;

        let range = [0,100]
        if (this.key=='voltage'){
            range[0] = 705
            range[1] = 706
        }
        else if (this.key == 'current'){
            range[0] = -5
            range[1] = 5
        }

        const CustomTooltip = props => {
            // we don't need to check payload[0] as there's a better prop for this purpose
            if (!props.active) {
                // I think returning null works based on this: http://recharts.org/en-US/examples/CustomContentOfTooltip
                return null
            }
            // console.log("payload is",props.payload)
            // mutating props directly is against react's conventions
            // so we create a new payload with the name and value fields set to what we want
            let newPayload = []
            if (props.payload[0].name === 'voltage'){
                newPayload = [
                    ...props.payload,
                    {
                        name: 'SOC',
                        // all your data which created the tooltip is located in the .payload property
                        value: props.payload[0].payload.SOC,
                        // you can also add "unit" here if you need it
                    },
                    {
                        name:'current',
                        value:props.payload[0].payload.current,
                    },
                    {
                        name:'SOHR',
                        value:props.payload[0].payload.SOHR,
                    },
                    {
                        name:'SOHC',
                        value:props.payload[0].payload.SOHC,
                    },

                ];
            }
            if (props.payload[0].name === 'current'){
                newPayload = [
                    ...props.payload,
                    {
                    name:'voltage',
                    value:props.payload[0].payload.voltage,
                    },
                    {
                        name: 'SOC',
                        // all your data which created the tooltip is located in the .payload property
                        value: props.payload[0].payload.SOC,
                        // you can also add "unit" here if you need it
                    },

                    {
                        name:'SOHR',
                        value:props.payload[0].payload.SOHR,
                    },
                    {
                        name:'SOHC',
                        value:props.payload[0].payload.SOHC,
                    },

                ];
            }
            if (props.payload[0].name === 'SOC'){
                newPayload = [
                    ...props.payload,
                    {
                        name: 'voltage',
                        // all your data which created the tooltip is located in the .payload property
                        value: props.payload[0].payload.voltage,
                        // you can also add "unit" here if you need it
                    },
                    {
                        name:'current',
                        value:props.payload[0].payload.current,
                    },
                    {
                        name:'SOHR',
                        value:props.payload[0].payload.SOHR,
                    },
                    {
                        name:'SOHC',
                        value:props.payload[0].payload.SOHC,
                    },

                ];
            }
            if (props.payload[0].name === 'SOHR'){
                newPayload = [
                    ...props.payload,
                    {
                    name:'voltage',
                    value:props.payload[0].payload.voltage,
                    },
                    {
                        name:'current',
                        value:props.payload[0].payload.current,
                    },
                    {
                        name: 'SOC',
                        // all your data which created the tooltip is located in the .payload property
                        value: props.payload[0].payload.SOC,
                        // you can also add "unit" here if you need it
                    },
                    {
                        name:'SOHC',
                        value:props.payload[0].payload.SOHC,
                    },

                ];
            }
            if (props.payload[0].name === 'SOHC'){
                newPayload = [
                    ...props.payload,
                    {
                        name:'voltage',
                        value:props.payload[0].payload.voltage,
                    },
                    {
                        name:'current',
                        value:props.payload[0].payload.current,
                    },
                    {
                        name: 'SOC',
                        // all your data which created the tooltip is located in the .payload property
                        value: props.payload[0].payload.SOC,
                        // you can also add "unit" here if you need it
                    },
                    {
                        name:'SOHR',
                        value:props.payload[0].payload.SOHR,
                    },
                ];
            }
            return <DefaultTooltipContent {...props} payload={newPayload} />;
        };

        if (this.key !== 'all'){
            return (
                <div>

                    {/*<button*/}
                    {/*    // href="javascript: void(0);"*/}
                    {/*    className="btn update"*/}
                    {/*    onClick={this.back.bind(this)}*/}
                    {/*    style={{position:'absolute',left:'90%'}}*/}
                    {/*>*/}
                    {/*    Refresh*/}
                    {/*</button>*/}

                    <LineChart
                        width={this.width}
                        height={this.height}
                        data={data}
                        onMouseDown={e => this.handleAreaLeft(e)}
                        onMouseMove={e => this.state.refAreaLeft && this.handleAreaRight(e)}
                        onMouseUp={this.zoom.bind(this)}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            allowDecimals={false}
                            dataKey="time"
                        />
                        <YAxis type="number" domain={range}/>
                        <Tooltip content={CustomTooltip}/>
                        <Legend />
                        <Line type="monotone" dataKey={this.key} stroke="#8884d8" activeDot={{ r: 8 }} />
                        {
                            (refAreaLeft && refAreaRight) ? (
                                <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
                        }
                    </LineChart>
                    <Button
                        // href="javascript: void(0);"
                        className="btn update"
                        onClick={this.zoomOut.bind(this)}
                        style={{position:'relative'}}
                        icon={<CloseOutlined />}
                    >
                        Zoom Out

                    </Button>
                </div>
            );
        }
        else {
            return(
                <div>
                    <LineChart
                        width={this.width*0.93}
                        height={this.height}
                        data={data}
                        onMouseDown={e => this.handleAreaLeft(e)}
                        onMouseMove={e => this.state.refAreaLeft && this.handleAreaRight(e)}
                        onMouseUp={this.zoom.bind(this)}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                            allowDecimals={false}
                            dataKey="time"
                        />
                        <YAxis type="number" domain={range}/>
                        <Tooltip/>
                        <Legend />
                        <Line type="monotone" dataKey='SOC' stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey='SOHR' stroke="#82ca9d" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey='SOHC' stroke="#F08080" activeDot={{ r: 8 }} />
                        {
                            (refAreaLeft && refAreaRight) ? (
                                <ReferenceArea x1={refAreaLeft} x2={refAreaRight} strokeOpacity={0.3} />) : null
                        }
                    </LineChart>
                    <Button
                        // href="javascript: void(0);"
                        className="btn update"
                        onClick={this.zoomOut.bind(this)}
                        style={{position:'relative'}}
                        icon={<CloseOutlined />}
                    >
                        Zoom Out

                    </Button>
                </div>
            );
        }
    }
}
