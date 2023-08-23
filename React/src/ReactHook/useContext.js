import React, { createContext, useContext, useState } from 'react'
import { ContextProvider } from './useReducerContext'
import Counter from './Counter'
import CounterTest from './CounterTest'

const myContext = createContext()

const Com1 = (props) => {
  const { count, setCount } = useContext(myContext)
  return (
    <React.Fragment>
      <div>
        <br></br>
        初始值：{count}
        <button onClick={() => setCount((pre) => pre + 1)}>count+1</button>
      </div>
    </React.Fragment>
  )
}

const UseContextDemo = (props) => {
  const [count, setCount] = useState(0)
  return (
    <myContext.Provider value={{ count, setCount }}>
      <div>
        <h2>useContext 使用</h2>
        <hr></hr>
        <Com1></Com1>
      </div>
    </myContext.Provider>
  )
}
const UseContextUseReducerDemo = (props) => {
  return (
    <div className='App'>
      <ContextProvider>
        <h2>UseContextUseReducerDemo</h2>
        <hr></hr>
        <Counter></Counter>
        <CounterTest></CounterTest>
      </ContextProvider>
      <></>
    </div>
  )
}

export { UseContextDemo, UseContextUseReducerDemo }
