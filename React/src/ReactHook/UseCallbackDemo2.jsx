import React, { PureComponent, useEffect, useState, useCallback } from 'react'
import { Foo, Foo1, Foo2 } from './UseCallbackDemo1'

const ClassComponentDemo = (props) => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  const memoHandleClick = useCallback(
    () => console.log('🚀 ~ file: useCallbackClass.js:74 ~ Demo ~:memoHandleClick'),
    [],
  )

  return (
    <div>
      <div>a:{a}</div>
      <button onClick={() => setA(a + 1)}> 点击 </button>
      <Foo></Foo>
      <Foo1></Foo1>
      <Foo2></Foo2>
    </div>
  )
}
const UseCallbackDemo2 = (props) => {
  return (
    <div>
      <h3>useCallbackDemo2</h3>
      <hr></hr>
      <h3>Class 组件渲染</h3>
      <Foo></Foo>
      <br></br>
      <Foo1></Foo1>
    </div>
  )
}

export { ClassComponentDemo, UseCallbackDemo2 }
