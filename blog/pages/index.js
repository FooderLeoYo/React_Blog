import React, { useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { Row, Col, List, Icon } from 'antd'
import axios from 'axios'

import '../public/style/pages/comm.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

// 括号里的list就是getInitialProps的返回值reqData
const Home = (list) => {
  const [mylist, setMylist] = useState(list.data)

  return (
    <>
      {/* 浏览器窗口标题 */}
      < Head >
        <title>Home</title>
      </Head >

      {/* 博客头部 */}
      <Header />

      {/* 主体部分左右分栏 */}
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧分栏 */}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          {/* 文章列表 */}
          <List
            // List的各项参数
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                {/* 文章标题 */}
                <div className="list-title">
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                {/* 一些小图标 */}
                <div className="lit-icon">
                  <span><Icon type="calendar" />{item.addTime}</span>
                  <span><Icon type="folder" />{item.typeName}</span>
                  <span><Icon type="fire" />{item.view_count}人</span>
                </div>
                {/* 文章简介 */}
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
          />
        </Col>

        {/* 右侧分栏 */}
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          {/* 博主头像 */}
          <Author />
          {/* 广告图片 */}
          <Advert />
        </Col>
      </Row>

      <Footer />
    </>
  )
}

// getInitialProps是nextjs自带的方法，return的值reqData会作为prop提供给组件使用
Home.getInitialProps = async () => {
  const reqData = axios('http://127.0.0.1:7001/default/getArticleList').then(
    (res) => res.data
  )
  return await reqData
}

export default Home