import React, { FC, useState, useEffect } from "react";
import styleMain from "./../../../../../App.module.css"
import style from "./AddPostForm.module.css"
import { join } from "../../../../../utils/function";
import { ProfileType } from "../../../../../api/api";
import defaultPhoto from "./../../../../../assets/default_user.png"

import TextareaAutosize from 'react-textarea-autosize';
import { checkTextEmpty } from "../../../../../utils/validator/validators";
import BaseButton from "../../../../../common/Button/BaseButton";

type AddPostFormType = {
  profile: ProfileType
  onSubmit: (value: any) => void
}
export type AddPostFormFieldType = {
  newPostText: string
}
const AddPostForm: FC<AddPostFormType> = ({ profile, onSubmit }) => {
  const photo = profile?.photos?.large ? profile.photos.large : defaultPhoto
  let [value, setTextPost] = useState('')
  let [error, setErrorText] = useState('')

  const sentPostText = () => {
    if (checkTextEmpty(value) === undefined) {
      onSubmit(value)
      setTextPost("")
      setErrorText("")
    }
    else setErrorText(checkTextEmpty(value))

  }
  useEffect(() => {
    if (value.length === 0)
      setTextPost("")
  }, [value])

  return (
    <form className={join([styleMain.content, style.block])}>
      <img src={photo} alt="photo user" className={style.photo_user} />
      <TextareaAutosize value={value}
        onChange={ev => setTextPost(ev.target.value)}
        placeholder="Anything new?"
        className={style.test}
      />
      <div>{error}</div>
      <BaseButton value="Add post" onClick={sentPostText} className={[style.btn]} />
    </form>
  )
}

export default AddPostForm;
