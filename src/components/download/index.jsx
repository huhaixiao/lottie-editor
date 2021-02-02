import React, { useRef } from 'react'
import { useRecoilValue } from 'recoil'
import { saveAs } from 'file-saver'
import { data } from '../atoms'
import './style.scss'

export function Download() {
  const containerRef = useRef(null)
  const lampRef = useRef(null)
  const dataValue = useRecoilValue(data)

  function handleClick() {
    var blob = new Blob([JSON.stringify(dataValue)])
    saveAs(blob, dataValue.nm + '.json')
  }

  function handleMouseMove(evt) {
    const x = evt.clientX
    const y = evt.clientY

    const clientRect = containerRef.current.getBoundingClientRect()

    console.log(y - clientRect.y, x - clientRect.x)

    lampRef.current.style.top = y - clientRect.y + 'px'
    lampRef.current.style.left = x - clientRect.x + 'px'
  }

  function handleMouseDown() {
    lampRef.current.classList.remove('open')
    window.requestAnimationFrame(() => {
      lampRef.current.classList.add('open')
    })
  }

  function handleMouseEnter() {
    lampRef.current.style.display = 'block'
  }

  function handleMouseLeave() {
    lampRef.current.style.display = 'none'
    lampRef.current.classList.remove('open')
  }

  if (!dataValue) return null

  return (
    <div
      ref={containerRef}
      className="download"
      style={{
        position: 'absolute',
        bottom: 31,
        right: 31,
        width: '310px',
        height: '50px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1884FF',
        borderRadius: '12px',
        color: '#fff',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        boxShadow: '0px 0px 0px 14px rgba(255, 255, 255, 1)',
        overflow: 'hidden'
      }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span>
        压缩并导出.json
      </span>
      <div ref={lampRef} className="lamp"></div>
    </div>
  )
}