import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route } from "react-router-dom";

import '../static/css/AdminIndex.css'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'


const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function AdminIndex(props) {

  const [collapsed, setCollapsed] = useState(false)

  const onCollapse = collapsed => {
    setCollapsed(collapsed)
  }


  const handleClickArticle = e => {
    if (e.key === 'addArticle') {
      props.history.push('/index/add')
    } else {
      props.history.push('/index/list')
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 左侧边栏 */}
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        {/* 各个选项 */}
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          {/* 工作台选项 */}
          <Menu.Item key="1">
            <Icon type="desktop" />
            <span>工作台</span>
          </Menu.Item>
          {/* 文章管理选项 */}
          <SubMenu
            key="sub1"
            onClick={handleClickArticle}
            title={
              <span>
                <Icon type="form" />
                <span>文章管理</span>
              </span>
            }
          >
            {/* 文章管理的子选项 */}
            <Menu.Item key="addArticle">添加文章</Menu.Item>
            <Menu.Item key="articleList">文章列表</Menu.Item>
          </SubMenu>
          {/* 数据统计选项 */}
          <Menu.Item key="2">
            <Icon type="line-chart" />
            <span>数据统计</span>
          </Menu.Item>
          {/* 留言管理选项 */}
          <Menu.Item key="9">
            <Icon type="file" />
            <span>留言管理</span>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          {/* 面包屑导航 */}
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index/" exact component={AddArticle} />
              <Route path="/index/add/" exact component={AddArticle} />
              <Route path="/index/add/:id" exact component={AddArticle} />
              <Route path="/index/list/" exact component={ArticleList} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>www.wangzhi.com</Footer>
      </Layout>
    </Layout>
  )

}

export default AdminIndex