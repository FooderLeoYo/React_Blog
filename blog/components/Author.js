import { Avatar, Divider } from 'antd'
import '../public/style/components/author.css'
// import avaImg from '../public/img/avatar.jpg'


const Author = () => {
  return (
    <div className="author-div comm-box">
      <div> <Avatar size={100} src="https://raw.githubusercontent.com/FooderLeoYo/React_Blog/master/avatar.jpg" /></div>
      <div className="author-introduction">
        个人简介
        <Divider>社交账号</Divider>
        <Avatar size={28} icon="github" className="account" />
        <Avatar size={28} icon="qq" className="account" />
        <Avatar size={28} icon="wechat" className="account" />
      </div>
    </div>
  )
}

export default Author