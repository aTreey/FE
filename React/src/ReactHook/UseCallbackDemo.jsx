import React, { Component, useEffect, useState, useCallback } from 'react'

let fn = null
function TestUseCallback({ num, name }) {
  //   const cb = () => {
  //     console.log('普通的尖头函数每次生成都是不一样的')
  //   }
  const memoCallback = useCallback(() => {
    console.log('useCallback 的第一参数，回调函数')
  }, [num])
  console.log(
    '🚀 ~ file: UseCallbackDemo.jsx:7 ~ TestUseCallback ~ memoCallback是否相同：',
    Object.is(fn, memoCallback),
    name,
  )
  console.log('🚀 ~ file: UseCallbackDemo.jsx:10 ~ TestUseCallback ~ num:', num)

  fn = memoCallback
  return (
    <div>
      {console.log('TestUseCallback render----')}
      <p>使用 useCallback 的组件 ：TestU seCallback</p>
    </div>
  )
}

const num1 = [1, 2, 3]
const num2 = [4, 5, 6]

class App1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: num1,
      count: 0,
      name: '123',
    }
  }
  componentDidMount() {
    // setInterval(() => {
    this.setState((state) => {
      return { count: state.count + 1 }
    })
    // }, 3000)
  }

  handleChangeNum = () => {
    this.setState({
      name: 'def',
      num: num2,
    })
  }

  render() {
    const { num } = this.state
    return (
      <div>
        <h1>Hello</h1>
        <h2>测试useCallback</h2>
        <button onClick={this.handleChangeNum}>修改传入的num值</button>
        <TestUseCallback num={num} name={this.state.name}></TestUseCallback>
      </div>
    )
  }
}

export { App1 }
