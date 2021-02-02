import React, { useRef } from 'react'

export function BackgroundImage() {
  const uploadRef = useRef(null)

  function handleClick() {
    uploadRef.current.click()
  }

  function handleFileLoaded(evt) {
    const { result } = evt.target
    document.querySelector('.stage .container').style.backgroundImage = `url(${result})`
  }

  function handleChange(evt) {
    const file = evt.target.files[0]
    const reader = new FileReader()
    reader.onload = handleFileLoaded
    reader.readAsDataURL(file)
  }

  function handleUploadClick(evt) {
    evt.target.value = ''
  }

  return (
    <div className="background-image" onClick={handleClick}>
      <span>背景图片</span>
      <input
        ref={uploadRef}
        type="file"
        style={{ display: 'none' }}
        onClick={handleUploadClick}
        onChange={handleChange}
      />
    </div>
  )
}
