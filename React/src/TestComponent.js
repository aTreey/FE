import React, { Component, Fragment } from 'react'
import TestItem from './TestItem'
import TransitionAnimation from './TransitionAnimation'
import KeyframesAnimation from './KeyframesAnimation'

import axios from 'axios'

import './style.css'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import FormDemo from './TestForm'
import Game from './Game/Game'
import { Example, HookExample } from './ReactHook/useEffectDemo'
import { UseReducerDemo, UseReducerStartDemo } from './ReactHook/useReducerStart'
import { UseContextDemo, UseContextUseReducerDemo } from './ReactHook/useContext'

import { UseCallbackDemo } from './ReactHook/UseCallbackDemo'
import { UseCallbackDemo1 } from './ReactHook/UseCallbackDemo1'
import { UseCallbackDemo2, ClassComponentDemo } from './ReactHook/UseCallbackDemo2'

import { App, App2 } from './ReactHook/useCallback'
import { UseMemoApp } from './ReactHook/useMemoDemo'
import { RefDemo } from './ReactHook/useRef'
import { ForwardRefDemo } from './ReactHook/forwardRef'
import { UseImperativeHandleDemo } from './ReactHook/useImperativeHandle'
import { UseImperativeHandleDemo2 } from './ReactHook/useImperativeHandle2'
import { CustomHooksDemo } from './ReactHook/useLayoutEffect'

class TestComponent extends Component {
  // 初始化阶段
  constructor(props) {
    super(props)
    this.state = {
      inputV: '',
      list: ['item1', 'item2', 'item3', 'item4'],
    }

    this.addList = this.addList.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }

  // axios 请求可以写在这里
  componentDidMount() {
    console.log('componentDidMount----')
    axios
      .get('https://api.github.com/search/repositories?q=React')
      .then((res) => {
        console.log('res =====' + JSON.string(res))
      })
      .catch((err) => {
        console.log('====================================')
        console.log('err ----' + JSON.stringify(err))
        console.log('====================================')
      })
  }

  inputChange() {
    // console.log("inputChange ---- " + e.target.value);
    this.setState({
      // inputV: e.target.value,

      // 使用ref后可改写成
      inputV: this.input.value,
    })
  }

  addList() {
    if (this.state.inputV.length <= 0) {
      return
    }
    this.setState(
      {
        list: [...this.state.list, this.state.inputV],
        inputV: '',
      },
      () => {
        const children = this.ul.querySelectorAll('li')
        console.log('setState 执行完毕---' + children.length)
      },
    )

    //  DOM 概念
    // 真实DOM:

    // 虚拟DOM:

    // 优点：

    // 1.减少DOM 操作，
    //    a. 可以将多次操作合并为一次操作；比如需要添加1000个节点时，DOM是一个一个添加的，而虚拟DOM 可以一次添加1000 个
    //    b. DOM diff 算法可以减少多余操作；比如添加1000个节点，其实只有10个是新增的
    // 2.跨平台
    //    虚拟DOM 不仅可以变成DOM，还可以变成小程序，iOS应用，安卓应用，因为虚拟DOM上本质只有一个JS对象，

    // <div> 只是JSX语法 简化了 React.createElement()的写法

    // 缺点：需要额外的创建函数，如React.createElement()，可用JSX简化语法

    // --------------ref 使用注意事项----------------------------
    //  setState 异步执行，根本原因是虚拟DOM
    // ref绑定<ul></ul> 组件，在setState 后执行

    const children = this.ul.querySelectorAll('li')
    console.log('ref 使用注意事项---' + children.length)
  }

  deleteItem(idx) {
    let list = this.state.list
    list.splice(idx, 1)
    this.setState({
      list: list,
    })
  }

  componentWillMount() {
    console.log('componentWillMount----')
  }

  componentWillUnmount() {
    console.log('componentWillUnmount----')
  }

  // 组件是否更新
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate----')
    return true
  }

  componentWillUpdate() {
    console.log('componentWillUpdate---组件更新前，shouldComponentUpdate函数之后执行')
  }

  componentDidUpdate() {
    console.log('componentDidUpdate----组件更新之后执行')
  }

  render() {
    console.log('render----')
    return (
      <Fragment>
        <div className='container'>
          <h3>React 基础</h3>
          {/* Action 点击label 获取焦点 */}
          <label htmlFor='Action'>加入label</label>
          <input
            className='input'
            id='Action'
            // -------- 箭头函数绑定DOM元素
            ref={(input) => {
              this.input = input
            }}
            // ------------------
            value={this.state.inputV}
            onChange={this.inputChange}
          ></input>
          <button onClick={this.addList}>增加按钮</button>
          <ul
            ref={(ul) => {
              this.ul = ul
            }}
          >
            {/* 使用组动画 */}
            <TransitionGroup>
              {this.state.list.map((item, index) => (
                // <li
                //   key={index.toString()}
                //   onClick={this.deleteItem.bind(this, index)}
                //   // dangerouslySetInnerHTML={{__html:item}}
                // >
                //   {item}
                // </li>

                <CSSTransition
                  key={index + item}
                  timeout={1000}
                  classNames='animation-text'
                  appear={true}
                  unmountOnExit
                >
                  {/* 组件拆分 */}
                  <TestItem
                    key={index.toString()}
                    prefix={'React base'}
                    content={item}
                    suffix={'有默认值的'}
                    index={index}
                    // 删除时子组件不能操作数据，只能将删除方法传递给子组件，让其调用
                    deleteItem={this.deleteItem}
                    list={this.state.list}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          </ul>
          <div>
            <h3>React 动画</h3>
            <hr />
            <TransitionAnimation />
            <KeyframesAnimation />
          </div>
          <div>
            <h3>React input </h3>
            <hr />
            <FormDemo />
          </div>
          <div>
            <h3>井字棋小游戏</h3>
            <Game />
          </div>

          <div>
            <h3>React Hook</h3>
            <hr></hr>
            <Example></Example>
            <HookExample></HookExample>
            <hr></hr>
            <UseReducerStartDemo></UseReducerStartDemo>
            <UseReducerDemo></UseReducerDemo>

            <UseContextDemo></UseContextDemo>
            <UseContextUseReducerDemo></UseContextUseReducerDemo>

            <UseCallbackDemo></UseCallbackDemo>
            <UseCallbackDemo1></UseCallbackDemo1>
            <UseCallbackDemo2></UseCallbackDemo2>
            <ClassComponentDemo></ClassComponentDemo>

            <App></App>
            <App2></App2>
            <UseMemoApp></UseMemoApp>
            <RefDemo></RefDemo>
            <ForwardRefDemo></ForwardRefDemo>
            <UseImperativeHandleDemo></UseImperativeHandleDemo>
            <UseImperativeHandleDemo2></UseImperativeHandleDemo2>
            <CustomHooksDemo></CustomHooksDemo>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default TestComponent
