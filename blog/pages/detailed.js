import React, { useState } from 'react'

import Head from 'next/head'
import axios from 'axios'
import { Row, Col, Affix, Icon, Breadcrumb } from 'antd'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import '../public/style/pages/detailed.css'
import servicePath from '../config/apiUrl'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Tocify from '../components/tocify.tsx'

const Detailed = (reqData) => {
  const renderer = new marked.Renderer();
  const tocify = new Tocify()

  console.log(reqData)

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(reqData.article_content)

  return (
    <>
      {/* 浏览器窗口标题 */}
      <Head>
        <title>{reqData.title}</title>
      </Head>
      {/* 博客头部 */}
      <Header />
      <Row className="comm-main" type="flex" justify="center">

        {/* 主体部分左侧分栏 */}
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              {/* 面包屑导航 */}
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href={'/list?id=' + reqData.typeId}>{reqData.typeName}</a ></Breadcrumb.Item>
                <Breadcrumb.Item>{reqData.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            {/* 文章部分 */}
            <div>
              {/* 文章标题 */}
              <div className="detailed-title">{reqData.title}</div>
              {/* 文章相关信息图标 */}
              <div className="list-icon center">
                <span><Icon type="calendar" /> {reqData.addTime}</span>
                <span><Icon type="folder" /> {reqData.typeName}</span>
                <span><Icon type="fire" /> {reqData.view_count}人</span>
              </div>
              {/* 文章内容 */}
              <div className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}
              >
              </div>
            </div>
          </div>
        </Col>

        {/* 主体部分右侧分栏 */}
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          {/* 博主头像 */}
          <Author />
          {/* 广告图片 */}
          <Advert />
          {/* 章节导航 */}
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />

    </>
  )
}

Detailed.getInitialProps = async (context) => {
  let id = context.query.id
  const reqData = axios(servicePath.getArticleById + id).then(
    (res) => res.data.data[0]
  )
  return await reqData
}

export default Detailed

