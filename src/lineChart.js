import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class Linechart extends PureComponent {

  constructor(props) {
    super(props);
    this.data = props.data;
  }


  render() {
    return (
        <div>

          <LineChart
              width={800}
              height={600}
              data={this.data}
              margin={{
                top: 10, right: 20, left: 20, bottom: 5,
              }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis type="number" domain={[705,706]}/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="voltage" stroke="#8884d8" activeDot={{ r: 8 }} />
            {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
          </LineChart>
        </div>

    );
  }
}