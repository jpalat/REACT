import React, {PureComponent} from "react";

const F2 = require("@antv/f2/lib/index");
const ScrollBar = require("@antv/f2/lib/plugin/scroll-bar");
F2.Chart.plugins.register(ScrollBar);
require("@antv/f2/lib/interaction/");

export default class MobileChart extends PureComponent{

    constructor(props) {
        super(props);
        this.data = props.data;
        this.key = props.showKey;
        this.width = document.body.clientWidth*0.9
        this.height = this.width*0.7
        this.str = "time*"+this.key
    }

    componentDidMount() {
        this.chart()
    }


    chart=()=>{
        const chart = new F2.Chart({
            id: 'myChart',
            pixelRatio: window.devicePixelRatio
        });
        chart.source(this.data);

        const initData = [];
        for (let i = this.data.length-15; i< this.data.length; i++){
            initData.push(this.data[i]['time'])
        }

        const allDates = [];
        this.data.forEach((item) => {
            allDates.push(item['time']);
        });

        chart.scale("time", {
            type: "cat",
            values: initData,
            sortable: false,
            range: [0, 1],
            tick:allDates,
        });

        chart.axis("time", {
            label: (text) => {
                const cfg = {
                    rotate: -Math.PI / 4,
                    textAlign: "end",
                    textBaseline: "middle",
                };
                let item = text.split("-");
                cfg.text = item[1] + "-" + item[2];
                return cfg;
            },
        });

        chart.tooltip({
            custom: true,
            showXTip: true,
            showYTip: true,
            snap: true,
            triggerOn: "click",
            triggerOff: "touchend",
            showCrosshairs: true,
            crosshairsType: "xy",
            crosshairsStyle: {
                lineDash: [2],
            },
        });

        chart.line().position(this.str);
        chart.point().position(this.str).style({
            lineWidth: 1,
            stroke: '#fff'
        });

        chart.interaction('pan');
        // 定义进度条
        chart.scrollBar({
            mode: 'x',
            xStyle: {
                offsetY: -5
            }
        });
        chart.render();
    }

    render() {
        return(
            <div>
                    <canvas id="myChart" style={{ height: "60vh", width: "95vw" }}></canvas>
            </div>
        );
    }
}