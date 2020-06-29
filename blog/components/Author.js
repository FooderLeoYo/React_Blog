import { Avatar, Divider } from 'antd'
import '../assets/style/components/author.css'

const Author = () => {
  return (
    <div className="author-div comm-box">
      <div> <Avatar size={100} src="https://thumbnail0.baidupcs.com/thumbnail/3d80aed3ejc86b17aa74a895c79628b0?fid=2533659071-250528-904050718461766&time=1593388800&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-BgZnm8MZAO%2BmTqNXZgMl4gChg34%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=4182941398858316814&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" alt="Avatar" /></div>
      <div className="author-introduction">
        This section is for self-introduce
        <Divider>Contacts</Divider>
        <a href="https://github.com/FooderLeoYo">
          <Avatar size={28} icon="github" className="account" />
        </a>
        <div className="qq">
          <Avatar size={28} icon="qq" className="account" />
          <img src="https://thumbnail0.baidupcs.com/thumbnail/c7c0920eeiba7d95f23d9ee8f50dd686?fid=2533659071-250528-517681826526716&time=1593313200&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-ayDSidjd5lPmeNT8G5Zm%2FCkpaqQ%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=4162722587136148770&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" alt="1530092839" />
        </div>
        <div className="wechat">
          <Avatar size={28} icon="wechat" className="account" />
          <img src="https://thumbnail0.baidupcs.com/thumbnail/e9bf34a43k6c09400f44f8f0edd937b0?fid=2533659071-250528-910020903638177&time=1593313200&rt=sh&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-gqe5TXPOifjaLO7tQPn9dwEvB4A%3D&expires=8h&chkv=0&chkbd=0&chkpc=&dp-logid=4162837944663148805&dp-callid=0&size=c710_u400&quality=100&vuk=-&ft=video" alt="1530092839" />
        </div>
      </div>
    </div>

  )
}

export default Author