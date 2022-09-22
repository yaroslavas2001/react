import React from "react";
import s from "./Dialog.module.css"
import DialogItem from "./dialogItem/DialogItem";
import Message from "./message/Message";

const Dialog = (props) => {

  let dialogsElement = props.dialogsPage.dialogs.map((el, index) => <DialogItem key={index} name={el.name} id={el.id} />)
  let messagesElement = props.dialogsPage.messages.map((el, index) => <Message key={index} message={el.message} id={el.id} />)
  let addNewMessage = React.createRef()
  let sendMessage = () => {
    console.log(addNewMessage.current.value)
  }
  return (<div className={s.dialogs}>
    <div className={s.dialogs_items}>
      {dialogsElement}
    </div>
    <div className={s.messages}>
      <div className={s.message}>
        {messagesElement}
      </div>
      <div className={s.add_new_message_block}>
        <textarea ref={addNewMessage}></textarea>
        <button onClick={sendMessage}>SendMessage</button>
      </div>
    </div>
  </div>);
}

export default Dialog;
