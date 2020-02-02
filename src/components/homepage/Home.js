import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Icon } from "antd";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Search from "../Search";
import JourneyApp from "../createJourney/journeyApp";

const { Header, Sider, Content } = Layout;

class Home extends React.Component {
  state = {
    collapsed: false,
    controlDisplay: true
  };
  handleRender = () => {
    this.setState({ controlDisplay: !this.state.controlDisplay });
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    let conditionalRender;
    if (this.state.controlDisplay)
      conditionalRender = (
        <Search
          searchType="journey"
          handleRender={this.handleRender}
          handleChangingState={this.props.handleChangingState}
        />
      );
    else
      conditionalRender = (
        <JourneyApp
          handleRender={this.handleRender}
          handleChangingState={this.props.handleChangingState}
        />
      );

    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
              <Menu.Item key="4">
                <Icon type="home" />
                <span>Home</span>
                <Link to="/home" style={{ color: "white" }} />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="global" />
                <span>Journeys</span>
                <Link to="/journeys" style={{ color: "white" }} />
              </Menu.Item>
              <Menu.Item key="1">
                <Icon type="car" />
                <span>Stations</span>
                <Link to="/stations" style={{ color: "white" }} />
              </Menu.Item>
              {/* <Menu.Item key="3">
                <Icon type="user" />
                <span> <Link to='/users' style={{ color: "white" }}>Users</Link>  </span>
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
                minHeight: 545
              }}
            >
              <Route path="/home" render={() => <div></div>} />
              <Route path="/journeys" render={() => conditionalRender} />
              <Route
                path="/stations"
                render={() => (
                  <Search
                    searchType="station"
                    handleChangingState={this.props.handleChangingState}
                  />
                )}
              />

              {/* <Route path='/users'>
                <Home/>
          </Route> */}
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
export default Home;
