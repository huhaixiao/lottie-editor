import React from 'react'
import { Logo } from '../logo'
import { Clear } from '../clear'
import { BackgroundImage } from '../background-image'
import { BackgroundColor } from '../background-color'
import { Stage } from '../stage'
import { Controller } from '../controller'
import './style.scss'

export function Left() {
  return (
    <div className="left">
      <div className="header">
        <div className="corner">
          <Logo />
        </div>
        <div className="flex-left">
          <Clear />
          <BackgroundImage />
        </div>
        <BackgroundColor />
      </div>
      <div className="footer">
        <Controller />
      </div>
      <Stage />
    </div>
  )
}