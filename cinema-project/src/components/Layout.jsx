import React from 'react';
import { Breadcrumb, Layout as LayoutAntd, Menu, theme } from 'antd';
import {
    HomeFilled,
    BarsOutlined,
    BookOutlined,
    SearchOutlined,
    TrophyOutlined,
} from '@ant-design/icons';
import { Link, Outlet, useLocation } from 'react-router-dom';

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
        icon: <BarsOutlined />,
    },
    {
        key: '3',
        label: <Link to="/favorite_page">Favorite Movies</Link>,
        icon: <TrophyOutlined />,
    },
    {
        key: '4',
        label: <Link to="/search_page">Search Movies</Link>,
        icon: <SearchOutlined />,
    },
]

const Layout = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const location = useLocation();

    const getSelectedKey = () => {
        if (location.pathname.includes('/create') || location.pathname.includes('/edit') || location.pathname.includes('/movie_page')) {
            return '2'; 
        }
        if (location.pathname === '/favorite_page') {
            return '3'; 
        }
        if (location.pathname === '/search_page') {
            return '4'; 
        }
        return '1';
    };

    return (
        <LayoutAntd className='Layout'>
            <Header style={{ display: 'flex', alignItems: 'center' }}>
                <div className='logo'>
                    <h2 className='WebText'>Movies website</h2>
                </div>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={[getSelectedKey()]}
                    items={items}
                    style={{ flex: 1, minWidth: 0 }}
                />
            </Header>

            <Content className='Content' style={{ padding: '0 12px ' }}>
                <Breadcrumb
                    style={{ margin: '16px 0' }}
                    items={[{ title: 'Home' }, { title: location.pathname.slice(1,location.pathname.length) }]}
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
