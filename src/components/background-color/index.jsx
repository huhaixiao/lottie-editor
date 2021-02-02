import React from 'react'
import './style.scss'

export function BackgroundColor() {

  function handleBackgroundColor(val) {
    handleBackgroundImage('')
    document.querySelector('.stage .container').style.backgroundColor = val
  }

  function handleBackgroundImage(val) {
    document.querySelector('.stage .container').style.backgroundImage = val
  }

  function handleClear() {
    handleBackgroundColor('')
  }

  return (
    <div className="background-color">
      <Color color="#fff" onClick={handleBackgroundColor} />
      <Color color="#000" onClick={handleBackgroundColor} />
      <Color color="#e43223" onClick={handleBackgroundColor} />
      <Color color="#ffc700" onClick={handleBackgroundColor} />
      <Color color="#14C35A" onClick={handleBackgroundColor} />
      <Color color="#1884FF" onClick={handleBackgroundColor} />
      <Color color="#999" onClick={handleClear} />
      <Color color="linear-gradient(135deg, #615EFF 10.94%, #5ED8FF 48.96%, #B9FF25 90.1%)" onClick={handleBackgroundImage} />

    </div>
  )
}

function Color({ color, onClick }) {
  return (
    <div
      className="background-color-item"
      style={{
        background: color
      }}
      onClick={() => onClick(color)}
    >
    </div>
  )
}
