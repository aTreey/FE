import React, {
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  useCallback,
} from 'react'

/**
 * 自定义要开发给父组件的实例值
 * 通过父组件访问子组件的实例和状态值
 * 第三个参数的作用
 *
 */

function FancyInput(props, ref) {
  const inputRef = useRef()
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus()
    },
  }))
  return <input ref={inputRef}></input>
}

FancyInput = forwardRef(FancyInput)

const UseImperativeHandleDemo = (props) => {
  const fancyInputRef = useRef()
  const handleClick = useCallback(() => fancyInputRef.current.focus(), [])
  return (
    <div>
      <h2>useImperativeHandle</h2>
      <hr></hr>
      <FancyInput ref={fancyInputRef}></FancyInput>
      <button onClick={handleClick}>父组件调用子组件的 focus</button>
    </div>
  )
}

export { UseImperativeHandleDemo }
