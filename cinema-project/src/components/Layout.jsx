import React, { useContext } from 'react';
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from 'antd';
import {
    HomeFilled,
    BarsOutlined,
    SearchOutlined,
    TrophyOutlined,
    LoginOutlined,
    UserOutlined,
    LogoutOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AccountContext } from '../contexts/account.context';

const { Header, Content, Footer } = LayoutAntd;

const items = [
    {
        key: '/',
        label: <Link to="/">Home</Link>,
        icon: <HomeFilled />
    },
    {
        key: '/movies',
        label: <Link to="/movies">Movies</Link>,
        icon: <BarsOutlined />,
    },
    {
        key: '/sessions_page',
        label: <Link to="/sessions_page">Sessions</Link>,
        icon: <VideoCameraOutlined />,
    },
    {
        key: '/favorite_page',
        label: <Link to="/favorite_page">Favorite Movies</Link>,
        icon: <TrophyOutlined />,
    },
    {
        key: '/search_page',
        label: <Link to="/search_page">Search Movies</Link>,
        icon: <SearchOutlined />,
    },
]

const annonymoMenuItems = [
    {
        key: '/login',
        label: <Link to="/login">Login</Link>,
        icon: <LoginOutlined />
    },
    {
        key: '/register',
        label: <Link to="/register">Register</Link>,
        icon: <UserOutlined />,
    }
]

const accountoMenuItems = [
    {
        key: '/logout',
        label: <Link to="/logout">Logout</Link>,
        icon: <LogoutOutlined />
    },
]

const Layout = () => {

    const location = useLocation();
    const { email, isAuth } = useContext(AccountContext);
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
                    selectedKeys={[location.pathname]}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />

                {isAuth() && <p>Hello <span className={email === "Admin" ? 'red' : ''} >{email}</span></p>}

                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    selectedKeys={[location.pathname]}
                    items={isAuth() ? accountoMenuItems : annonymoMenuItems}
                    style={{ flex: 1, justifyContent: "flex-end", minWidth: 0 }}
                />
            </Header>

            <Content className='Content' style={{ padding: '0 12px ' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[{ title: 'Home' }, { title: location.pathname.slice(1, location.pathname.length) }]}
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
