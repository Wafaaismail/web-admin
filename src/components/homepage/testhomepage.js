import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Icon, Popover, Button } from "antd";

const { Header, Sider, Content } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false
    // visible: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  // hide = () => {
  //   this.setState({
  //     visible: false
  //   });
  // };

  // handleVisibleChange = visible => {
  //   this.setState({ visible });
  // };
  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Icon type="user" />
              <span>Journeys</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="video-camera" />
              <span>Users</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span> Trips</span>
            </Menu.Item>
            {/* <Menu.Item key="4" title="Not clone the node">
              <Popover
                content={<a onClick={this.hide}>Close</a>}
                title="Title"
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this.handleVisibleChange}
              >
                 <Button type="primary">Click me</Button> 
              </Popover>
            </Menu.Item> */}
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: "#fff", padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: 24,
              background: "#fff",
              minHeight: 280
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}
export default SiderDemo;
