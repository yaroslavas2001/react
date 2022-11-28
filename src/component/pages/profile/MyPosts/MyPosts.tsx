import React from "react";
import Post from "./Post/Post"
import style from "./MyPosts.module.css"
import ReduxAddPostForm, { AddPostFormFieldType } from "./AddPostForm";
import { PostType } from "../../../../redux/profile-reducer";
import { ProfileType } from "../../../../api/api";
type MapStateToPropsType = {
  newPostText: string
  posts: Array<PostType>
  profile: ProfileType
}
type MapDispatchToPropsType = {
  addPost: (newPostText: string) => void
  deletePost:(id:number)=>void
}
type propsType = MapStateToPropsType & MapDispatchToPropsType

const MyPosts = (props: propsType) => {
  let postsElements = props.posts.map((el: PostType, index: number) =>
    <Post key={index} post={el} deletePost={props.deletePost} />)

  const onSubmit = (value: string) => {
    props.addPost(value)
  }

  return (< >
    <ReduxAddPostForm onSubmit={onSubmit} profile={props.profile} />
    {postsElements}
  </>);
}

export default MyPosts;
