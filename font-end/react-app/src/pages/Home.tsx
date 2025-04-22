import { Link, Outlet } from "react-router"
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Avatar, Breadcrumb, Layout, Menu, theme } from 'antd';
import React, { useEffect } from "react";
import HeaderControls from "./components/headerControls";
import { useNavigate } from "react-router";
const { Header, Content, Footer, Sider } = Layout;
const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);
export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    // 检查是否登录
    const token = localStorage.getItem('token');
    if (String(token) === 'null' || String(token) === 'undefined') {
      // 如果没有登录，跳转到登录页面
      navigate('/login');
    }
  })
  return (
    <div className="w-full flex justify-center items-center h-screen">
      <Layout className="h-screen">
        <Header style={{ display: 'flex', alignItems: 'center', padding: '0 10px', justifyContent: 'space-between', backgroundColor: '#001529' }}>
          <div className="demo-logo text-white flex items-center justify-center" >
            <Avatar src="http://localhost:3000/assets/logo.jpg" className="mx-4!" />
            全栈后台管理框架
          </div>
          {/* <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={items1}
          style={{ flex: 1, minWidth: 0 }}
        /> */}

          <HeaderControls></HeaderControls>
        </Header>
        <div style={{ padding: '0 20px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout
            style={{ padding: '24px 0', background: 'white', borderRadius: 10, height: 'calc(100vh - 159px)' }}
          >
            <Sider style={{ background: 'white' }} width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%' }}
                items={items2}
              />
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Outlet />
            </Content>
          </Layout>
        </div>
        <Footer style={{ textAlign: 'center', padding: '10px 24px' }}>
          XXXXXXX ©{new Date().getFullYear()} XXXXXXXXXXXXXX
        </Footer>
      </Layout>
    </div>
  )

}