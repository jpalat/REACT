import React from 'react';
import { Row, Col, Slider } from 'antd';
import './contentCSS.css'
import 'antd/dist/antd.css';
import CenteredGrid from "./ContentGrid";
import Linechart from "./lineChart";
import ChartPaper from "./ChartPaper";

function ContentPage(props){

    const [chartOpen,setChartOpen] = React.useState(false)

    const chartOpenCallback = function(t){
        setChartOpen(t)
    }

    const chartCloseCallback = function(){
        setChartOpen(false)
    }

    //console.log("In Content: ",props.latest)
    console.log("In Content: ",props.voltageData)
    return(
        <div>
            {(chartOpen)?(
                <ChartPaper voltage={props.voltageData} callback={chartCloseCallback} />):null}
            <CenteredGrid latest={props.latest} callback={chartOpenCallback} style={{position:'fixed',zIndex:10}}/>

        </div>
    );
}
export default ContentPage;