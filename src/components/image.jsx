import React, { useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Modal } from 'antd'
import { data } from './atoms'
import { useReset } from './hooks'

export function ImageMenu() {
  const dataValue = useRecoilValue(data)

  if (!dataValue) return null

  const { assets } = dataValue

  return (
    <div className="menu-image">
      <div className="menu-image-name">
        <span>图片</span>
      </div>
      <List data={assets} />
    </div>
  )
}

function List(props) {
  const { data } = props
  const images = data.filter(isImage).map(el => ({
    id: el.id,
    src: el.p,
    w: el.w,
    h: el.h
  }))
  return (
    <div className="image-list">
      {images.map(img => (
        <Img {...img} key={img.id} />
      ))}
    </div>
  )
}

function Img(props) {
  const reset = useReset()
  const inputRef = useRef(null)
  const setDataValue = useSetRecoilState(data)
  const { id, src, w, h } = props

  function handleImgClick() {
    inputRef.current.click()
  }

  function handleInputClick(evt) {
    evt.target.value = ""
  }

  function handleInputChange(evt) {
    const { files } = evt.target
    const reader = new FileReader()
    reader.onload = handleFileLoaded
    reader.readAsDataURL(files[0])
  }

  function handleFileLoaded(evt) {
    const { result } = evt.target
    // 1. test img w, h
    // const img = document.createElement('img')
    // img.onload = function (evt) {
    //   console.log({ img, w: img.width, h: img.height })
    // }
    // img.src = result

    reset()
    // 2. update dataValue
    setDataValue(pre => {
      const next = _.cloneDeep(pre)
      const asset = next.assets.find(asset => asset.id === id)
      asset.p = result
      return next
    })
  }

  return (
    <div className="image-item">
      <input
        ref={inputRef}
        type="file"
        onClick={handleInputClick}
        onChange={handleInputChange}
        style={{ display: 'none' }}
      />
      {/* <img
        src={src}
        alt=""
        onClick={handleImgClick}
      /> */}
      <Thumbnail src={src} />
      <div className="info">

      </div>
      <Preview src={src} />
      <div
        className="replace"
        onClick={handleImgClick}
      >
        <span>替换</span>
      </div>
    </div>
  )
}

function isImage(asset) {
  const { p } = asset

  if (!p) return false
  return p.startsWith('data:image')
}

function Thumbnail({ src }) {
  return (
    <div className="thumbnail">
      <img className="thumbnail-img" src={src} alt="" />
      {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M2 5C2 3.34315 3.34315 2 5 2H19C20.6569 2 22 3.34315 22 5V19C22 20.6569 20.6569 22 19 22H5C3.34315 22 2 20.6569 2 19V5ZM17 8.5C17 9.88071 15.8807 11 14.5 11C13.1193 11 12 9.88071 12 8.5C12 7.11929 13.1193 6 14.5 6C15.8807 6 17 7.11929 17 8.5ZM8.28084 12.5842C8.96734 11.8053 10.0327 11.8053 10.7192 12.5842L13.2159 15.4174L14.1133 14.4173C14.6126 13.8609 15.3874 13.8609 15.8867 14.4173L18.7936 17.657C18.9887 17.8744 19.0526 18.2122 18.9547 18.5087C18.8568 18.8051 18.6171 19 18.3502 19H4.89343C4.52647 19 4.19683 18.7272 4.06227 18.3121C3.9277 17.8971 4.01558 17.4242 4.28385 17.1198L8.28084 12.5842Z" fill="#181818" />
      </svg> */}
    </div>
  )
}

function Preview({ src }) {
  const [visible, setVisible] = useState(false)

  function show() {
    setVisible(true)
  }

  function hide() {
    setVisible(false)
  }

  return (
    <>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
        onClick={show}
        className="preview"
      >
        <path d="M9.50024 11.5C10.6048 11.5 11.5002 10.6046 11.5002 9.5C11.5002 8.97275 11.2962 8.49315 10.9628 8.13585C11.2937 8.04724 11.6414 8 12.0002 8C14.2094 8 16.0002 9.79086 16.0002 12C16.0002 14.2091 14.2094 16 12.0002 16C9.79111 16 8.00024 14.2091 8.00024 12C8.00024 11.6412 8.04749 11.2934 8.13609 10.9626C8.49339 11.296 8.97299 11.5 9.50024 11.5Z" fill="#AEC1CE" />
        <path fillRule="evenodd" clipRule="evenodd" d="M23.186 13.7643C23.4237 13.3677 23.6026 13.0352 23.7234 12.7988C23.7895 12.6695 23.8545 12.5396 23.9137 12.407C24.0287 12.1484 24.0287 11.8516 23.9137 11.593C23.8545 11.4604 23.7895 11.3305 23.7234 11.2012C23.6026 10.9648 23.4237 10.6323 23.186 10.2357C22.7116 9.44463 21.9963 8.38772 21.0314 7.32705C19.1095 5.21458 16.1115 3 12.0003 3C7.88917 3 4.89112 5.21458 2.96925 7.32705C2.00429 8.38772 1.28903 9.44463 0.814663 10.2357C0.551505 10.6746 0.296658 11.1242 0.0873179 11.592L0.0868853 11.593C-0.0280774 11.8516 -0.028427 12.1476 0.0865357 12.4062C0.295762 12.8758 0.550548 13.3238 0.814663 13.7643C1.28903 14.5554 2.00429 15.6123 2.96925 16.6729C4.89112 18.7854 7.88917 21 12.0003 21C16.1115 21 19.1095 18.7854 21.0314 16.6729C21.9963 15.6123 22.7116 14.5554 23.186 13.7643ZM12.0002 18C15.314 18 18.0002 15.3137 18.0002 12C18.0002 8.68629 15.314 6 12.0002 6C8.68654 6 6.00024 8.68629 6.00024 12C6.00024 15.3137 8.68654 18 12.0002 18Z" fill="#AEC1CE" />
      </svg>
      <Modal
        title='预览'
        visible={visible}
        onOk={hide}
        onCancel={hide}
        okText="确认"
        cancelText="取消"
      >
        <div
          className="preview-container"
          style={{
            textAlign: 'center'
          }}
        >
          <img src={src} style={{ maxWidth: '100%' }} />
        </div>
      </Modal>
    </>
  )
}