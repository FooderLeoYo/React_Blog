import React, { useState, useEffect } from 'react';
import marked from 'marked'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'

import servicePath from '../config/apiUrl'

import '../static/css/AddArticle.css'

const { Option } = Select;
const { TextArea } = Input

function AddArticle(props) {
  const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
  const [articleTitle, setArticleTitle] = useState('')   //文章标题
  const [articleContent, setArticleContent] = useState('')  //markdown的编辑内容
  const [markdownContent, setMarkdownContent] = useState('预览内容') //html内容
  const [introducemd, setIntroducemd] = useState()            //简介的markdown内容
  const [introducehtml, setIntroducehtml] = useState('等待编辑') //简介的html内容
  const [showDate, setShowDate] = useState()   //发布日期
  const [updateDate, setUpdateDate] = useState() //修改日志的日期
  const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
  const [selectedType, setSelectType] = useState('请选择类型') //选择的文章类别

  useEffect(() => {
    getTypeInfo()
  }, [])

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

  //从中台得到文章类别信息
  const getTypeInfo = () => {

    axios({
      method: 'get',
      url: servicePath.getTypeInfo,
      header: { 'Access-Control-Allow-Origin': '*' },
      withCredentials: true
    }).then(
      res => {
        if (res.data.data === "没有登录") {
          localStorage.removeItem('openId')
          props.history.push('/')
        } else {
          setTypeInfo(res.data.data)
        }

      }
    )
  }

//保存文章的方法
const saveArticle = ()=>{
  if(selectedType === '请选择类型'){
      message.error('必须选择文章类别')
      return false
  }else if(!articleTitle){
      message.error('文章名称不能为空')
      return false
  }else if(!articleContent){
      message.error('文章内容不能为空')
      return false
  }else if(!introducemd){
      message.error('简介不能为空')
      return false
  }else if(!showDate){
      message.error('发布日期不能为空')
      return false
  }

  let dataProps={}   //传递到接口的参数
  dataProps.id = Math.random() * 23333 + 6666
  dataProps.type_id = selectedType 
  dataProps.title = articleTitle
  dataProps.article_content =articleContent
  dataProps.introduce =introducemd
  let datetext= showDate.replace('-','/') //把字符串转换成时间戳
  dataProps.addTime =(new Date(datetext).getTime())/1000


  if(articleId === 0){
      dataProps.view_count =Math.ceil(Math.random()*100)+1000
      axios({
          method: 'post',
          url: servicePath.addArticle,
          data: dataProps,
          withCredentials: true
      }).then(
          res=>{
              setArticleId(res.data.insertId)
              if(res.data.isScuccess){
                  message.success('文章保存成功')
              }else{
                  message.error('文章保存失败');
              }
          }
      ).catch(() => message.error('服务器出错'))
  }
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
                size="large" 
                onChange={e => setArticleTitle(e.target.value)}/>
            </Col>
            {/* 根据类别筛选 */}
            <Col span={4}>
              &nbsp;
              <Select defaultValue={selectedType} size="large" onChange={value => setSelectType(value)}>
                {
                  typeInfo.map((item, index) => {
                    return (<Option key={index} value={item.id}>{item.typeName}</Option>)
                  })
                }
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
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
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
                  size="large" 
                  onChange={(date,dateString) => setShowDate(dateString)} />
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default AddArticle