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
  const [fresh, setFresh] = useState(0)
  const attRef = useRef(0)
  useImperativeHandle(
    ref,
    () => {
      return {
        attRef,
        fresh,
      }
    },
    // 只有参数变化时返回的对象才会变化
    [fresh],
  )

  const handleClick = useCallback(() => {
    attRef.current = attRef.current + 1
  }, [])

  return (
    <div>
      {attRef.current}
      <button onClick={handleClick}>Fancy</button>
      <button onClick={() => setFresh(!fresh)}>刷新</button>
    </div>
  )
}

FancyInput = forwardRef(FancyInput)

const UseImperativeHandleDemo2 = (props) => {
  const fancyInputRef = useRef()
  const handleClick = useCallback(
    () => console.log('UseImperativeHandleDemo2:', fancyInputRef.current),
    [],
  )
  return (
    <div>
      <h2>useImperativeHandle Demo 2</h2>
      <hr></hr>
      <FancyInput ref={fancyInputRef}></FancyInput>
      <button onClick={handleClick}>父组件访问子组件的实例属性</button>
    </div>
  )
}

export { UseImperativeHandleDemo2 }
