import React, { useState } from 'react';
import marked from 'marked'
import { Row, Col, Input, Select, Button, DatePicker } from 'antd'

import '../static/css/AddArticle.css'

const { Option } = Select;
const { TextArea } = Input

function AddArticle() {

  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState(1) //选择的文章类别

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
  });

  const changeContent = (e) => {
    setArticleContent(e.target.value)
    let html = marked(e.target.value)
    setMarkdownContent(html)
  }

  const changeIntroduce = (e) => {
    setIntroducemd(e.target.value)
    let html = marked(e.target.value)
    setIntroducehtml(html)
  }

  return (
    <div>
      <Row gutter={5}>

        {/* 左边栏 */}
        <Col span={18}>
          {/* 标题及筛选 */}
          <Row gutter={10} >
            {/* 博客标题 */}
            <Col span={20}>
              <Input
                placeholder="博客标题"
                size="large" />
            </Col>
            {/* 根据类别筛选 */}
            <Col span={4}>
              &nbsp;
                    <Select defaultValue="Sign Up" size="large">
                <Option value="Sign Up">视频教程</Option>
              </Select>
            </Col>
          </Row>
          <br />

          {/* 文章内容及预览 */}
          <Row gutter={10} >
            {/* 文章内容区域 */}
            <Col span={12}>
              <TextArea
                className="markdown-content"
                rows={35}
                onChange={changeContent}
                onPressEnter={changeContent}
                placeholder="文章内容" />
            </Col>
            {/* 预览区域 */}
            <Col span={12}>
              <div
                className="show-html"
                dangerouslySetInnerHTML={{ __html: markdownContent }}>
              </div>
            </Col>
          </Row>
        </Col>

        {/* 右边栏 */}
        <Col span={6}>
          <Row>
            {/* 暂存文章和暂存文章按钮 */}
            <Col span={24}>
              <Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" >暂存文章</Button>
              <br />
            </Col>
            {/* 文章简介部分 */}
            <Col span={24}>
              <br />
              <TextArea
                rows={4}
                onChange={changeIntroduce}
                onPressEnter={changeIntroduce}
                placeholder="文章简介" />
              <br /><br />
              <div
                className="introduce-html"
                dangerouslySetInnerHTML={{ __html: '文章简介：' + introducehtml }}>
              </div>
            </Col>
            {/* 发布日期 */}
            <Col span={12}>
              <div className="date-select">
                <DatePicker
                  placeholder="发布日期"
                  size="large" />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle