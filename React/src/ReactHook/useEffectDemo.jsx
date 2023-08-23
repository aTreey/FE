import React, { PureComponent, useEffect, useState } from 'react'

export class Example extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      count: 0,
    }
  }
  render() {
    return (
      <div>
        <text>class 实现: 你点击了{this.state.count}次数</text>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 })
          }}
        >
          点我呀
        </button>
      </div>
    )
  }
}

// Hook 写法
// state 只在组件首次渲染的时候被创建。在下一次重新渲染时，useState 返回给我们当前的 state

export function HookExample() {
  const [count, setCount] = useState(0) // 函数退出后会”消失”

  useEffect(() => {
    console.log('🚀 ~ file: useEffectDemo.jsx:33 ~ HookExample ~ useEffect:', useEffect)
    document.title = 'React Hooks Demo'

    console.log('🚀 ~ file: useEffectDemo.jsx:36 ~ HookExample ~ count:', count)

    return () => {
      console.log('🚀 ~ file: useEffectDemo.jsx:41 ~ return ~ HookExample 销毁:')
    }
  }, [count])

  return (
    <div>
      <text>hook 实现: 你点击了{count}次数</text>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        点我呀
      </button>

      <p>
        <pre>
          <code>
            每次函数执行，首先执行的是清理函数： {`return () => {}`}，再执行：{`return()`}{' '}
            最后根据副作用执行： {`useEffect((), [])`} 中的代码
          </code>
        </pre>
      </p>
    </div>
  )
}

export function Counter(initialCount) {
  const [count, setCount] = useState(initialCount)
  // setState((prevState) => {
  //   return { ...prevState, updateValues };
  // });
  return (
    <>
      Count: {count}
      <button
        onClick={() => {
          setCount(initialCount)
        }}
      >
        重置
      </button>
      <button
        onClick={() => {
          setCount(count - 1)
        }}
      >
        -
      </button>
      <button
        onClick={() => {
          setCount(count - 1)
        }}
      >
        +
      </button>
    </>
  )
}
