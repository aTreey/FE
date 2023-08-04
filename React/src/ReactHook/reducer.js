import React, { Children, createContext, useReducer } from 'react'

/**
 * useReducer 是useState的一个封装
 */

// 初始值：0
const initState = { count: 0 }
const myContext = createContext()

/**
 *  reducer 的第一个参数，输入旧的 state 根据 action 返回新的 state，这就是reducer的作用
 * @param {*} state 输入的state
 * @param {*} action 根据action 返回新的值
 * @returns
 */
function reducer(state, action) {
  switch (action.type) {
    case 'reset':
      return initState
    case 'increment':
      return { count: state.count + 1 }
    case 'decrement':
      return { count: state.count - 1 }
  }
}

/**
 * useReducer 第三个参数，输入初始的 state 输出一个新的state
 * @param {*} initState
 * @returns
 */
function init(initState) {
  console.log('🚀 ~ file: reducer.js:37 ~ init ~ initState:', initState)
  return { count: initState + 1 }
}

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, { count: 0 })
  return <myContext.Provider value={{ state, dispatch }}>{props.children}</myContext.Provider>
}

export { ContextProvider, myContext }
