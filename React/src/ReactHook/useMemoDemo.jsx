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

const ButtonComponent = ({ value }) => {
  console.log('🚀 ~ file: useMemoDemo.jsx:6 ~ ButtonComponent ~ value:', value)
  const onClick = useCallback(() => {
    console.log('🚀 ~ file: useMemoDemo.jsx:7 ~ Child1 ~ useCallback:')
  })
  return (
    <div>
      <button onClick={onClick}>按钮：{value}</button>
      <text>公共子组件</text>
    </div>
  )
}

/**
 * 函数组件，有props
 */
function Parent({ a, b, valueA, valueB }) {
  // FIXME:  useMemoChild1 不是一个组件，只是保存了一个组件渲染的结果
  const UseMemoA = useMemo(() => {
    return (
      <div>
        {console.log('🚀 ~ file: useMemoDemo.jsx:21 ~ Parent ~ UseMemoA: Render')}
        <ButtonComponent value={b}></ButtonComponent>
      </div>
    )
  }, [a])
  console.log('🚀 ~ file: useMemoDemo.jsx:27 ~ Parent ~ 是否相等:', UseMemoA === ch)
  ch = UseMemoA

  // FIXME: 没有用useMemo 因此每次都重新计算，并不是一个组件，只是一个就算结果，回调函数中是一个函数组件
  const A = (
    <div>
      {console.log('🚀 ~ file: useMemoDemo.jsx:31 ~ Parent ~ A: Render')}
      <ButtonComponent value={b}></ButtonComponent>
    </div>
  )

  const UseMemoB = useMemo(
    () => (
      <div>
        {console.log('🚀 ~ file: useMemoDemo.jsx:31 ~ Parent ~ UseMemoB:')}
        <ButtonComponent value={valueB}></ButtonComponent>
      </div>
    ),
    [b],
  )

  return (
    <React.Fragment>
      {UseMemoA}
      {UseMemoB}
      {A}
    </React.Fragment>
  )
}

const UseMemoApp = (props) => {
  const [a, setA] = useState(0)
  const [b, setB] = useState(0)
  const [c, setC] = useState(0)
  const [d, setD] = useState(0)

  const [valueA, setValueA] = useState(0)
  const [valueB, setValueB] = useState(0)

  useEffect(() => {
    if (a > 0 && b > 0) {
      setValueB(2)
    } else {
      setValueB(1)
    }
  }, [a, b])
  return (
    <div>
      <h2>UseMemo 使用</h2>
      <hr></hr>
      <Parent a={a} b={b} valueA={`直接取A值:${a}`}></Parent>
      {/* <Parent valueB={`B组件值由A和B决定:${valueB}`}></Parent> */}
      <button onClick={() => setA(a + 1)}> 改变a </button>
      <button onClick={() => setB(b + 1)}> 改变b </button>
      <button onClick={() => setB(c + 1)}> 改变c </button>
      <button onClick={() => setB(d + 1)}> 改变d </button>
    </div>
  )
}

export { UseMemoApp }
