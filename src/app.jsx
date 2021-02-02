import React from 'react'
import ReactDOM from 'react-dom'
import { RecoilRoot } from 'recoil'
import { Left } from './components/left/'
import { Right } from './components/right'
import { Test } from './test'
import './style.scss'

function App() {
  return <div className="container">
    <Left />
    <Right />
  </div>
}

ReactDOM.render(
  <RecoilRoot>
    <App />
    {/* <Test author='huhaixiao'/> */}
  </RecoilRoot>, document.querySelector('#app'))