// http://airbnb.io/lottie/#/web?id=getting-started
import lottie from 'lottie-web'
import React, { useEffect, useRef } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import _ from 'lodash'
import { data, status, lottieCurrentTime, controllerCurrentTime, loop, direction, isPaused } from './atoms'
import { Upload } from './upload'

export function Stage() {
  const dataValue = useRecoilValue(data)
  const lottieInstance = useRef(null)
  const container = useRef(null)
  const loopValue = useRecoilValue(loop)
  const directionValue = useRecoilValue(direction)
  const lottieCurrentTimeValue = useRecoilValue(lottieCurrentTime)
  const [statusValue, setStatusValue] = useRecoilState(status)
  const setControllerCurrentTime = useSetRecoilState(controllerCurrentTime)
  const isPausedValue = useRecoilValue(isPaused)

  useEffect(() => {
    container.current.style.backgroundColor = '#fff'
  }, [])

  useEffect(() => {
    if (!dataValue) return
    const { ip, op, fr } = dataValue
    setStatusValue({ ip, op, fr })
    lottieInstance.current = lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      name: 'stage',
      animationData: _.cloneDeep(dataValue)
    })
    lottieInstance.current.addEventListener('enterFrame', e => {
      if (!lottieInstance.current) return
      setControllerCurrentTime(e.currentTime)
    })
    window.debugee = lottieInstance.current

    return () => {
      lottieInstance.current = null
      lottie.destroy()
    }
  }, [dataValue])

  useEffect(() => {
    const { current } = lottieInstance
    if (!current) return
    if (isPausedValue) {
      current.pause()
    } else {
      current.play()
    }
  }, [isPausedValue])

  useEffect(() => {
    if (!dataValue) return
    const { current } = lottieInstance
    if (current) {
      if (isPausedValue) {
        current.goToAndStop(lottieCurrentTimeValue, true)
      } else {
        current.goToAndPlay(lottieCurrentTimeValue, true)
      }
    }
  }, [lottieCurrentTimeValue, isPausedValue])

  useEffect(() => {
    if (lottieInstance.current) {
      lottieInstance.current.loop = loopValue
      lottieInstance.current.play()
    }
  }, [loopValue, lottieInstance])

  useEffect(() => {
    if (lottieInstance.current) {
      lottieInstance.current.setDirection(directionValue)
      lottieInstance.current.play()
    }
  }, [directionValue, lottieInstance])

  return (
    <div
      className="stage"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div
        className="container"
        ref={container}
        style={{
          width: '135.11vh',
          height: '76vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: '2px solid #ccc',
          border: "6px solid #FFFFFF",
          borderRadius: '16px'
        }}>
        <Upload />
      </div>
    </div>
  )
}
