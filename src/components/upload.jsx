import React, { useRef } from 'react'
import { useRecoilState } from 'recoil'
import { validate } from '../core'
import { data } from './atoms'
import { useReset } from './hooks'
import { icon } from '../icons'

export function Upload() {
  const [dataValue, setDataState] = useRecoilState(data)

  const uploadRef = useRef(null)
  const reset = useReset()

  function handleClick() {
    uploadRef.current.click()
  }

  function handleFileLoaded(evt) {
    const { result } = evt.target
    try {
      const jsonObject = JSON.parse(result)
      const isValid = validate(jsonObject)
      reset()
      if (isValid) {
        setDataState(jsonObject)
      } else {
        setDataState(null)
      }
    } catch (err) {
      console.error(err)
    }
  }
  function handleUploadClick(evt) {
    evt.target.value = ''
  }
  function handleChanged(evt) {
    const file = evt.target.files[0]
    readFile(file)
  }
  function handleDrop(evt) {
    evt.preventDefault()
    const file = evt.dataTransfer.files[0]
    readFile(file)
  }
  function readFile(file) {
    const reader = new FileReader()
    reader.onload = handleFileLoaded
    reader.readAsText(file)
  }

  if (dataValue) return null

  return (
    <div
      className="upload"
      style={{
        width: '800px',
        height: '440px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px dashed #AEC1CE',
        borderRadius: '12px',
        transition: '0.1s',
        position: 'absolute',
        cursor: 'pointer'
      }}
      onClick={handleClick}
      onDragEnter={evt => {
        // evt.preventDefault()
        // evt.stopPropagation()
      }}
      onDragOver={evt => {
        evt.preventDefault()
        // evt.stopPropagation()
      }}
      onDrop={handleDrop}
    >

      {icon.file}
      <span
        style={{
          color: '#AEC1CE',
          marginTop: '12px',
          fontSize: '16px'
        }}
      >
        点击虚线区域上传文件或拖入Lottie文件
        </span>
      <input
        ref={uploadRef}
        type="file"
        accept=".json"
        onClick={handleUploadClick}
        onChange={handleChanged}
        style={{
          display: 'none'
        }}
      />
    </div>
  )
}
