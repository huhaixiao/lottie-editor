import React from 'react'
import ReactDOM from 'react-dom'

const body = <p>body!!!</p>

export function render() {
  ReactDOM.render(body, document.querySelector("#app"))
}