import React, { useState, useEffect } from 'react'

import Router from 'next/router'
import axios from 'axios'

import { servicePath, homePage } from '../network/apiUrl'
import '../assets/style/components/header.css'

import { Row, Col, Menu, Icon } from 'antd'

const Header = () => {
  /* 以下为初始化 */
  const [navArray, setNavArray] = useState([])

  useEffect(() => {
    getData()
  }, []) // 传递空数组作为第二个参数，表示仅在组件挂载和卸载时执行

  /* 以下为相关方法 */
  // 获取导航类别的数据的方法
  const getData = async () => {
    const requestRes = await axios(servicePath.getTypeInfo)
    const showData = requestRes.data.data
    setNavArray(showData)
  }

  // 点击列表后跳转到对应页的方法
  const handleClick = (e) => {
    if (e.key === 0) {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }

  /* JSX部分 */
  return (
    < div className="header" >
      < Row type="flex" justify="center" >
        {/* antd栅格适配 */}

        {/* 头部左侧博客图标及简介 */}
        < Col xs={20} sm={20} md={12} lg={14} xl={15} >
          <span className="header-logo">
            <a href={homePage}>BLOG</a>
          </span>
          <span className="header-txt">BLOG basic inroduce</span>
        </Col >

        {/* 头部右侧导航 */}
        < Col className="ant-meu" xs={4} sm={4} md={12} lg={10} xl={9} >
          <Menu
            mode="horizontal"
            onClick={handleClick}
          >
            {/* 遍历navArray动态生成Menu.Item */}
            {
              navArray.map((item) => {
                return (
                  <Menu.Item key={item.id} className="ant-menu-item">
                    <Icon type={item.icon} />
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col >
      </Row >
    </div >
  )
}

export default Header