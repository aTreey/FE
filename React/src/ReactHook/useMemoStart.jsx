import React, {
  Component,
  PureComponent,
  memo,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react'

let ch

const Child1 = ({ a }) => {
  console.log('🚀 ~ file: useMemoDemo.jsx:14 ~ Child1组件: 重新渲染--')
  return (
    <div>
      <h5>Child1组件:{a}</h5>
    </div>
  )
}

function Parent({ a, b }) {
  // FIXME:
  /**
   * 1. useMemoChild1 不是一个组件，只是保存了一个组件渲染的结果
   * 2. useMemo 的第一次参数是一个回调函数，这个回调函数是一个函数行的组件
   * 3. 仅当依赖参数a的值发生变化时才会重新保存渲染结果，否则结果不变
   */
  const useMemoChild1 = useMemo(
    () => (
      <div>
        {console.log('🚀 ~ file: useMemoDemo.jsx:33 ~ Parent ~ useMemoChild1值 复杂计算')}
        <Child1 a={b}></Child1>
      </div>
    ),
    [a],
  )

  console.log(
    '🚀 ~ file: useMemoDemo.jsx:42 ~ Parent ~ useMemoChild1 - ch 是否相等:',
    useMemoChild1 === ch,
  )
  ch = useMemoChild1

  // FIXME:
  /**
   * 没有用useMemo 因此每次都重新计算
   * 保存的结果每次都会变
   */
  const child2 = (
    <div>
      {console.log('🚀 ~ file: useMemoStart.jsx:54 ~ Parent ~ child2的值: 重新计算')}
      <Child1 a={b}></Child1>
    </div>
  )

  return (
    <React.Fragment>
      {useMemoChild1}
      {child2}
    </React.Fragment>
  )
}

const UseMemoStartDemo = (props) => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)

  return (
    <div>
      <h2>useMemo 使用</h2>

      {console.log('🚀 ~ file: useMemoStart.jsx:74 ~ UseMemoStartDemo ~ render ---')}
      <hr></hr>
      <Parent a={a} b={b}></Parent>
      <button onClick={() => setA((pre) => pre + 1)}> 改变a </button>
      <button onClick={() => setB((pre) => pre + 1)}> 改变b </button>
    </div>
  )
}

export { UseMemoStartDemo }
