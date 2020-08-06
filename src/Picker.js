import 'antd/dist/antd.css';
import { DatePicker } from 'antd';
import React, {PureComponent} from "react";

export default class TimePicker extends PureComponent {

    constructor(props) {
        super(props);
        this.data = props.data;
        this.onOk = this.onOk.bind(this)
    }

    onChange(value, dateString) {
        // console.log('Selected Time: ', value);
        // console.log('Formatted Selected Time: ', dateString);
    }

    onOk(value) {
        console.log('onOk: ', value);
        this.props.callback(value);
    }


    render() {
        const { RangePicker } = DatePicker;

        return(
            <RangePicker
                showTime={{ format: 'HH:mm' }}
                format="YYYY-MM-DD HH:mm"
                onChange={this.onChange}
                onOk={this.onOk}
            />
        )

}

}

