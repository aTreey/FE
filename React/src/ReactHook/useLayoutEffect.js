import React, { useDebugValue, useEffect, useLayoutEffect, useState } from 'react'

// useLayoutEffect 比 uesEffect 调用时机要早

function Com1() {
  useEffect(() => {
    console.log('useEffect 执行。。。')
    return () => {
      console.log('useEffect 销毁。。。')
    }
  })

  useLayoutEffect(() => {
    console.log('useLayoutEffect 执行。。。')
    return () => {
      console.log('useLayoutEffect 销毁。。。')
    }
  })

  return (
    <div>
      {console.log('Com1 渲染----')}
      <text>Comm1 组件</text>
    </div>
  )
}

// 自定义hooks
function myHook() {
  const [count, setCount] = useState(0)
  useDebugValue(count > 5 ? 'count>5' : 'count<=5')
  const mySetCount = () => {
    setCount(count + 2)
  }
  return [count, mySetCount]
}

function CustomHooksDemo() {
  const [count, setCount] = myHook()
  return (
    <div>
      <h2>UseLayoutEffect 使用</h2>
      <hr></hr>
      <p>useLayoutEffect 比 uesEffect 调用时机要早</p>
      <p>每次组件重新渲染前会先调用 useLayoutEffect 和 uesEffect 的销毁</p>

      <Com1></Com1>
      {count}
      <button
        onClick={() => {
          setCount()
        }}
      >
        改变count
      </button>
    </div>
  )
}

export { CustomHooksDemo }
