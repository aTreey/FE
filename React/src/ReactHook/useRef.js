import React, { useEffect, createRef, useRef, useState } from 'react'

/**
 * useRef 是函数组件中的实例属性，和类组件的实例属性几乎完全一样
 * 组件生命周期中，ref 属性始终保留
 *
 */

function Counter() {
  const [count, setCount] = useState(0)
  const prevCountRef = useRef(0)
  //FIXME: 每次都创建新的对象，useRef不会
  const createRef = React.createRef()

  useEffect(() => {
    prevCountRef.current = count
    console.log('后执行')
  })

  const prevCount = prevCountRef.current

  return (
    <div>
      <h4>
        Now: {count}, before: {prevCount}
      </h4>
      {console.log('渲染中 --- 先执行---')}
      <button onClick={() => setCount(count + 1)}> 更新Count </button>
    </div>
  )
}

class Counter1 extends React.Component {
  state = { count: 0 }
  prevCount = 0
  componentDidUpdate() {
    console.log('class 组件后执行')
    this.prevCount = this.state.count
  }

  render() {
    return (
      <div>
        <h4>
          Now:{this.state.count}, before: {this.prevCount}
        </h4>
        {console.log('class 组件 渲染中 --- 先执行---')}
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Class Counter更新Count
        </button>
      </div>
    )
  }
}

const Ref = { current: null }

function Counter2() {
  const [count, setCount] = useState(0)
  const prevCountRef = Ref

  useEffect(() => {
    prevCountRef.current = count
    console.log('后执行')
  })

  const prevCount = prevCountRef.current

  return (
    <div>
      <h4>
        Now: {count}, before: {prevCount}
      </h4>
      {console.log('🚀 ~ file: useRef.js:73 ~ Counter2 ~ 渲染中 --- 先执行---')}
      <button onClick={() => setCount(count + 1)}> useRef Counter2 更新Count </button>
    </div>
  )
}

const RefDemo = (props) => {
  const [show, setShow] = useState(1)
  return (
    <div>
      <h2> useRef 使用</h2>
      <h3>使用 create 每次都创建新的对象，而useRef不会，react内部做了优化 </h3>
      <hr></hr>
      {show ? <Counter></Counter> : null}
      {/* <hr></hr> */}
      {show ? <Counter1></Counter1> : null}
      {/* <hr></hr> */}
      {show ? <Counter2></Counter2> : null}
    </div>
  )
}

export { Counter, Counter1, RefDemo }
