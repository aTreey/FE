import React, { useState, useReducer } from 'react'

/**
 * useReducer 是useState的一个封装
 */

// 初始值：0
const initialCountState = 0
const initState = { count: 0 }

/**
 * 未使用useReducer 使用 useState 实现
 */

function Counter({ initialCount }) {
  const [count, setCount] = useState(initialCount)
  return (
    <>
      <h2>useReducer 使用</h2>
      <hr></hr>
      <h4>未使用useReducer 使用 useState 实现</h4>
      Count: {count}
      <button onClick={() => setCount({ initialCount: 0 })}>Reset</button>
      <button onClick={() => setCount((prevCount) => ({ initialCount: prevCount + 1 }))}>+</button>
      <button onClick={() => setCount((prevCount) => ({ initialCount: prevCount - 1 }))}>-</button>
    </>
  )
}

const UseReducerStartDemo = (props) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return (
    <div>
      <Counter count={initState}></Counter>
    </div>
  )
}

/**
 * 使用useReducer 实现
 *  reducer 的第一个参数，输入旧的 state 根据 action 返回新的 state，这就是reducer的作用
 * @param {*} state 输入的state
 * @param {*} action 根据action 返回新的值
 * @returns
 */
function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return { count: action.payload }
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
  }
}

/**
 * useReducer 第三个参数，输入初始的 state 输出一个新的state
 * @param {*} initialCountState
 * @returns
 */
function init(initialCountState) {
  console.log('🚀 ~ file: useReduce.js:30 ~ init ~ initialCountState:', initialCountState)
  return { count: initialCountState.count + 1 }
}

function Counter1({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init)

  return (
    <React.Fragment>
      Count: {state.count}
      <button
        onClick={() =>
          dispatch({
            type: 'reset',
            payload: initialCount.count,
          })
        }
      >
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'increment' })}> + </button>
      <button onClick={() => dispatch({ type: 'decrement' })}> - </button>
    </React.Fragment>
  )
}

const UseReducerDemo = (props) => (
  <div>
    <h4>useReducer 使用</h4>
    <Counter1 initialCount={{ count: 1 }}></Counter1>
  </div>
)

export { UseReducerDemo, UseReducerStartDemo }
