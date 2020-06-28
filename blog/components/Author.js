import { Avatar, Divider } from 'antd'
import '../assets/style/components/author.css'
import qqQRC from '../assets/img/qqQRC.jpg'

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div> <Avatar size={100} src="http://121.37.185.108/reactblog/blog/public/img/avatar.jpg" /></div>
      <div className="author-introduction">
        This section is for self-introduce
        <Divider>Contacts</Divider>
        <a href="https://github.com/FooderLeoYo">
          <Avatar size={28} icon="github" className="account" />
        </a>
        <div className="qq">
          <Avatar size={28} icon="qq" className="account" />
          <img src={qqQRC} />
        </div>
        <Avatar size={28} icon="wechat" className="account" />
      </div>
    </div>
  )
}

export default Author