import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom/client';
import MainApp from './App';
import React from 'react';
const root = ReactDOM.createRoot(document.getElementById('root'));

let rerenderEntireTree = () => {
  root.render(
    // <React.StrictMode>
      <MainApp />
    /* </React.StrictMode> */
    );
}
/* </React.StrictMode> */
rerenderEntireTree();
// store={store}
// state={store.getState()}
// dispatch={store.dispatch.bind(store)}
/* <React.StrictMode>  - возможно по этому 2 раза отрисовывал*/


// так как у connect своя перерисовка, то можно эту подписку убрать 
// store.subscribe(() => {
//   rerenderEntireTree(store)
// })

//   addPost={store.addPost}  мы не передаем контекст, поэтому когда мы вызовем в компоненте контекст возмется из попследних props
//   addPost={store.addPost.bind(store)} мы передаем контекст стора, поэтому когда мы вызовем и вызов дойдет до state на месте this будет все в порядке

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
