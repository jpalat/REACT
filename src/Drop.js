import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import { Select } from 'antd';

export default class Dropdown extends Component{

    constructor(props) {
        super(props);

        this.state={
            range:"1min"
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(value) {
        console.log('selected',value);
        this.setState({range:value})
        this.props.callback(value);
    }

    render(){
        const { Option } = Select;

        return(
            <>
                <Select defaultValue="Pass 1 minute" style={{ width: 150 }} onChange={this.handleChange}>
                    <Option value="1min">Pass 1 minute</Option>
                    <Option value="5min">Pass 5 minutes</Option>
                    <Option value="30min" >
                        Pass 30 minutes
                    </Option>
                    <Option value="1hour">Pass 1 hour</Option>
                    <Option value="12hour">Pass 12 hours</Option>
                    <Option value="1day">Pass 1 day</Option>
                    <Option value="3day">Pass 3 days</Option>
                    <Option value="1week">Pass 1 week</Option>
                </Select>
            </>
        )
    }

}
