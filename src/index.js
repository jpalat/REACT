import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "antd/dist/antd.css";
import Graph from "./graph/graph";
import Setting from "./setting/setting";
import Homepage from "./homepage/homepage";

import { Menu } from "antd";
import { SettingOutlined, HomeOutlined, FundOutlined } from "@ant-design/icons";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      current: "Home",
    };
  }

  handleClick = (e) => {
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    let curPage;
    switch (current) {
      case "Home":
        curPage = <Homepage />;
        break;
      case "Charts":
        curPage = <Graph />;
        break;
      case "Setting":
        curPage = <Setting />;
        break;
      default:
        break;
    }
    return (
      <>
        <div id="header">
          <img src="/SBG.png" id="SBG" alt="SBG" />
        </div>
        <div id="mainlist">
          <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" id="menu">
            <Menu.Item key="Home" icon={<HomeOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="Charts" icon={<FundOutlined />}>
              Charts
            </Menu.Item>
            <Menu.Item key="Setting" icon={<SettingOutlined />}>
              Setting
            </Menu.Item>
          </Menu>
          {curPage}
        </div>
        <div id="footer">
          <a href="https://www.ncelectriccooperatives.com/">
            <img src="/NCEMC.png" id="NCEMC" alt="NCEMC" />
          </a>
          <a href="https://www.ncsu.edu" id="centerLink">
            <img src="/NCSU.png" id="NCSU" alt="NCSU" />
          </a>
          <a href="https://research.ece.ncsu.edu/adac">
            <img src="/ADAC.jpg" id="ADAC" alt="ADAC" />
          </a>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
