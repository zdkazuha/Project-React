import React from 'react';
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from 'antd';
import {
    DatabaseFilled,
    HomeFilled,
} from '@ant-design/icons';
import { Link, Outlet } from 'react-router-dom';

const { Header, Content, Footer } = LayoutAntd;

const items = [
    {
        key: '1',
        label: <Link to="/">Home</Link>,
        icon: <HomeFilled />
    },
    {
        key: '2',
        label: <Link to="/movies">Movies</Link>,
        icon: <DatabaseFilled />,
    },
]

const Layout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <LayoutAntd className='Layout'>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className='logo'>
                    <h2 className='WebText'>Movies website</h2>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>

            <Content className='Content' style={{ padding: '0 12px ' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[{ title: 'Home' }, { title: 'List' }, { title: 'App' }]}
                />
                <div
                    style={{
                        background: colorBgContainer,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>

            <Footer className='Footer' style={{ textAlign: 'center', backgroundColor: '#001529', color: '#fff' }}>
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </LayoutAntd>
    );
};
export default Layout;