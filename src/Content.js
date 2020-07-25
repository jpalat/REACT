import React from 'react';
import { Row, Col, Slider } from 'antd';
import './contentCSS.css'
import 'antd/dist/antd.css';
import CenteredGrid from "./ContentGrid";
import Linechart from "./lineChart";
import ChartPaper from "./ChartPaper";

function ContentPage(props){

    //console.log("In Content: ",props.latest)
    console.log("In Content: ",props.voltageData)
    return(
        <div>
            <CenteredGrid latest={props.latest} current={props.currentData} voltage={props.voltageData} SOC={props.SOCData}
                          SOHR={props.SOHRData} SOHC={props.SOHCData} style={{position:'fixed',zIndex:10}}/>

        </div>
    );
}
export default ContentPage;