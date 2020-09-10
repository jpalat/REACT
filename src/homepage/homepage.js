import React, { Component } from "react";
import { Result, Row, Col, Statistic, Spin } from "antd";
import { FundTwoTone } from "@ant-design/icons";
import Icon from "@ant-design/icons";
import "./homepage.css";
import { Connect } from "../data/connect";

import { Icon as MdiIcon } from "@mdi/react";
import {
  mdiBattery,
  mdiBattery10,
  mdiBattery20,
  mdiBattery30,
  mdiBattery40,
  mdiBattery50,
  mdiBattery60,
  mdiBattery70,
  mdiBattery80,
  mdiBattery90,
} from "@mdi/js";

export default class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      curData: {
        event_time: "2020-07-21 09:13:32",
        VOLTAGE: 100,
        CURRENT: 0.0,
        estSOC: 100,
        estSOH_R: 100,
        estSOH_C: 100,
      },
      loading: true,
      database: new Connect(),
    };
    if (localStorage["settings"]) {
      this.state.setting = JSON.parse(localStorage["settings"]);
    }
  }

  async componentDidMount() {
    let list = [];
    list = await this.state.database.getLatestData(1);
    this.setState({
      curData: list[0],
      loading: false,
    });
  }

  batteryLogo = () => {
    let soc = this.state.curData.estSOC;
    if (soc === 100) {
      return mdiBattery;
    } else if (soc >= 90) {
      return mdiBattery90;
    } else if (soc >= 80) {
      return mdiBattery80;
    } else if (soc >= 70) {
      return mdiBattery70;
    } else if (soc >= 60) {
      return mdiBattery60;
    } else if (soc >= 50) {
      return mdiBattery50;
    } else if (soc >= 40) {
      return mdiBattery40;
    } else if (soc >= 30) {
      return mdiBattery30;
    } else if (soc >= 20) {
      return mdiBattery20;
    } else {
      return mdiBattery10;
    }
  };

  batteryColor = () => {
    let soh = (this.state.curData.estSOH_R + this.state.curData.estSOH_C) / 2;
    let soc = this.state.curData.estSOC;
    let setting = this.state.setting;
    let color = "#ff8f00";

    if (!setting) {
      return color;
    }

    if (soc === 100) {
      color = setting.batteryFull;
    } else if (soc >= setting.socThreshold) {
      color = setting.batteryHigh;
    } else {
      color = setting.batteryLow;
    }

    if (soh < setting.sohThreshold) {
      color = setting.healthLow;
    }

    return color;
  };

  batterySentence = () => {
    let soh = (this.state.curData.estSOH_R + this.state.curData.estSOH_C) / 2;
    let soc = this.state.curData.estSOC;
    let setting = this.state.setting;
    let sentence = "Everything went well";

    if (!setting) {
      return sentence;
    }

    if (soc < setting.socThreshold) {
      sentence = "Power shortage";
    }

    if (soh < setting.sohThreshold) {
      sentence = "Unhealthy battery";
    }

    return sentence;
  };

  render() {
    const logo = this.batteryLogo();
    const color = this.batteryColor();
    const sentence = this.batterySentence();
    let data = this.state.curData;

    return (
      <>
        <Spin spinning={this.state.loading} tip="Loading...">
          <Result
            icon={<MdiIcon path={logo} size="100px" color={color} />}
            title={`State of charge: ${data.estSOC}%`}
            subTitle={`${sentence} since ${data.event_time}.`}
          />
          <div id="content">
            <Row gutter={[24, 24]}>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div className="card">
                  <Statistic title="Voltage" value={data.VOLTAGE} prefix={<VoltageIcon />} suffix="V" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div className="card">
                  <Statistic title="Current" value={data.CURRENT} prefix={<CurrentIcon />} suffix="A" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div className="card">
                  <Statistic title="estSOH_R" value={data.estSOH_R} prefix={<FundTwoTone />} suffix="%" />
                </div>
              </Col>
              <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                <div className="card">
                  <Statistic title="estSOH_C" value={data.estSOH_C} prefix={<FundTwoTone />} suffix="%" />
                </div>
              </Col>
            </Row>
          </div>
        </Spin>
      </>
    );
  }
}

const VoltageSvg = () => (
  <svg viewBox="0 0 1024 1024" width="25" height="25">
    <path
      d="M512 723.2c-19.2 0-38.4-6.4-44.8-19.2L262.4 345.6c-6.4-12.8 6.4-32 25.6-44.8 19.2-6.4 44.8 0 57.6 19.2L512 614.4 678.4 320c6.4-19.2 38.4-25.6 57.6-19.2 19.2 6.4 32 25.6 25.6 44.8L556.8 704c-6.4 12.8-25.6 19.2-44.8 19.2z"
      fill="#1890ff"
      p-id="33631"
    ></path>
    <path
      d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0c108.8 0 211.2 32 300.8 96 12.8 12.8 19.2 32 6.4 44.8s-32 19.2-44.8 6.4C697.6 89.6 608 64 512 64 262.4 64 64 262.4 64 512s198.4 448 448 448 448-198.4 448-448c0-76.8-19.2-153.6-57.6-224-6.4-12.8-6.4-32 12.8-44.8 12.8-6.4 32-6.4 44.8 12.8 38.4 76.8 64 166.4 64 256 0 281.6-230.4 512-512 512z"
      fill="#1890ff"
      p-id="33632"
    ></path>
  </svg>
);
const VoltageIcon = (props) => <Icon component={VoltageSvg} {...props} />;
const CurrentSvg = () => (
  <svg viewBox="0 0 1024 1024" width="25" height="25">
    <path
      d="M512 1024C230.4 1024 0 793.6 0 512S230.4 0 512 0c108.8 0 211.2 32 300.8 96 12.8 12.8 19.2 32 6.4 44.8s-32 19.2-44.8 6.4C697.6 89.6 608 64 512 64 262.4 64 64 262.4 64 512s198.4 448 448 448 448-198.4 448-448c0-76.8-19.2-153.6-57.6-224-6.4-12.8-6.4-32 12.8-44.8 12.8-6.4 32-6.4 44.8 12.8 38.4 76.8 64 166.4 64 256 0 281.6-230.4 512-512 512z"
      fill="#1890ff"
      p-id="32770"
    ></path>
    <path
      d="M729.6 678.4L550.4 300.8c0-6.4-19.2-12.8-38.4-12.8s-32 12.8-38.4 19.2L294.4 684.8c-6.4 19.2 6.4 38.4 25.6 44.8s44.8 0 51.2-19.2L428.8 576h166.4l57.6 134.4c12.8 19.2 38.4 25.6 51.2 19.2 19.2-12.8 32-32 25.6-51.2z m-268.8-160L512 403.2l51.2 115.2H460.8z"
      fill="#1890ff"
      p-id="32771"
    ></path>
  </svg>
);
const CurrentIcon = (props) => <Icon component={CurrentSvg} {...props} />;
