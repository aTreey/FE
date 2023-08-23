import React, { Component, useEffect, useState, useCallback } from 'react'

let fn = null
let normalFn = null

/**
 * 函数组件，测试使用了useCallback的函数和普通函数区别
 * 接收num 和 name 两个参数
 * 使用了 useCallback 的函数跟 全区变量 fn 进行比较：因为第二参数是num,所以当 num变化的时候才会生成新的函数
 * 普通 cb 函数每次函数渲染都生成一个新的函数
 */
function TestUseCallback({ num, name }) {
  // 普通的cb 函数
  const cb = () => {
    console.log('普通的尖头函数每次生成都是不一样的')
  }

  console.log('🚀 ~ file: UseCallbackDemo.jsx:15 ~ cb ~ cb:', cb)

  console.log(
    '🚀 ~ file: UseCallbackDemo.jsx:21 ~ TestUseCallback ~ normalFn 是否相同',
    Object.is(normalFn, cb),
    name,
  )

  const memoCallback = useCallback(() => {
    console.log('useCallback 的第一参数，回调函数')
  }, [num])
  console.log(
    '🚀 ~ file: UseCallbackDemo.jsx:30 ~ TestUseCallback ~ memoCallback是否相同：',
    Object.is(fn, memoCallback),
    name,
  )
  console.log('🚀 ~ file: UseCallbackDemo.jsx:10 ~ TestUseCallback ~ num:', num)

  fn = memoCallback
  normalFn = cb
  return (
    <div>
      {console.log('TestUseCallback render----')}
      <p>TestUseCallback组件，测试useCallback</p>
    </div>
  )
}

const num1 = [1, 2, 3]
const num2 = [4, 5, 6]

class UseCallbackDemo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      num: num1,
      count: 0,
      name: '123',
    }
  }
  componentDidMount() {
    setInterval(() => {
      this.setState((state) => {
        return { count: state.count + 1 }
      })
    }, 3000)
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
        <br></br>
        <h2>useCallback使用</h2>
        <hr></hr>
        <h3>useCallback Demo</h3>
        <p>
          <h4>测试使用了useCallback和未使用useCallback 的区别</h4>
          1. root是 class 组件，state 有 num, name, count 三个属性
          组件加载完后会启动一个定时器，每3执行一次count+1 <br></br>
          2. 子组件有修改 button 和 TestUseCallback <br></br>
          3. 点击修改按钮改变 state 中的num值 <br></br>
          4. 观察console中日志变化
        </p>
        <button onClick={this.handleChangeNum}>修改num值</button>
        <TestUseCallback num={num} name={this.state.name}></TestUseCallback>
      </div>
    )
  }
}

export { UseCallbackDemo }
