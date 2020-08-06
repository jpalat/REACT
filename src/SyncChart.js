import React, { PureComponent } from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Brush,
} from 'recharts';

export default class SyncChart extends PureComponent {
    //static jsfiddleUrl = 'https://jsfiddle.net/alidingling/nskpgcrz/';

    constructor(props) {
        super(props);
        this.data = props.data;
        this.width = document.body.clientWidth*0.9
        this.height = document.body.clientHeight*0.4
    }

    render() {

        return (
            <div>
                <h2> Voltage VS Current</h2>
                <LineChart
                    width={this.width}
                    height={this.height}
                    data={this.data}
                    syncId="anyId"
                    margin={{
                        top: 0, right: 30, left: 0, bottom: 15,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="time" />
                    <YAxis yAxisId="left" domain={[705,706]} orientation="left" label ={{ value: "Voltage", position: "insideTopLeft",dy:10}}/>
                    <YAxis yAxisId="right" domain={[-1,1]} orientation="right" label ={{ value: "Current", position: "insideTopRight", dy:10}}/>
                    <Tooltip />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="voltage" stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line yAxisId="right" type="monotone" dataKey="current" stroke="#82ca9d" activeDot={{ r: 8 }}/>

                </LineChart>
                <h2> SOC / SOHR / SOHC</h2>
                <LineChart
                    width={this.width*0.95}
                    height={this.height}
                    data={this.data}
                    syncId="anyId"
                    margin={{
                        top: 10, right: 30, left: 0, bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis type="number" domain={[0, 100]}/>
                    <Tooltip />
                    <Line type="monotone" dataKey='SOC' stroke="#8884d8" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey='SOHR' stroke="#82ca9d" activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey='SOHC' stroke="#F08080" activeDot={{ r: 8 }} />
                    <Brush />
                </LineChart>
            </div>
        );
    }
}
