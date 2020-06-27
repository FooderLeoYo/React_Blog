import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import axios from 'axios'

import { servicePath } from '../network/apiUrl'
import '../assets/style/pages/comm.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

const MyList = (list) => {

  const [mylist, setMylist] = useState(list.data)

  useEffect(() => {
    setMylist(list.data)
  })

  return (
    <>
      {/* 头部 */}
      < Head >
        <title>{mylist[0].typeName}</title>
      </Head >
      <Header />

      {/* 主体部分o左右分栏 */}
      <Row className="comm-main" type="flex" justify="center">
        {/* 左侧分栏 */}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div className="bread-div">
            {/* 面包屑导航 */}
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>{mylist[0].typeName}</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          {/* 文章列表 */}
          <List
            header={<div>{mylist[0].typeName}列表</div>}
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
                <div className="list-icon">
                  <span><Icon type="calendar" />{item.addTime}</span>
                  <span><Icon type="folder" />{item.typeName}</span>
                  <span><Icon type="fire" />{item.view_count}人</span>
                </div>
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

MyList.getInitialProps = async (context) => {

  let id = context.query.id
  const reqData = axios(servicePath.getListById + id).then(
    res => res.data
  )
  return await reqData
}

export default MyList