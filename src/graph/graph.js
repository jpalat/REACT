import React, { Component } from "react";
import moment from "moment";
import { Button, DatePicker, Spin, message, Checkbox, Card } from "antd";
import { SearchOutlined, DownloadOutlined, ReloadOutlined, SwapRightOutlined } from "@ant-design/icons";
import "./graph.css";

import { Connect } from "../data/connect";

const F2 = require("@antv/f2/lib/index");
const ScrollBar = require("@antv/f2/lib/plugin/scroll-bar");
const Legend = require("@antv/f2/lib/plugin/legend");
F2.Chart.plugins.register(ScrollBar);
F2.Chart.plugins.register(Legend);
require("@antv/f2/lib/interaction/");

export default class Graph extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      timeRange: [],
      enabledRange: [],
      allDates: [],
      initialDates: [],
      checkedValues: ["VOLTAGE", "CURRENT"],
      charts: ["VOLTAGE", "CURRENT"],
      loading: true,
      database: new Connect(),
    };
  }

  async componentDidMount() {
    this.state.enabledRange = await this.state.database.getVaildRange();
    this.state.data = await this.state.database.getLatestData(25);

    await this.loadData();
    this.initCharts();
    this.setState({ loading: false });
  }

  loadData = async () => {
    this.state.allDates = [];
    this.state.data.forEach((item) => {
      this.state.allDates.push(item.event_time);
    });

    this.state.timeRange = [moment(this.state.allDates[0]), moment(this.state.allDates.slice(-1)[0])];

    this.state.initialDates = [];
    let dateNum =
      document.body.clientWidth > 450
        ? parseInt(document.body.clientWidth / 80)
        : parseInt(document.body.clientWidth / 50);
    this.state.data.slice(-dateNum).forEach((item) => {
      this.state.initialDates.push(item.event_time);
    });
  };

  initCharts = () => {
    if (this.state.charts.includes("VOLTAGE")) {
      this.initVoltage();
    }
    if (this.state.charts.includes("CURRENT")) {
      this.initCurrent();
    }
    let list = this.state.charts.filter((item) => item !== "VOLTAGE" && item !== "CURRENT");
    if (list.length > 0) {
      this.initMulti(list);
    }
  };

  initVoltage = () => {
    const chart = new F2.Chart({
      id: "VOLTAGE",
      pixelRatio: window.devicePixelRatio,
    });

    chart.source(this.state.data);

    chart.scale("event_time", {
      type: "cat",
      values: this.state.initialDates,
      sortable: false,
      range: [0, 1],
      ticks: this.state.allDates,
    });

    chart.scale("VOLTAGE", {
      range: [0.1, 1],
    });

    chart.axis("event_time", {
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

    chart.guide().tag({
      position: [this.state.data.slice(-1)[0].event_time, this.state.data.slice(-1)[0].VOLTAGE],
      content: "Latest voltage: " + this.state.data.slice(-1)[0].VOLTAGE,
      offsetY: -5,
      direct: "tl",
    });

    chart.line().position("event_time*VOLTAGE");

    chart.point().position("event_time*VOLTAGE").style({
      stroke: "#fff",
      lineWidth: 1,
    });

    chart.interaction("pan", {
      speed: 5,
    });

    chart.scrollBar({
      mode: "x",
      xStyle: {
        offsetY: -5,
      },
    });

    chart.render();
  };
  initCurrent = () => {
    const chart = new F2.Chart({
      id: "CURRENT",
      pixelRatio: window.devicePixelRatio,
    });

    chart.source(this.state.data);

    chart.scale("event_time", {
      type: "cat",
      values: this.state.initialDates,
      sortable: false,
      range: [0, 1],
      ticks: this.state.allDates,
    });

    chart.scale("CURRENT", {
      range: [0.1, 1],
    });

    chart.axis("event_time", {
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

    chart.guide().tag({
      position: [this.state.data.slice(-1)[0].event_time, this.state.data.slice(-1)[0].CURRENT],
      content: "Latest current: " + this.state.data.slice(-1)[0].CURRENT,
      offsetY: -5,
      direct: "tl",
    });

    chart.line().position("event_time*CURRENT");

    chart.point().position("event_time*CURRENT").style({
      stroke: "#fff",
      lineWidth: 1,
    });

    chart.legend({
      position: "top",
    });

    chart.interaction("pan", {
      speed: 5,
    });

    chart.scrollBar({
      mode: "x",
      xStyle: {
        offsetY: -5,
      },
    });

    chart.render();
  };
  initMulti = (list) => {
    let multidata = [];
    for (const item of this.state.data) {
      for (const name of list) {
        multidata.push({
          event_time: item.event_time,
          value: item[name],
          type: name,
        });
      }
    }
    const chart = new F2.Chart({
      id: "multi",
      pixelRatio: window.devicePixelRatio,
    });

    chart.source(multidata);

    chart.scale("event_time", {
      type: "cat",
      values: this.state.initialDates,
      sortable: false,
      range: [0, 1],
      ticks: this.state.allDates,
    });

    chart.scale("value", {
      range: [0.1, 1],
    });

    chart.axis("event_time", {
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

    chart.legend({
      position: "top",
      itemWidth: null,
      align: "center",
    });

    chart.tooltip({
      custom: false,
      showXTip: true,
      snap: true,
      triggerOn: "click",
      triggerOff: "touchend",
      showCrosshairs: true,
      crosshairsType: "xy",
      crosshairsStyle: {
        lineDash: [2],
      },
    });

    chart.line().position("event_time*value").color("type");

    chart.point().position("event_time*value").color("type").style({ lineWidth: 1 });

    chart.interaction("pan", { speed: 5 });

    chart.scrollBar({
      mode: "x",
      xStyle: {
        offsetY: -5,
      },
    });

    chart.render();
  };

  disabledStart = (current) => {
    return current < moment(this.state.enabledRange[0]) || current > moment(this.state.enabledRange[1]).add(1, "days");
  };

  disabledEnd = (current) => {
    let start = moment(this.state.enabledRange[0]);
    if (start.isBefore(this.state.timeRange[0])) {
      start = this.state.timeRange[0];
    }
    return current < start || current > moment(this.state.enabledRange[1]).add(1, "days");
  };

  onStartChange = (date) => {
    this.setState({ timeRange: [date] });
  };

  onEndChange = (date) => {
    this.setState({ timeRange: [this.state.timeRange[0], date] });
  };

  onSearch = async () => {
    this.setState({ loading: true });

    let start = this.state.timeRange[0].format("YYYY-MM-DD HH:mm:ss"),
      end = this.state.timeRange[1].format("YYYY-MM-DD HH:mm:ss");

    if (typeof start !== "string" || typeof end !== "string" || moment(start).isAfter(moment(end))) {
      message.error("Invaild range");
      this.setState({ loading: false });
      return;
    }

    if (moment(start).isBefore(this.state.enabledRange[0])) {
      start = this.state.enabledRange[0];
    }
    if (moment(end).isAfter(this.state.enabledRange[1])) {
      end = this.state.enabledRange[1];
    }

    let res = await this.state.database.getRangeData(start, end);
    if (res.length < 1) {
      message.error("No data available");
      this.setState({ loading: false });
      return;
    }
    this.setState({ data: res, charts: this.state.checkedValues });

    await this.loadData();
    this.initCharts();
    this.setState({ loading: false });
  };

  refresh = async () => {
    this.setState({
      data: [],
      timeRange: [],
      enabledRange: [],
      allDates: [],
      initialDates: [],
      checkedValues: ["VOLTAGE", "CURRENT"],
      charts: ["VOLTAGE", "CURRENT"],
      loading: true,
    });

    this.setState({
      data: await this.state.database.getLatestData(25),
      enabledRange: await this.state.database.getVaildRange(),
    });

    await this.loadData();
    this.initCharts();
    this.setState({ loading: false });
  };

  download = () => {
    if (this.state.data.length > 0) {
      let blob = new Blob([JSON.stringify(this.state.data)], { type: "application/json;charset=utf-8" });
      let startTime = this.state.data[0].event_time;
      let endTime = this.state.data.slice(-1)[0].event_time;
      
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = "sbg-" + startTime + "-" + endTime + ".json";
      link.click();
      window.URL.revokeObjectURL(link.href);
    }
  };

  onCheckChange = (checkedValues) => {
    this.setState({ checkedValues });
  };

  render() {
    let voltageCanvas, currentCanvas, multiCanvas;
    if (this.state.charts.includes("VOLTAGE")) {
      voltageCanvas = <canvas id="VOLTAGE"></canvas>;
    }
    if (this.state.charts.includes("CURRENT")) {
      currentCanvas = <canvas id="CURRENT"></canvas>;
    }
    let list = this.state.charts.filter((item) => item !== "VOLTAGE" && item !== "CURRENT");
    if (list.length > 0) {
      multiCanvas = <canvas id="multi"></canvas>;
    }

    return (
      <>
        <Spin spinning={this.state.loading} tip="Loading...">
          <div id="graphList">
            <Card size="small" title="Control Panel" id="card">
              <div id="panelList">
                <Checkbox.Group defaultValue={this.state.checkedValues} onChange={this.onCheckChange}>
                  <div id="checkList">
                    <span>
                      <Checkbox value="VOLTAGE">Voltage</Checkbox>
                      <Checkbox value="CURRENT">Current</Checkbox>
                      <Checkbox value="estSOC">State of charge</Checkbox>
                    </span>
                    <span>
                      <Checkbox value="estSOH_R">State of health (resistance measurement)</Checkbox>
                    </span>
                    <span>
                      <Checkbox value="estSOH_C">State of health (capacity measurement)</Checkbox>
                    </span>
                  </div>
                </Checkbox.Group>

                <span id="pickers">
                  <DatePicker
                    showTime
                    showNow={false}
                    allowClear={false}
                    inputReadOnly={true}
                    placeholder="Start time"
                    disabledDate={this.disabledStart}
                    onOk={this.onStartChange}
                    value={this.state.timeRange[0]}
                  />
                  <SwapRightOutlined id="rightLogo" />
                  <DatePicker
                    showTime
                    showNow={false}
                    allowClear={false}
                    inputReadOnly={true}
                    placeholder="End time"
                    disabledDate={this.disabledEnd}
                    onOk={this.onEndChange}
                    disabled={this.state.timeRange.length < 1}
                    value={this.state.timeRange[1]}
                  />
                </span>

                <div id="buttonList">
                  <Button type="link" onClick={this.download} icon={<DownloadOutlined />}>
                    Data
                  </Button>
                  <Button type="link" onClick={this.refresh} icon={<ReloadOutlined />}>
                    Reload
                  </Button>
                  <Button type="link" onClick={this.onSearch} icon={<SearchOutlined />}>
                    Search
                  </Button>
                </div>
              </div>
            </Card>

            <div id="canvasList">
              {voltageCanvas}
              {currentCanvas}
              {multiCanvas}
            </div>
          </div>
        </Spin>
      </>
    );
  }
}
