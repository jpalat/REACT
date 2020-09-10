import React, { Component } from "react";
import { Slider, Row, Col, Card, Button, message } from "antd";
import { TwitterPicker } from "react-color";
import "./setting.css";

export default class Setting extends Component {
  constructor() {
    super();
    if (localStorage["settings"]) {
      this.state = JSON.parse(localStorage["settings"])
    } else {
      this.state = {
        socThreshold: 50,
        sohThreshold: 20,
        batteryLow: "#eb144c",
        batteryHigh: "#ff8f00",
        batteryFull: "#0693e3",
        healthLow: "#abb8c3",
      };
    }
  }

  chargeMarks = {
    0: "Low",
    100: "High",
  };

  healthMarks = {
    0: "Unhealthy",
    100: "Healthy",
  };

  formatTip = (value) => {
    return `${value}%`;
  };

  reset = () => {
    this.setState({
      socThreshold: 50,
      sohThreshold: 20,
      batteryLow: "#eb144c",
      batteryHigh: "#ff8f00",
      batteryFull: "#0693e3",
      healthLow: "#abb8c3",
    });
    message.info('Reset to default value');
  };

  save = () => {
    localStorage["settings"] = JSON.stringify(this.state);
    message.success('Saved successfully');
  };

  render() {
    const state = this.state;
    return (
      <>
        <div id="settingList">
          <Row gutter={[24, 24]}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24}>
              <Card title="Warning threshold" bodyStyle={{ paddingLeft: 30 }}>
                <span>State of charge:</span>
                <Slider
                  marks={this.chargeMarks}
                  value={state.socThreshold}
                  onChange={(value) => this.setState({ socThreshold: value })}
                  tipFormatter={this.formatTip}
                />
                <span>State of health:</span>
                <Slider
                  marks={this.healthMarks}
                  value={state.sohThreshold}
                  onChange={(value) => this.setState({ sohThreshold: value })}
                  tipFormatter={this.formatTip}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Card size="small" title="Low battery color" bodyStyle={{ background: this.state.batteryLow }}>
                <TwitterPicker
                  triangle="hide"
                  color={this.state.batteryLow}
                  onChangeComplete={(color) => {
                    this.setState({ batteryLow: color.hex });
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Card size="small" title="High battery color" bodyStyle={{ background: this.state.batteryHigh }}>
                <TwitterPicker
                  triangle="hide"
                  color={this.state.batteryHigh}
                  onChangeComplete={(color) => {
                    this.setState({ batteryHigh: color.hex });
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Card size="small" title="Full battery color" bodyStyle={{ background: this.state.batteryFull }}>
                <TwitterPicker
                  triangle="hide"
                  color={this.state.batteryFull}
                  onChangeComplete={(color) => {
                    this.setState({ batteryFull: color.hex });
                  }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={24} lg={12} xl={12}>
              <Card size="small" title="Low health color" bodyStyle={{ background: this.state.healthLow }}>
                <TwitterPicker
                  triangle="hide"
                  color={this.state.healthLow}
                  onChangeComplete={(color) => {
                    this.setState({ healthLow: color.hex });
                  }}
                />
              </Card>
            </Col>
          </Row>
          <Button type="link" onClick={this.reset}>
            Reset
          </Button>
          <Button type="primary" onClick={this.save}>
            Save
          </Button>
        </div>
      </>
    );
  }
}
