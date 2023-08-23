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
    console.log('🚀 ~ file: useCallbackClassCom.js:16 ~ Foo ~ handleClick ~ handleClick:')
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
    console.log('🚀 ~ file: useCallbackClassCom.js:34 ~ Foo1 ~ handleClick:')
  }
  render() {
    return <button onClick={this.handleClick}> 类组件中使用 bind 绑定this，只有一个函数</button>
  }
}

function Foo2() {
  // 箭头函数，每次渲染都是新的函数
  const handleClick = () => {
    console.log('🚀 ~ file: useCallbackClassCom.js:44 ~ Foo2  ~ handleClick:')
  }

  console.log('🚀 ~ file: useCallbackClass.js:47 ~ Foo2 ~ render:')
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
      '🚀 ~ file: useCallbackClassCom.js:71 ~ Foo2 ~ Foo3UseMemoAndUseCallback ~ handleClick:',
    )
  }, [])

  return (
    <div>
      {console.log('🚀 ~ file: useCallbackClass.js:77 ~ Foo3UseMemoAndUseCallback ~ render:')}
      <button onClick={handleClick}> 点击 Foo3UseMemoAndUseCallback </button>
    </div>
  )
})

/***
 * 使用了 memo 跟 class 组件中使用了PureComponent 类似，可以让组件只有在 props 变化的时候进行重新渲染
 */
const Parent = memo(({ a, c }) => {
  console.log('🚀 ~ file: UseCallbackDemo1.js:87 ~ Parent ~ Parent:render-', Parent)
  return (
    <div>
      Parent组件中 a:{a}
      <button onClick={c}>Parent组件中的按钮</button>
    </div>
  )
})

const UseCallbackDemo1 = (props) => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  const memoHandleClick = useCallback(
    () => console.log('🚀 ~ file: UseCallbackDemo1.js:101 ~ UseCallbackDemo1 :memoHandleClick'),
    [],
  )

  const handleClick = () => console.log('普通回调函数')

  return (
    <div>
      <h3>useCallbackDemo1_1</h3>
      {console.log('🚀 ~ file: UseCallbackDemo1.js:110 ~ UseCallbackDemo1  ~ render ---')}

      <p>
        <h4>通过使用了useCallback避免了Parent重新渲染</h4>
        1. root是函数组件，有a和b两个useState，有个使用了 useCallback 的回调函数
        <br></br>
        2. 子组件有函数组件 Parent、改变a、b值的 button 和 TestUseCallback <br></br>
        3. Parent函数组件使用了memo，只有在 props a 和c 值变化时重新渲染， 跟 PureComponent 类似{' '}
        <br></br>
        4. 点击Parent组件按钮，会将事件回调到root组件中 <br></br>
        4. 点击按钮，执行root组件中的click函数 <br></br>
      </p>
      <Parent a={a} c={memoHandleClick}></Parent>
      {/* <Parent a={a} c={handleClick}></Parent> */}
      <NormalParent a={a} c={memoHandleClick}></NormalParent>
      <button onClick={() => setA(a + 1)}>改变 a </button>
      <button onClick={() => setB(b + 1)}>改变 b </button>
      <button onClick={memoHandleClick}>点击按钮</button>
    </div>
  )
}

const UseCallbackDemo1_1 = (props) => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  const memoHandleClick = useCallback(
    () => console.log('🚀 ~ file: UseCallbackDemo1_1.js:136 ~ memoHandleClick:'),
    [],
  )

  const handleClick = () => console.log('普通回调函数')

  return (
    <div>
      <h3>useCallback Demo1</h3>
      <h4>通过使用了useCallback避免了Parent重新渲染</h4>
      {console.log('🚀 ~ file: UseCallbackDemo1_1.js:146 ~ render--')}
      <Parent a={a} c={memoHandleClick}></Parent>
      {/* <Parent a={a} c={handleClick}></Parent> */}
      <button onClick={() => setA(a + 1)}>改变 a </button>
      <button onClick={() => setB(b + 1)}>改变 b </button>
      <button onClick={handleClick}>点击按钮 （useCallback）</button>
      {/* <p>
        <h3>class 组件 行内使用箭头函数</h3>
        <Foo></Foo>
      </p> */}
      <p>
        <h3>函数组件 定义了箭头函数</h3>
        <Foo2></Foo2>
      </p>
      <p>
        <h3>函数组件 使用了useCallback</h3>
        <Foo3useCallback></Foo3useCallback>
      </p>
      <p>
        <h3>函数组件 使用了 memo + useCallback</h3>
        <Foo3UseMemoAndUseCallback></Foo3UseMemoAndUseCallback>
      </p>
    </div>
  )
}

const NormalParent = ({ a, c }) => {
  console.log('🚀 ~ file: UseCallbackDemo1.js:174 ~ NormalParent ~')
  return (
    <div>
      NormalParent a:{a}
      <button onClick={c}>NormalParent 组件中 按钮</button>
    </div>
  )
}

export { Foo, Foo1, Foo2, Foo3useCallback, UseCallbackDemo1, UseCallbackDemo1_1 }
