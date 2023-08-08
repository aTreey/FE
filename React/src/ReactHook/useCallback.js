import React, { Component, PureComponent, memo, useState, useCallback } from 'react'

let fnn1 = null
let fnn2 = null

const ExpensiveComponents = memo(({ onClick }) => {
  const date = new Date()
  console.log('🚀 ~ file: useCallback.js:8 ~ ExpensiveComponents ~ render date:', date)
  return <h3 onClick={onClick}>{date.getSeconds()}耗时组件！渲染耗时！！！</h3>
})

function Com1({ p1 }) {
  //FIXME: fn1是普通的函数，每次都是生成新的，所有会导致 ExpensiveComponents组件都重新渲染
  const fn1 = () => console.log('fn1')
  console.log('🚀 ~ file: useCallback.js:10 ~ Com1:', Object.is(fnn1, fn1))
  fnn1 = fn1

  return <ExpensiveComponents onClick={fn1}></ExpensiveComponents>
}

function Com2({ p2 }) {
  // FIXME: 使用useCallback 后只有在参数p2 变化的时候才会新建，否则保持不变，不会导致ExpensiveComponents 渲染
  const fn1 = useCallback(() => console.log('fn1'), [p2])
  console.log('🚀 ~ file: useCallback.js:20 ~ Com2:', Object.is(fnn2, fn1))
  fnn2 = fn1
  return <ExpensiveComponents onClick={fn1}></ExpensiveComponents>
}

class App extends Component {
  state = {
    p1: 0,
    p2: 0,
  }

  render() {
    return (
      <div>
        <h4>每次点击fn1都是新的</h4>
        <Com1 p1={this.state.p1}></Com1>
        <button onClick={() => this.setState({ p1: this.state.p1 + 1 })}> p1+1 </button>
        <hr></hr>
        <h4>不用重复生成fn1</h4>
        <Com2 p2={this.state.p2}></Com2>
        <button onClick={() => this.setState({ p2: this.state.p2 + 1 })}> p2+1 </button>
      </div>
    )
  }
}

const App2 = () => {
  const [p1, setP1] = useState(0)
  const [p2, setP2] = useState(0)

  const memoHandleClick = useCallback(
    () => console.log('🚀 ~ file: useCallbackClass.js:74 ~ Demo ~:memoHandleClick'),
    [],
  )

  return (
    <div>
      <h4>使用函数组件</h4>
      <h5>每次点击fn1都是新的</h5>
      <Com1 p1={p1}></Com1>
      <button onClick={() => setP1(p1 + 1)}> p1+1 </button>
      <hr></hr>
      <h4>不用重复生成fn1</h4>
      <Com2 p2={p2}></Com2>
      <button onClick={() => setP1(p2 + 1)}> p2+1 </button>
    </div>
  )
}

export { App, App2 }
