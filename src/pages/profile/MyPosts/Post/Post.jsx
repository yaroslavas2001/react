import s from "./Post.module.css"
const Post = (props) => {
  // debugger
  // console.log("props",props.message)
  return (<div className="content">
    <img className={s.profile_img} src='https://avatarko.ru/img/kartinka/1/avatarko_anonim.jpg' />
    {props.message}
  </div>);
}

export default Post;
