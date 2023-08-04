import React, { Component, PureComponent, memo, useState, useCallback } from 'react'

/**
 * 知识点
 * - Foo 类组件，没有使用箭头函数，重新生成多个函数
 * - Foo1 类组件中使用 bind 绑定this，只有一个函数
 * - Foo2 函数组件反复生成多个 handleClick
 * - Foo3 函数组件使用 useCallback 避免重复生成 handleClick
 *
 *  使用 useCallback 避免重新渲染，优化性能
 */

class Foo extends Component {
  // 普通函数
  handleClick() {
    console.log('🚀 ~ file: useCallbackClassCom.js:17 ~ Foo ~ handleClick ~ handleClick:')
  }
  render() {
    console.log('🚀 ~ file: useCallbackClass.js:19 ~ Foo ~ render')
    // 行内使用箭头函数，如果组件渲染，每次都会生成新的箭头函数
    return <button onClick={() => this.handleClick()}> 点击 Class 组件方法</button>
  }
}

class Foo1 extends Component {
  constructor(props) {
    super(props)
    // bind this 为Foo1，只有一种函数,除非卸载被重新挂载
    this.handleClick = this.handleClick.bind(this)
  }

  // 普通函数
  handleClick() {
    console.log('🚀 ~ file: useCallbackClassCom.js:33 ~ Foo1 ~ handleClick:')
  }
  render() {
    return <button onClick={this.handleClick}> 点击 Class Foo1 组件方法</button>
  }
}

function Foo2() {
  // 箭头函数，每次渲染都是新的函数
  const handleClick = () => {
    console.log('🚀 ~ file: useCallbackClassCom.js:45 ~ Foo2  ~ handleClick:')
  }

  console.log('🚀 ~ file: useCallbackClass.js:44 ~ Foo2 ~ render:')
  // 直接执行handleClick箭头函数
  return <button onClick={handleClick}> 点击 函数组件Foo2 </button>
}

function Foo3useCallback() {
  // 使用useCallback, 第二参数是 [], 只会生成一次
  // 和类组件中的 定义函数再 bind 类似，避免了回掉函数重新生成
  const handleClick = useCallback(() => {
    console.log('🚀 ~ file: useCallbackClassCom.js:51 ~ Foo2 ~ Foo3useCallback ~ handleClick:')
  }, [])

  return (
    <div>
      {console.log('🚀 ~ file: useCallbackClass.js:58 ~ Foo3useCallback ~ render:')}
      <button onClick={handleClick}> 点击 Foo3useCallback </button>)
    </div>
  )
}

const Foo3UseMemoAndUseCallback = memo(() => {
  // 使用 memo + useCallback,
  const handleClick = useCallback(() => {
    console.log(
      '🚀 ~ file: useCallbackClassCom.js:51 ~ Foo2 ~ Foo3UseMemoAndUseCallback ~ handleClick:',
    )
  }, [])

  return (
    <div>
      {console.log('🚀 ~ file: useCallbackClass.js:77 ~ Foo3UseMemoAndUseCallback ~ render:')}
      <button onClick={handleClick}> 点击 Foo3UseMemoAndUseCallback </button>
    </div>
  )
})

const Parent = memo(({ a, c }) => {
  console.log('🚀 ~ file: useCallbackClass.js:59 ~ Parent ~ render')
  return (
    <div>
      a:{a}
      <button onClick={c}>Parent 点击</button>
    </div>
  )
})

const Demo = (props) => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  const memoHandleClick = useCallback(
    () => console.log('🚀 ~ file: useCallbackClass.js:74 ~ Demo ~:memoHandleClick'),
    [],
  )

  const handleClick = () => console.log('普通回调函数')

  return (
    <div>
      {console.log('🚀 ~ file: useCallbackClass.js:79 ~ Demo ~ render')}
      <Parent a={a} c={memoHandleClick}></Parent>
      {/* <Parent a={a} c={handleClick}></Parent> */}
      <button onClick={() => setA(a + 1)}>改变 a </button>
      <button onClick={() => setB(b + 1)}>改变 b </button>
      <button onClick={handleClick}>点击按钮 （useCallback）</button>
      <p>
        class 组件 行内使用箭头函数
        <Foo></Foo>
      </p>

      <p>
        函数组件 定义了箭头函数
        <Foo2></Foo2>
      </p>

      <p>
        函数组件 使用了useCallback
        <Foo3useCallback></Foo3useCallback>
      </p>

      <p>
        函数组件 使用了 memo + useCallback
        <Foo3UseMemoAndUseCallback></Foo3UseMemoAndUseCallback>
      </p>
    </div>
  )
}

export { Foo, Foo1, Foo2, Foo3useCallback, Demo }
