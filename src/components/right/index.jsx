import React from 'react'
import { ColorMenu } from '../color'
import { ImageMenu } from '../image'
import { Download } from '../download/'
import "./style"

export function Right() {
  return (
    <div className="right">
      <div className="right-container">
        <div className="right-up">
          <ColorMenu />
          <ImageMenu />
        </div>
      </div>
      <Download />
    </div>
  )
}