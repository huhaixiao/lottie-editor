import React from 'react'
import { useRecoilValue } from 'recoil'
import { status, controllerCurrentTime, } from './atoms'
import './frame-style'

export function Frame() {
  const statusValue = useRecoilValue(status)
  const controllerCurrentTimeValue = useRecoilValue(controllerCurrentTime)

  return (
    <div className="frame">
      <span className="frame-current" >{controllerCurrentTimeValue.toFixed(0)}</span>
      <span className="frame-delimiter">&nbsp;/&nbsp;</span>
      <span className="frame-total">{statusValue.op}</span>
    </div>
  )
}
