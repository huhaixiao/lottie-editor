import React from 'react'
import { useResetRecoilState } from 'recoil'
import lottie from 'lottie-web'
import { data, status, lottieCurrentTime, controllerCurrentTime, loop, direction } from './atoms'

export function Clear() {
  const resetData = useResetRecoilState(data)
  const resetStatus = useResetRecoilState(status)
  const resetLottieCurrentTime = useResetRecoilState(lottieCurrentTime)
  const resetControllerCurrentTime = useResetRecoilState(controllerCurrentTime)
  const resetLoop = useResetRecoilState(loop)
  const resetDirection = useResetRecoilState(direction)

  return (
    <div className="clear" onClick={() => {
      lottie.destroy()
      document.querySelector('.stage .container').style.backgroundImage = ''
      document.querySelector('.stage .container').style.backgroundColor = '#fff'
      resetData()
      resetStatus()
      resetLottieCurrentTime()
      resetControllerCurrentTime()
      resetLoop()
      resetDirection()
    }}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M8.31365 5.81842L20.8388 13.1529L21.6679 11.6853C22.3517 10.4749 21.9467 8.93995 20.7546 8.22456L19.1623 7.26898L20.6926 4.56031C21.0363 3.95184 20.8296 3.18016 20.2277 2.82504L17.4364 1.17814C16.8183 0.813449 16.0213 1.02698 15.6682 1.65183L14.1617 4.31854L12.6391 3.43545C11.4039 2.71909 9.82157 3.14933 9.11924 4.3925L8.31365 5.81842Z" fill="#181818" />
        <path d="M16.9498 22.4096L19.6694 14.3398L7.76724 7.30667C7.76724 7.30667 5.60321 11.0937 2 13.7784C2 13.7784 4.98169 17.9481 11.1159 20.576L13.4906 18.6763C13.7099 18.5008 14.0285 18.6959 13.9719 18.9709L13.4285 21.6133C14.3567 21.8824 15.9156 22.2465 16.9498 22.4096Z" fill="#181818" />
      </svg>
    </div>
  )
}