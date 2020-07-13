import React from 'react';
import { Row, Col, Slider } from 'antd';
import './contentCSS.css'
import 'antd/dist/antd.css';
import CenteredGrid from "./ContentGrid";

function ContentPage(props){

    const [chartOpen,setChartOpen] = React.useState(false)

    const chartOpenCallback = function(t){
        setChartOpen(t)
    }

    console.log("In Content: ",props.latest)
    return(
        <div>
            <CenteredGrid latest={props.latest} callback={chartOpenCallback}/>
            {(chartOpen)?(null):null}
        </div>
    );
}
export default ContentPage;