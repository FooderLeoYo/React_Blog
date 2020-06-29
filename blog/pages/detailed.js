import React, { useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import { Row, Col, Affix, Icon, Breadcrumb } from 'antd'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import '../assets/style/pages/detailed.css'
import { servicePath } from '../network/apiUrl'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Tocify from '../components/tocify.tsx'

const Detailed = (showData) => {
  /* 以下为组件初始化部分 */
  const [article, setArticle] = useState(showData)

  // 配置marked
  const renderer = new marked.Renderer();
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

  // 配置tocify
  const tocify = new Tocify()
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  let html = marked(article.article_content)

  /* 以下为JSX部分 */
  return (
    <>
      {/* 浏览器窗口标题 */}
      <Head>
        <title>{article.title}</title>
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
                <Breadcrumb.Item><a href={'/list?id=' + article.typeId}>{article.typeName}</a ></Breadcrumb.Item>
                <Breadcrumb.Item>{article.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            {/* 文章部分 */}
            <div>
              {/* 文章标题 */}
              <div className="detailed-title">{article.title}</div>
              {/* 文章相关信息图标 */}
              <div className="list-icon center">
                <span><Icon type="calendar" /> {article.addTime}</span>
                <span><Icon type="folder" /> {article.typeName}</span>
                <span><Icon type="fire" /> {article.view_count}人</span>
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

/* 以下为相关方法 */
Detailed.getInitialProps = async (context) => {
  let id = context.query.id
  const reqData = await axios(servicePath.getArticleById + id)
  const showData = reqData.data.data[0]
  return showData
}

export default Detailed

