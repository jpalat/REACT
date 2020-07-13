import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';

export default class Linechart extends PureComponent {

  constructor(props) {
    super(props);
    this.data = props.data;
  }

  handleBack=()=>{
      console.log("closed")
      this.props.callback();
  }

  render() {
    return (
        <div>
            <div style={{textAlign:'left'}}>
                <IconButton aria-label="back" >
                    <ArrowBackIcon onClick={this.handleBack}/>
                </IconButton>
            </div>

          <LineChart
              width={500}
              height={300}
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