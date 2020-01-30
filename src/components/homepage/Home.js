import React from "react";
import "antd/dist/antd.css";
import "./index.css";
import { Layout, Menu, Icon } from "antd";
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from 'react-router-dom'
import Search from "../Search";


const { Header, Sider, Content } = Layout;

class Home extends React.Component {
  state = {
    collapsed: false
    // visible: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" />
            <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="4">
                <Icon type="home" />
                <span>
                  <Link to='/home' style={{color:"white"}}>
                    Home
                </Link>
                </span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="global" />
                <span>
                  <Link to='/journeys' style={{color:"white"}}>
                    Journeys
                </Link>
                </span >
              </Menu.Item>
              <Menu.Item key="1">
                <Icon type="car" />
                <span><Link to='/stations' style={{color:"white"}}>Stations</Link></span >
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="user" />
                <span> <Link to='/users' style={{color:"white"}}>Users</Link>  </span>
              </Menu.Item>
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
              <Switch>
              {/* <Route path='/home'>
                  <Home/>
                </Route> */}
                <Route path='/journeys'>
                  <Search searchType='journey' />
                </Route>
                <Route path='/stations'>
                  <Search searchType='station' />
                </Route>
                {/* <Route path='/users'>
                <Home/>
          </Route> */}

              </Switch>
          </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}
export default Home;
