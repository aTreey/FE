import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TestComponent from './TestComponent';
import reportWebVitals from './reportWebVitals';



ReactDOM.render(
  <React.StrictMode>
    <TestComponent />
  </React.StrictMode>,
  
  // 挂载在 build 文件下的 index.html 文件中的 id 为root 的 div 
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
