import React, { useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react'

export function Test() {

  return (
    <>
      <div className="parent">
        <div className="child"></div>
      </div>
    </>
  )

  const divRef = useRef(null)
  const [n, setN] = useState(1)
  const [inputValue, setInputValue] = useState('abc')
  const debouncedInputValue = useDebounceState(inputValue, 3000)

  useEffect(() => {
    console.log({ debouncedInputValue }, 'state debounced...')
  }, [debouncedInputValue])
  function handleClick() {

  }

  useEffect(() => {
    // const t = new Date()
    // while((new Date() - t) < 5000) {

    // }
    // divRef.current.style.top = '200px'
    // divRef.current.style.left = '200px'
  }, [])

  useLayoutEffect(() => {
    const t = new Date()
    while ((new Date() - t) < 5000) {

    }
    divRef.current.style.top = '200px'
    divRef.current.style.left = '200px'
  }, [])

  return (
    <div
      ref={divRef}
      className="test"
      onClick={handleClick}
      style={{
        position: 'relative',
        width: '200px',
        height: '200px',
        backgroundColor: 'red',
      }}
    >
      <input type="text" value={inputValue} onChange={evt => setInputValue(evt.target.value)} />
      <span>debounced: {debouncedInputValue}</span>
    </div>
  )
}

function useDebounceState(value, delay) {
  const timerRef = useRef(null)
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(timerRef.current)
    }
  }, [value, delay])

  return debouncedValue
}

function usePrevious(value) {
  const preRef = useRef(null)

  useEffect(() => {
    preRef.current = value
  })

  return preRef
}
