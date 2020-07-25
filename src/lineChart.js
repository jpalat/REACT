import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export default class Linechart extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {showData:props.data}
    this.key = props.showKey
  }

  componentWillReceiveProps(nextProps,nextContext){
      this.setState({showData:nextProps.data})
      this.key = nextProps.showKey
  }

  handleClick(){
      console.log('select')
  }

  render() {
      let {showData} = this.state
      console.log("In linechart:",this.data)
      console.log("In linechart key:",this.key)
      let range = [0,100]
      if (this.key=='voltage'){
          range[0] = 705
          range[1] = 706
      }
      else if (this.key == 'current'){
          range[0] = -5
          range[1] = 5
      }
    return (
        <div>
          <LineChart
              width={800}
              height={500}
              data={showData}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis type="number" domain={range}/>
            <Tooltip onClick={this.handleClick.bind(this)}/>
            <Legend />
            <Line type="monotone" dataKey={this.key} stroke="#8884d8" activeDot={{ r: 8 }} />
            {/*<Line type="monotone" dataKey="uv" stroke="#82ca9d" />*/}
          </LineChart>
        </div>

    );
  }
}