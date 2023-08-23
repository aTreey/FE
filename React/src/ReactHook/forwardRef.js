import React, { useEffect, createRef, useRef, useState, useCallback } from 'react'

/**
 * 返回一个组件
 * 把自己收到的ref 转发给 子组件
 *
 */

/**
 * 可以转发
 */
const FancyButton = React.forwardRef((props, ref) => (
  <div>
    <input ref={ref}></input>
    <button className='FancyButton'>{props.children}</button>
  </div>
))

const FancyButton1 = (props) => (
  <div>
    <input ref={props.ref}></input>
    <button className='FancyButton'>{props.children}</button>
  </div>
)

function ForwardRefDemo() {
  const ref = useRef()
  const handleClick = useCallback(() => ref.current.focus(), [])
  return (
    <div>
      <h2>forwardRef Demo</h2>
      <hr></hr>
      <FancyButton ref={ref}>可转发组件</FancyButton>
      <FancyButton1 ref={ref}>普通组件</FancyButton1>
      <button onClick={handleClick}>获取焦点</button>
    </div>
  )
}

export { ForwardRefDemo }
