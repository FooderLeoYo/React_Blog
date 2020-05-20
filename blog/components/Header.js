import React, { useState, useEffect } from 'react'

import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'

import servicePath from '../config/apiUrl'
import '../public/style/components/header.css'

import { Row, Col, Menu, Icon } from 'antd'

const Header = () => {
  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then(
        res => res.data.data
      )
      setNavArray(result)
    }
    // 手动调用一下fetchData令其执行
    fetchData()
  }, [])

  // 跳转到列表页
  const handleClick = (e) => {
    if (e.key == 0) {
      Router.push('/index')
    } else {
      Router.push('/list?id=' + e.key)
    }
  }

  return (
    < div className="header" >
      {/* 头部左侧博客图标及简介 */}
      < Row type="flex" justify="center" >
        {/* antd栅格适配 */}
        < Col xs={24} sm={24} md={10} lg={15} xl={12} >
          <span className="header-logo">博客</span>
          <span className="header-txt">博客简介内容</span>
        </Col >

        {/* 头部右侧导航 */}
        < Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6} >
          <Menu
            mode="horizontal"
            onClick={handleClick}
          >
            {/* Menu.Item中只有首页是写死的 */}
            <Menu.Item key="0">
              <Icon type="home" />
                    首页
            </Menu.Item>
            {/* 遍历navArray动态生成Menu.Item */}
            {
              navArray.map((item) => {
                return (
                  <Menu.Item key={item.id}>
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